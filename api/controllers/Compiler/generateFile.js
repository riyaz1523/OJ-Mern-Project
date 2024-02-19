import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Get the root directory of the project
const rootDir = path.resolve();

const dirCodes = path.join(rootDir, 'api', 'controllers', 'Compiler', 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobID = uuidv4();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.promises.writeFile(filePath, content);
    return filePath;
};

export { generateFile };
