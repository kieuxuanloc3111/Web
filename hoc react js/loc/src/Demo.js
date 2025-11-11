import React from 'react'

const Demo = (props) => {
    console.log("đây là bên phần demo : " , props.zz);
  return (
    <div>Demo:{props.zz}</div>
  )
}

export default Demo