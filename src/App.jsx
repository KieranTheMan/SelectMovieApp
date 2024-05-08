
import { Routes, Route } from 'react-router-dom'
import Start from './Start.jsx'
import AiResponse from './AiResponse.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='response' element={<AiResponse/>}/>
      </Routes>
    </>
  )
}

export default App
