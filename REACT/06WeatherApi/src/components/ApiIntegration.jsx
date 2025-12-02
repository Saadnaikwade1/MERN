import React, { useEffect, useState } from 'react'
import axios from 'axios';

function ApiIntegration() {
  let [arr,setArr]=useState([])
  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/comments")
    .then((res)=>{
      setArr(res.data)
      // console.log(res.data);
    }).catch((err)=>{
        console.log("error while retreving the data",err)
    })
},[])
  return (
    <div>
      <table border={1}>
        <tr>
          <th>SNO</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
        </tr>
        {
          arr.map((obj)=>{
            return(
              <tr>
                <td>{obj.id}</td>
                <td>{obj.name}</td>
                <td>{obj.email}</td>
                <td>{obj.body}</td>
              </tr>
            )
          })
        }

      </table>
    </div>
  )
}

export default ApiIntegration
