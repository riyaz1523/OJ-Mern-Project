// import { exec } from 'child_process';
// import fs from 'fs';
// import path from 'path';

// const rootDir = path.resolve();
// const outputPath = path.join(rootDir, 'api', 'controllers', 'Compiler', 'outputs');

// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeJava = (filePath) => {
//     return new Promise((resolve, reject) => {
//         const jobId = path.basename(filePath).split('.')[0];
//         const className = jobId;
//         const classFilePath = path.join(outputPath, `${className}.class`);

//         // Compile the Java file
//         const compileCommand = `javac ${filePath} -d ${outputPath}`;

//         console.log('Compiling command: ', compileCommand);

//         exec(compileCommand, (compileError, compileStdout, compileStderr) => {
//             console.log('Compile Stdout: ', compileStdout);
//             console.error('Compile Stderr: ', compileStderr);

//             if (compileError) {
//                 console.error('Compile Error: ', compileError);
//                 reject({ error: compileError, stderr: compileStderr });
//                 return;
//             }

//             // Check if the .class file exists
//             if (!fs.existsSync(classFilePath)) {
//                 const errorMessage = `Failed to compile Java file. No .class file generated for ${jobId}`;
//                 console.error(errorMessage);
//                 reject(errorMessage);
//                 return;
//             }

//             // Move the generated .class file to the desired output path
//             fs.renameSync(classFilePath, path.join(outputPath, `${jobId}.class`));

//             // Execute the Java program
//             const executeCommand = `java -classpath ${outputPath} ${className}`;

//             console.log('Executing command: ', executeCommand);

//             exec(executeCommand, (executeError, executeStdout, executeStderr) => {
//                 console.log('Execute Stdout: ', executeStdout);
//                 console.error('Execute Stderr: ', executeStderr);

//                 if (executeError) {
//                     console.error('Execute Error: ', executeError);
//                     reject({ error: executeError, stderr: executeStderr });
//                 } else if (executeStderr) {
//                     console.error('Execute Stderr: ', executeStderr);
//                     reject(executeStderr);
//                 } else {
//                     resolve(executeStdout);
//                 }
//             });
//         });
//     });
// };

// export { executeJava };
