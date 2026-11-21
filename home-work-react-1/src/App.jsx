import { useState } from 'react'
import Button from './components/Button.jsx'
import Input from './components/Input.jsx'

function App() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage(`Привіт, ${name || 'гість'}! Довжина пароля: ${password.length}`)
  }

  const handleClear = () => {
    setName('')
    setPassword('')
    setMessage('')
  }

  return (
    <main className="app">
      <h1>React компоненти</h1>

      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Введіть ім'я"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          type="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="buttons">
          <Button text="Надіслати" type="submit" />
          <Button text="Очистити" type="button" onClick={handleClear} />
        </div>
      </form>

      <p className="preview">Ви ввели ім'я: {name}</p>
      {message && <p className="message">{message}</p>}
    </main>
  )
}

export default App
