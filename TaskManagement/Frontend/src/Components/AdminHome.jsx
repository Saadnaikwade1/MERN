import React from 'react'

function AdminHome() {
    let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    if(obj.state.token=="")
    {
      navigate("/")
    }

  },[])
    return (
        <div>AdminHome</div>
    )
}

export default AdminHome
