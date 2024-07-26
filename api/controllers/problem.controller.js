import Problem from "../models/ProblemPage.model.js";
import User from '../models/user.model.js';

export const createProblem = async (req, res, next) => {
  const { title, difficulty, category, solution, testcase1 } = req.body;
  Problem.create(req.body)
    .then((problems) => res.json(problems))
    .catch((err) => res.json(err));
};

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getproblemsParams = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Fetching problem with ID: ${id}`);
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const updateProblems = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      difficulty,
      category,
      solution,
      description,
      input,
      output,
      explanation,
      testCases,
      solvedBy
    } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      { _id: id },
      {
        title,
        difficulty,
        category,
        solution,
        description,
        input,
        output,
        explanation,
        testCases,
        solvedBy
      },
      { new: true } // To return the updated document
    );

    res.status(200).json(updatedProblem);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const problems = await Problem.findByIdAndDelete({ _id: id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};




// export const getSolvedProblems = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId).populate('solvedProblems');
//     res.status(200).json(user.solvedProblems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };