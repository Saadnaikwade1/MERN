import React, { useEffect, useState } from "react";

function DigitalClock() {
  let [d, setD] = useState(new Date());

  let upd = () => {
    setD(new Date());
  };

  useEffect(() => {
    setInterval(upd, 1000);
  }, []);

  return <div className="DigitalClock"><h1>DigitalClock</h1>
  <h3>{d.toLocaleTimeString()}</h3></div>;
}

export default DigitalClock;
