import { exec } from "child_process";
import fs from 'fs';
import path from 'path';
import ProblemPage from '../../models/ProblemPage.model.js';

const rootDir = path.resolve();
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, problem) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    const { testcase1 } = problem;

    return new Promise((resolve, reject) => {
        // Compile the user's code
        const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
        exec(compileCommand, (compileError) => {
            if (compileError) {
                console.error("Compilation Error: ", compileError);
                reject({ error: compileError });
                return;
            }

            // Execute the compiled code against the test case
            const command = `"${outPath}"`;
            const { input, output: expectedOutput } = testcase1;
            const childProcess = exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("Execution Error: ", error);
                    reject({ verdict: "Runtime Error", output: stderr });
                    return;
                }

                // Compare the output with expected output
                const actualOutput = stdout.toString().trim(); // Convert stdout to string
                if (actualOutput === expectedOutput) {
                    resolve({ verdict: "Accepted", output: actualOutput });
                } else {
                    resolve({ verdict: "Wrong Answer", output: actualOutput });
                }
            });

            // Provide input to the program
            childProcess.stdin.write(input);
            childProcess.stdin.end();
        });
    });
};

export const executeAndTestCpp = async (filepath, problemId) => {
    try {
        const problem = await ProblemPage.findById(problemId);
        if (!problem) {
            throw new Error(`Problem with id ${problemId} not found`);
        }

        const { verdict, output } = await executeCpp(filepath, problem);
        console.log("Verdict:", verdict);
        console.log("Output:", output);

        return verdict === "Accepted";
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
