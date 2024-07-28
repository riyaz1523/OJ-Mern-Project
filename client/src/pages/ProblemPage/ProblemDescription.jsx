import React from "react";

export default function ProblemDescription({ problem }) {
  const difficulyColor =
    problem.difficulty === "Easy"
      ? "bg-dark-green-s text-dark-green-s"
      : problem.difficulty === "Medium"
      ? "bg-dark-yellow text-dark-yellow"
      : "bg-dark-pink text-dark-pink";

  return (
    <>
      {problem ? (
        <div className="bg-dark-layer-1 h-screen">
          <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
            <div
              className={
                "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
              }
            >
              Description
            </div>
          </div>

          <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
            <div className="px-5 w-full">
              <div className="w-full">
                <div className="flex space-x-4">
                  <div className="flex-1 mr-2 text-lg text-white font-medium">
                    {problem.title}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div className={`inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize ${difficulyColor}`}>
                    {problem.difficulty}
                  </div>
                </div>
                <div className="text-white text-sm mt-4">
                  <p>{problem.description}</p>
                </div>
                <div className="text-white text-sm mt-4">
                  <p>{problem.explanation}</p>
                </div>

                {/* Dynamically render test cases */}
                {problem.testCases && problem.testCases.length > 0 && (
                  <div className="mt-4">
                    {problem.testCases.map((testCase, index) => (
                      <div key={index} className="w-full mb-4">
                        <p className="font-medium text-white">Example {index + 1}:</p>
                        <div className="example-card text-white bg-dark-fill-2 p-4 rounded-lg w-full">
                          <pre>
                            <strong className="text-white">Input:</strong>
                            <br />
                            {testCase.input}
                            <br />
                            <strong>Output:</strong>
                            <br />
                            {testCase.output}
                            <br />
                            {testCase.explanation && (
                              <>
                                <strong>Explanation:</strong>
                                <br />
                                {problem.explanation}
                              </>
                            )}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No problem found.</div>
      )}
    </>
  );
}
