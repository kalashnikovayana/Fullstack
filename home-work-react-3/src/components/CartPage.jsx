import { CartItem } from './CartItem.jsx'
import { Button } from './Button.jsx'
import './CartPage.css'

export const CartPage = (props) => {
  const isEmpty = props.cart.length === 0

  return (
    <section>
      <h1 className="page-title">Your Cart</h1>

      <div className="cart">
        <div className="cart__items">
          {isEmpty && (
            <div className="cart__empty">
              <p>Your cart is empty.</p>
              <Button text="Go to menu" onClick={props.onGoToMenu} />
            </div>
          )}

          {props.cart.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                onChangeQuantity={props.onChangeQuantity}
                onRemove={props.onRemove}
              />
            )
          })}
        </div>

        <aside className="cart__summary">
          <h2 className="cart__summary-title">Total</h2>
          <p className="cart__total">${props.total.toFixed(2)}</p>
          <Button
            text="Checkout"
            isDark
            disabled={isEmpty}
            onClick={props.onCheckout}
          />
          <Button
            text="Clear cart"
            disabled={isEmpty}
            onClick={props.onClear}
          />
        </aside>
      </div>
    </section>
  )
}
