import React from 'react'
import SideOne from '../Components/SideOne'
import SideTwo from '../Components/SideTwo'

function Homepage() {
  return (
    <div id="side_layout" className="flex flex-col md:flex-row">
      <SideOne />
      <SideTwo />
    </div>

  )
}

export default Homepage