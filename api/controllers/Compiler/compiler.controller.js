import { generateFile } from './generateFile.js';
import { executeAndTestCpp } from './executeCpp.js';

export const runGenerateFile = async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeAndTestCpp(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
