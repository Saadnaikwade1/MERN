import React, { useContext } from 'react'
import ct from './ct'

function D() {
    let {name,age}=useContext(ct)
    return (
    
        <div>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
        </div>

        
    )
}

export default D
