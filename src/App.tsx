import { useState } from 'react'
// import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LoginForm />
    </div>
  )
}

export default App