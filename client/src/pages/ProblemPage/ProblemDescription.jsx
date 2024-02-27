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
            <div className="px-5">
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
                <div className="text-white text-sm">
                  <p>
                    {problem.description}
                  </p>
                  {/* <p className="mt-3">
                    You may assume that each input would have{" "}
                    <strong>exactly one solution</strong>, and you may not use
                    the same element twice.
                  </p>
                  <p className="mt-3">You can return the answer in any order.</p> */}
                </div>
                <div className="mt-4">
                  <div>
                    <p className="font-medium text-white ">Example 1: </p>
                    <div className="example-card text-white bg-dark-fill-2">
                      <pre>
                        <strong className="text-white">Input: </strong>
                        {problem.input}
                        <br />
                        <strong>Output:</strong>
                        {problem.output}
                        <br />
                        <strong>Explanation:</strong> {problem.explanation}
                      </pre>
                    </div>
                  </div>
                </div>
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
