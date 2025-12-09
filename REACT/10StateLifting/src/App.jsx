import React, { useState } from "react";
import Display from "./Components/Display";
import Button from "./Components/Button";
import './App.css'
import UsertContext from "./Components/UserContext";

function App() {
  let [c, setC] = useState(0);
  let [msg,setMsg]=useState("")

  let inc = () => {
    setC(c + 1);
    setMsg("")
  };
  let dec = () => {
    if (c > 0) {
      setC(c - 1);
      setMsg('')
    }
    else if(c==0){
        setMsg("You can’t reduce it further; zero is the minimum⚠️")

    }
  };
  return (
    <div style={{width:"200px",textAlign:"center", background:"#f5f5f5",padding:"5px",display:"flex", flexDirection:"column",alignItems:"center"}}>
        <h1>State lifting </h1>
       
        <UsertContext.Provider  value={{inc,dec,c}}>

      
      <Display c={c} />
      <div>
        <Button fun={"inc"} name={"INC"} />
      <Button fun={"dec"} name={"DEC"} />
      <Button fun={()=>setC(0)} name={"RESET"} />

      </div>
      
         <p style={{color:"red", fontFamily:"roboto"}}>{msg}</p>
           </UsertContext.Provider>
    </div>
  );
}

export default App;
