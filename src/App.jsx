import './App.css'
import TestButton from './pages/testButton'
import { BrowserRouter } from "react-router-dom";
import LassoCursor from './components/lassoCursor'

function App() {


  return (
    <BrowserRouter>
      <LassoCursor />
      <TestButton />
    </BrowserRouter>
  )
}
export default App
