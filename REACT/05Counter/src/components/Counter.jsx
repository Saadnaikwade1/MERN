import React, { useEffect, useState } from 'react'

function Counter() {
let [s,setS]=useState(50)
let [m,setM]=useState(0)
let [iid,setIid]=useState(-1)

let inc=()=>{
    setS((prev)=>prev+1)
}

let startStop=()=>{
    if(iid==-1){
        setIid(setInterval(inc,1000))
    }
    else{
        clearInterval(iid)
        setIid(-1)
    }
}

let reset=()=>{
    clearInterval(iid)
    setIid(-1)
    setS(0)
    setM(0)
}

useEffect(()=>{
    if (s==60){
        setM(m+1)
        setS(0)
    }
},[s])
    return (
        <div>
            <div className='counter'>
                <h1>Counter</h1>
                <h1>{m<10?"0"+m:m}:{s<10?"0"+s:s}</h1>
                <button style={{width:"70px"}} onClick={startStop}>{iid==-1?"Start":"Pause"}</button>
                <button style={{width:"60px"}} onClick={reset}>Reset</button>
            </div>    
        </div>
    )
}


export default Counter
