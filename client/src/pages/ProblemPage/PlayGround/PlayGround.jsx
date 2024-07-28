import React, { useState } from "react";
import Split from "react-split";
import PrefNav from "./PrefNav";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import FooterValidator from "./FooterValidator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function PlayGround({ problem }) {
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCase, setActiveCase] = useState(0); // State to track active case
  const { currentUser } = useSelector((state) => state.user);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (value) => {
    setSelectedLanguage(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const user_id = currentUser._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/compiler/generateFile`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code,
          problemId: problem._id,
          userId: user_id
        }),
      });
      const data = await response.json();
      if (data.output) {
        toast.success("Hurray! You are right");
      } else {
        toast.warn("Oops, Wrong answer");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PrefNav
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={handleLanguageChange}
      />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={code}
            onChange={handleCodeChange}
            theme={vscodeDark}
            extensions={[selectedLanguage === 'cpp' ? cpp() : javascript()]} 
          />
        </div>
        {problem && (
          <div className="w-full px-5 overflow-auto">
            <div className="flex h-10 items-center space-x-6">
              <div className="relative flex h-full flex-col justify-center cursor-pointer">
                <div className="text-sm font-medium leading-5 text-white">
                  Testcases
                </div>
                <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
              {problem.testCases && problem.testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div
                    onClick={() => setActiveCase(index)} 
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap text-white mb-2 ${
                      activeCase === index ? 'bg-dark-fill-2' : ''
                    }`} // Highlight active case
                  >
                    Case {index + 1}
                  </div>
                  {activeCase === index && ( 
                    <div className="w-full cursor-text rounded-lg border px-3 py-2 bg-dark-fill-3 border-transparent text-white">
                      {testCase.input}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Split>
      <FooterValidator handleSubmit={handleSubmit} loading={loading} setLoading={setLoading}/>
      <ToastContainer theme="dark"/>
    </div>
  );
}
