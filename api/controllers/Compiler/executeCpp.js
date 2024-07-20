import { exec } from "child_process";
import fs from 'fs';
import path from 'path';
import Problem from '../../models/ProblemPage.model.js';

const rootDir = path.resolve();
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, problem) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const { testCases } = problem;

    return new Promise((resolve, reject) => {
        const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
        exec(compileCommand, (compileError) => {
            if (compileError) {
                console.error("Compilation Error: ", compileError);
                reject({ error: compileError });
                return;
            }

            const results = [];
            const executeTestCase = (testCaseIndex) => {
                if (testCaseIndex >= testCases.length) {
                    resolve(results);
                    return;
                }

                const { input, output: expectedOutput } = testCases[testCaseIndex];
                const command = `"${outPath}"`;
                const childProcess = exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error("Execution Error: ", error);
                        reject({ verdict: "Runtime Error", output: stderr });
                        return;
                    }

                    const actualOutput = stdout.toString().trim();
                    const testCaseResult = {
                        input,
                        expectedOutput,
                        actualOutput,
                        verdict: actualOutput === expectedOutput ? "Accepted" : "Wrong Answer",
                    };
                    results.push(testCaseResult);

                    executeTestCase(testCaseIndex + 1);
                });

                childProcess.stdin.write(input.replace(",", " ") + '\n'); 
                childProcess.stdin.end();
            };

            executeTestCase(0);
        });
    });
};

export const executeAndTestCpp = async (filepath, problemId, userId) => {
    try {
      const problem = await Problem.findById(problemId);
      if (!problem) {
        throw new Error(`Problem with id ${problemId} not found`);
      }
  
      const results = await executeCpp(filepath, problem);
  
      const allTestCasesPassed = results.every(result => result.verdict === "Accepted");
      if (allTestCasesPassed) {
        const solvedByUser = problem.solvedBy.find(sb => sb.user.equals(userId));
        if (solvedByUser) {
          solvedByUser.status = true; 
        } else {
          problem.solvedBy.push({ user: userId, status: true }); 
        }
        await problem.save();
      }
  
      return results;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
};
