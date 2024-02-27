import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import ProblemPage from '../../models/ProblemPage.model.js';


const rootDir = path.resolve();
const tempDir = path.join(rootDir, 'api', 'controllers', 'Compiler','temp'); // Temporary directory
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

export const executeJava = (filepath, problem) => {
    const jobId = path.basename(filepath).split(".")[0];
    const tempFilePath = path.join(tempDir, `${jobId}.java`);
    const outPath = path.join(outputPath, `${jobId}.class`);
    const { testcase1 } = problem;

    return new Promise((resolve, reject) => {
        // Copy the Java file to the temporary directory
        fs.copyFile(filepath, tempFilePath, (copyError) => {
            if (copyError) {
                console.error("File Copy Error: ", copyError);
                reject({ error: copyError });
                return;
            }

            // Compile the Java file in the temporary directory
            const compileCommand = `javac "${tempFilePath}" -d "${tempDir}"`;
            exec(compileCommand, (compileError) => {
                if (compileError) {
                    console.error("Compilation Error: ", compileError);
                    reject({ error: compileError });
                    return;
                }

                // Move the compiled class file to the output directory with jobId as filename
                fs.rename(path.join(tempDir, `${jobId}.class`), outPath, (moveError) => {
                    if (moveError) {
                        console.error("Move Error: ", moveError);
                        reject({ error: moveError });
                        return;
                    }

                    // Execute the compiled code against the test case
                    const command = `java -classpath "${outputPath}" ${jobId}`;
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
        });
    });
};

export const executeAndTestJava = async (filepath, problemId) => {
    try {
        const problem = await ProblemPage.findById(problemId);
        if (!problem) {
            throw new Error(`Problem with id ${problemId} not found`);
        }

        const { verdict, output } = await executeJava(filepath, problem);
        console.log("Verdict:", verdict);
        console.log("Output:", output);

        return verdict === "Accepted";
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};

