import { exec } from "child_process";
import fs from 'fs';
import path from 'path';

const rootDir = path.resolve();
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');
const testCasesPath = path.join(rootDir, 'api', 'controllers', 'Compiler','test_cases.json'); // Path to test cases file

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, testCases) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        // Compile the user's code
        const compileCommand = `g++ "${filepath}" -o "${outPath}"`;
        exec(compileCommand, (compileError) => {
            if (compileError) {
                console.error("Compilation Error: ", compileError);
                reject({ error: compileError });
                return;
            }
    
            // Execute the compiled code against each test case
            const promises = testCases.map((testCase, index) => {
                const { input, output: expectedOutput } = testCase;
    
                const command = `"${outPath}"`;
                return new Promise((resolveTestCase, rejectTestCase) => {
                    const childProcess = exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.error("Execution Error: ", error);
                            rejectTestCase({ verdict: "Runtime Error", output: stderr });
                            return;
                        }
        
                        // Compare the output with expected output
                        const actualOutput = stdout.trim();
                        if (actualOutput === expectedOutput) {
                            resolveTestCase({ verdict: "Accepted", output: actualOutput });
                        } else {
                            resolveTestCase({ verdict: "Wrong Answer", output: actualOutput, index });
                        }
                    });
        
                    // Provide input to the program
                    childProcess.stdin.write(input);
                    childProcess.stdin.end();
                });
            });
    
            Promise.all(promises)
                .then((results) => {
                    // Check if all verdicts are "Accepted"
                    const allAccepted = results.every(result => result.verdict === "Accepted");
                    resolve({ allAccepted, failedTestCases: results.filter(result => result.verdict !== "Accepted") });
                })
                .catch((error) => reject(error));
        });
    });
};


// Load test cases from file
const testCasesData = fs.readFileSync(testCasesPath, 'utf8');
const testCases = JSON.parse(testCasesData);

// Usage
export const executeAndTestCpp = async (filepath) => {
    try {
        const { allAccepted, failedTestCases } = await executeCpp(filepath, testCases);
        console.log("All tests passed:", allAccepted);
        if (!allAccepted) {
            console.log("Failed test cases:", failedTestCases);
        }
        return allAccepted;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
};
