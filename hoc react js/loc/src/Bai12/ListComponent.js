import React from "react";
import ReactDOM from 'react-dom/client';
import {Routes, BrowserRouter,Route, Router} from 'react-router-dom'
const num = [1,2,3,4,5];
// const listitem= num.map((number) => <li>{number}</li>);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <ul>{listitem}</ul>
// );

function NumberList(props) {
    const numbers = props.numbers;

    function listItem() {
        return numbers.map((number)=>{
            return (
                <li key={number.toString()}>
                    {number}
                </li>
            )
        })
    }
    return(
        <ul>{listItem()}</ul>
    )
}
export default NumberList;