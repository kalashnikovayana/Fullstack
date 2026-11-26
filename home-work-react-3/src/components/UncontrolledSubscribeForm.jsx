import { useRef, useState } from 'react'
import { Button } from './Button.jsx'
import './UncontrolledSubscribeForm.css'

export const UncontrolledSubscribeForm = () => {
  const emailRef = useRef(null)

  const [subscribedEmail, setSubscribedEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const email = emailRef.current.value.trim()

    setSubscribedEmail(email)

    emailRef.current.value = ''
  }

  return (
    <section className="subscribe">
      <h2 className="subscribe__title">Get 20% Off</h2>
      <p className="subscribe__text">
        Subscribe and get a promo code for your first order.
      </p>

      <form className="subscribe__form" onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          className="subscribe__input"
          type="email"
          placeholder="Your email"
          required
        />
        <Button text="Subscribe" type="submit" isDark />
      </form>

      {subscribedEmail && (
        <p className="subscribe__success">
          Thank you! Promo code is sent to {subscribedEmail}
        </p>
      )}
    </section>
  )
}
