import React, { useEffect, useState } from "react";
import Split from "react-split";
import PrefNav from "./PrefNav";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import FooterValidator from "./FooterValidator";
import axios from "axios";

export default function PlayGround() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/problem/")
      .then((result) => {
        setProblems(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PrefNav />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            // value={userCode}
            theme={vscodeDark}
            // onChange={onChange}
            extensions={[javascript()]}
            // style={{ fontSize: settings.fontSize }}
          />
        </div>
        {problems.map((problem) => {
          return (
            <div className="w-full px-5 overflow-auto">
              <div className="flex h-10 items-center space-x-6">
                <div className="relative flex h-full flex-col justify-center cursor-pointer">
                  <div className="text-sm font-medium leading-5 text-white">
                    Testcases
                  </div>
                  <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
                </div>
              </div>
              <div className="flex">
                <div
                  className="mr-2 items-start mt-2 "
                  // key={example.id}
                  // onClick={() => setActiveTestCaseId(index)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white">
                      Case
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-semibold my-4">
                <p className="text-sm font-medium mt-4 text-white">Input:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                {problem.input}
                </div>
                <p className="text-sm font-medium mt-4 text-white">Output:</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {problem.output}
                </div>
              </div>
            </div>
          );
        })}
      </Split>
      <FooterValidator />
    </div>
  );
}
