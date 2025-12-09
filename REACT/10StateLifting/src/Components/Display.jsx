import React from 'react'

function Display(props) {
    return (
        <div style={{width:"50px", height:"50px",padding:"10px",color:"white", backgroundColor:"#333",fontSize:"24px", borderRadius:"50%", margin:"10px", boxSizing:"border-box"}}>{props.c}</div>
    )
}

export default Display
