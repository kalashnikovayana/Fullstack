import { Button } from './Button.jsx'
import './CartItem.css'

export const CartItem = (props) => {
  const item = props.item

  return (
    <div className="cart-item">
      <div className="cart-item__image"></div>

      <div className="cart-item__info">
        <h3 className="cart-item__title">{item.name}</h3>
        <p className="cart-item__price">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
      </div>

      <div className="cart-item__counter">
        <Button
          text="−"
          isSmall
          disabled={item.quantity <= 1}
          onClick={() => props.onChangeQuantity(item.id, -1)}
        />
        <span>{item.quantity}</span>
        <Button
          text="+"
          isSmall
          onClick={() => props.onChangeQuantity(item.id, 1)}
        />
      </div>

      <Button
        text="Remove"
        isSmall
        onClick={() => props.onRemove(item.id)}
      />
    </div>
  )
}
