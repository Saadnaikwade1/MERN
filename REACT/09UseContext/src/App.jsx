import React from 'react'
import ct from './components/ct'
import A from './components/A'
function App() {
    let data={name:"saad",age:23}
    return (
       <ct.Provider value={data}>
        <A/>
       </ct.Provider>
    )
}

export default App
