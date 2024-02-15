import ProblemPage from "../models/ProblemPage.model.js";
import dotenv from "dotenv";

export const createProblem = async (req, res, next) => {
  const { title, difficulty, category, solution } = req.body;
  ProblemPage.create(req.body)
    .then((problems) => res.json(problems))
    .catch((err) => res.json(err));
};

export const getProblems = async (req, res) => {
  try {
    const problems = await ProblemPage.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getproblemsParams = async (req, res) => {
  try {
    const id = req.params.id;
    const problems = await ProblemPage.findById({ _id: id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProblems = async (req, res) => {
  try {
    const id = req.params.id;
    const problems = await ProblemPage.findByIdAndUpdate(
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
    const problems = await ProblemPage.findByIdAndDelete({ _id: id });
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
