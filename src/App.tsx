import './App.css'
import Home from './components/Home'
import Help from './components/Help'
import {Route, BrowserRouter, Routes} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/help' element={<Help/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
