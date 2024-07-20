import { generateFile } from './generateFile.js';
import { executeAndTestCpp } from './executeCpp.js';
import { executeAndTestJava } from './executeJava.js';
import { executeAndTestPython } from './executePython.js';

export const runGenerateFile = async (req, res) => {
    const { language, code, problemId } = req.body;
    const userId = req.user?.id; 
  
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized: User ID not provided" });
    }
  
    if (code === undefined) {
      return res.status(400).json({ success: false, error: "Empty code!" });
    }
  
    try {
      const filePath = await generateFile(language, code);
      let output;
  
      if (language === 'cpp') {
        output = await executeAndTestCpp(filePath, problemId, userId);
      } else if (language === 'java') {
        output = await executeAndTestJava(filePath, problemId, userId);
      } else if (language === 'py') {
        output = await executeAndTestPython(filePath, problemId, userId);
      } else {
        throw new Error(`Language "${language}" is not supported`);
      }
  
      res.json({ filePath, output });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  