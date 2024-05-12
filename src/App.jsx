
import {Router, Routes, Route} from 'react-router-dom'
import Start from './Start.jsx'
import AiResponse from './AiResponse.jsx'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='response' element={<AiResponse/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
