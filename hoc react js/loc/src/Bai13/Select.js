import React,{useState} from "react";

function Select(props) {
  const [getInput, setInput] = useState("")
  const [errE, setErrE] = useState("")

  function handelInput(e){
    setInput(e.target.value)
    if (errE !== "") {
      setErrE("");
    }
  }

  function handelSubmit(e){
    e.preventDefault();

    if(getInput===""){
      setErrE("nhap input")
    }else{
      setErrE("")
    }
  }

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <select value={getInput} onChange={handelInput}>
          <option value=""> vui long chon</option>
          <option value="1">female</option>
          <option value="2">male</option>
        </select>
        <p>{errE}</p>
        <button type="submit">Click</button>
      </form>
    </div>
  )
}

export default Select;