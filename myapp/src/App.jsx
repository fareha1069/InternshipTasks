import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "tailwindcss"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import Paste from "./Components/Paste"
import ViewPaste from "./Components/ViewPaste"
 
const router = createBrowserRouter(
  [
      {
        path: "/",
        element : 
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
      path: "/pastes",
      element : 
      <div>
        <Navbar/>
        <Paste/>
      </div>
      },
       {
      path: "/viewPaste/:id",
      element : 
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
      },
      {
      path: "/pastes/:id",
      element : 
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
      }
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    {/* Hello */}
   {/* <div className="bg-red-500 p-4 text-white">
  Hello World
</div> */}

    <RouterProvider router={router} />
   
   </div>
  )
}

export default App
