import React from 'react'
import Split from 'react-split'
import ProblemDescription from './ProblemDescription.jsx'
import PlayGround from './PlayGround/PlayGround.jsx'

export default function WorkSpace() {
  return (
    <Split className='split' direction='horizontal' maxSize={1000}>
        <div><ProblemDescription /></div>
        <div><PlayGround /></div>
    </Split>
  )
}
