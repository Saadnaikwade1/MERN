import React, { useState } from "react";

function Counter() {
  let [c, setC] = useState(0);

  return (
    <div
      style={{width: "30%",height:"20vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center', background: "#ccc",textAlign:"center", border:"2px solid black" }}
    >
      <div>{c}</div>
      <div>
        <button onClick={() => setC(c + 1)}>Inc</button>&nbsp;
        <button onClick={() => setC(c > 0 ? c - 1 : c)}>Dec</button>&nbsp;
        <button onClick={() => setC((c = 0))}>Reset</button>&nbsp;
      </div>
    </div>
  );
}

export default Counter;
