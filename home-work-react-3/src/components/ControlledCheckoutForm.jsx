import { useState } from 'react'
import { Button } from './Button.jsx'
import './ControlledCheckoutForm.css'

export const ControlledCheckoutForm = (props) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    props.onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
    })
  }

  return (
    <form className="checkout" onSubmit={handleSubmit}>
      <h2 className="checkout__title">Checkout</h2>

      <label className="checkout__field">
        Name
        <input
          className="checkout__input"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label className="checkout__field">
        Phone
        <input
          className="checkout__input"
          type="tel"
          required
          pattern="\+?[0-9\s()\-]{10,20}"
          title="10–20 digits"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>

      <label className="checkout__field">
        Address
        <input
          className="checkout__input"
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>

      <p className="checkout__total">
        Total: <strong>${props.total.toFixed(2)}</strong>
      </p>

      <Button text="Confirm order" type="submit" isDark />
      <Button text="Cancel" onClick={props.onCancel} />
    </form>
  )
}
