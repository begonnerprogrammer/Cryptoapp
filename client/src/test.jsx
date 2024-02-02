import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Test = () => {
  return (
    <>
      <h1>test</h1>
      <Link to={"/"}><button>home</button></Link>
    </>
  )
}

export default Test
