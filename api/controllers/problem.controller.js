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
    const problems = await Problem.findById({ _id: id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProblems = async (req, res) => {
  try {
    const id = req.params.id;
    const problems = await Problem.findByIdAndUpdate(
      { _id: id },
      {
        title: req.body.title,
        difficulty: req.body.difficulty,
        category: req.body.category,
        solution: req.body.solution,
        description: req.body.description,
        input: req.body.input,
        output: req.body.output,
        explanation: req.body.explanation,
        testcase1: req.body.testcase1,
      }
    );
    res.status(200).json(problems);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ message: error });
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

export const countproblems = async (req, res, next) => {
  try {
    const PoblemCount = await Problem.countDocuments();
    res.status(200).json({ count: PoblemCount });
  } catch (error) {
    next(error);
  }
};

export const Example = async (req, res, next) => {
  const selectedOption = req.body.selectedOption;
  
  // Process the selected option data as needed
  // Send response back to the client if necessary
  res.send('Data received on the backend: ' + selectedOption);
}



export const getSolvedProblems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('solvedProblems');
    res.status(200).json(user.solvedProblems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};