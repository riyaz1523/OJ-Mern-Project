import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import Split from 'react-split'
import ProblemDescription from './ProblemDescription.jsx'
import PlayGround from './PlayGround/PlayGround.jsx'

export default function WorkSpace() {
  const { id } = useParams();
  const [problem, setProblem] = useState([]);

  useEffect(() => {
    axios
      .get(`/problem/getProblemsparams/${id}`)
      .then((result) => {
        setProblem(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Split className='split h-screen' direction='horizontal' maxSize={1000}>
      <div><ProblemDescription problem={problem} /></div>
      <div><PlayGround problem={problem}/></div>
    </Split>
  )
}
