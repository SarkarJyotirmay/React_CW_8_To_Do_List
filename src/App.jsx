import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import First from './pages/First'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {index: true, element: <Home />},
      {path: "*", element: <NotFound />}
    ]

  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App