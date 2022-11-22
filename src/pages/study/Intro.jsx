import React from 'react'

const Intro = ({studyData}) => {
  const test = studyData;

  return (
    <div>
      <p>{test.title}</p>
    </div>
  )
}

export default Intro