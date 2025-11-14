
import React,{useState} from "react";
function TestTextarea(props) {
  const [getContent, setContent] = useState("")
  const [errE, setErrE] = useState("")

  function handelContent(e) {
    setContent(e.target.value);
    if (errE !== "") {
      setErrE("");
    }
  }

  function handelSubmit(e){
    e.preventDefault();

    if(getContent===""){
      setErrE("nhap content")
    }
  }

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <textarea onChange={handelContent}>{getContent}</textarea>
        <p>{errE}</p>
        <button type="submit">Click</button>
      </form>
    </div>
  )
}

export default TestTextarea;