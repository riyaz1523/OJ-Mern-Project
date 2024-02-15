import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema(
  {
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    //   },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    testcase1: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProblemPage = mongoose.model('Problem', ProblemSchema);

export default ProblemPage;
