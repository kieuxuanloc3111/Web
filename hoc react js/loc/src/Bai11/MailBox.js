import React from 'react'


function MailBox(props) {
    const xx = props.xx;
    return(
        <div>
            <h1>hello!</h1>
            {xx.length >0 && 
            <h2>
                you have {xx.length} unread message
            </h2>

            }
        </div>
    );
}
export default MailBox