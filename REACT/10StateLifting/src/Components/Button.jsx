import React, { useContext } from 'react'
import UsertContext from './UserContext'

function Button({fun,name}) {

    let {inc,dec}=useContext(UsertContext)

let handleClick=()=>{
    if (fun==="inc") inc();
    else if (fun==="dec") dec();
    else fun()
}
    
    return (
        <button style={{color:"#FFFFFF", background:"#3B82F6",border:"none",margin:"5px",padding:"10px",borderRadius:"10px"}} onClick={handleClick}>{name}</button>
    )
}

export default Button
