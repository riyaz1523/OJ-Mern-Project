import { generateFile } from './generateFile.js';
// import { executeJava } from './executeJava.js';
import { executeCpp } from './executeCpp.js';

export const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };

export const runGenerateFile = async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        // const output = await executeJava(filePath);
        res.json({ filePath, output });
    }catch (error) {
        res.status(500).json({ message: error });
    }
} 