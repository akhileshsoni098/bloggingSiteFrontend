import React from 'react'
import { Link } from 'react-router-dom'

const LogInButton = () => {
  return (
     <Link
          to="/login"
          className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Login
        </Link>
  )
}

export default LogInButton