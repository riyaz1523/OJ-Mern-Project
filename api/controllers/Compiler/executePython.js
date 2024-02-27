import { exec } from "child_process";
import fs from 'fs';
import path from 'path';
import ProblemPage from '../../models/ProblemPage.model.js';

const rootDir = path.resolve();
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath, problem) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.txt`); // Output file path
    const { testcase1 } = problem;

    return new Promise((resolve, reject) => {
        // Execute the Python script
        const command = `python "${filepath}"`;
        const childProcess = exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Execution Error: ", error);
                reject({ verdict: "Runtime Error", output: stderr });
                return;
            }

            // Write the output to the output file
            fs.writeFile(outPath, stdout, (writeError) => {
                if (writeError) {
                    console.error("Write Error: ", writeError);
                    reject({ error: writeError });
                    return;
                }

                // Compare the output with expected output
                const actualOutput = stdout.toString().trim(); // Convert stdout to string
                const expectedOutput = testcase1.output.trim(); // Get expected output from testcase1
                if (actualOutput === expectedOutput) {
                    resolve({ verdict: "Accepted", output: actualOutput });
                } else {
                    resolve({ verdict: "Wrong Answer", output: actualOutput });
                }
            });
        });

        // Provide input to the program
        childProcess.stdin.write(testcase1.input);
        childProcess.stdin.end();
    });
};

export const executeAndTestPython = async (filepath, problemId) => {
    try {
        const problem = await ProblemPage.findById(problemId);
        if (!problem) {
            throw new Error(`Problem with id ${problemId} not found`);
        }

        const { verdict, output } = await executePython(filepath, problem);
        console.log("Verdict:", verdict);
        console.log("Output:", output);

        return verdict === "Accepted";
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
