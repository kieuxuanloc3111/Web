

import React from 'react'

const HamTrue = () => {
  return (
    <div>
      <h1>day la ham true</h1>
    </div>
  )
}
const HamFalse = () => {
  return (
    <div>
      <h1>day la ham false</h1>
    </div>
  )
}


const Greeting = (props) => {
    const xx = props.xx
    if (xx == true){
        return <HamTrue/>
    }
    return <HamFalse/>
 
}

export default Greeting;
