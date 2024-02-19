import { exec } from "child_process";
import fs from 'fs';
import path from 'path';

const rootDir = path.resolve();
const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        // Wrap file paths in double quotes
        const quotedFilePath = `"${filepath}"`;
        const quotedOutPath = `"${outPath}"`;

        const command = `g++ ${quotedFilePath} -o ${quotedOutPath} && cd "${outputPath}" && .\\${jobId}.exe`;
        console.log("Executing command: ", command);

        exec(command, (error, stdout, stderr) => {
            console.log("Stdout: ", stdout);
            console.error("Stderr: ", stderr);

            if (error) {
                console.error("Error: ", error);
                reject({ error, stderr });
            }
            if (stderr) {
                console.error("Stderr: ", stderr);
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

export {executeCpp};
