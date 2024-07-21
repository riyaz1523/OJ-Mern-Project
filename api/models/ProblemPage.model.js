import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  }
}, { _id: false });

const solvedBySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

const problemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
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
    testCases: {
      type: [testCaseSchema],
      required: true,
    },
    solvedBy: {
      type: [solvedBySchema], 
      default: [], 
    }
  },
  { timestamps: true }
);

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
