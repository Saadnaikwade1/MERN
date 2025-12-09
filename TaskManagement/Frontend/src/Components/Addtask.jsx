import React from 'react'

function Addtask() {
    let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.token=="")
    {
      navigate("/")
    }

  },[])
    return (
        <div>Add task</div>
    )
}

export default Addtask
