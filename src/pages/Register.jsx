import React from 'react'

const Register = () => {
  return (    
  <div className="flex h-screen overflow-hidden">

  {/* Sidebar */}
   <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

  </div>
  )
}

export default Register