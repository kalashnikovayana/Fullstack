import { Button } from './Button.jsx'
import './ProductCard.css'

export const ProductCard = (props) => {
  const product = props.info

  return (
    <div className="card">
      <div className="card__image">
        {product.isDiscount && <div className="card__badge">Sale</div>}
        {product.isOutOfStock && (
          <div className="card__badge card__badge--dark">Out of stock</div>
        )}
      </div>

      <h3 className="card__title">{product.name}</h3>
      <p className="card__description">Only at Cafe and Delivery</p>

      <div className="card__prices">
        <p className="card__price">${product.price.toFixed(2)}</p>
        {product.isDiscount ? (
          <p className="card__old-price">${product.oldPrice.toFixed(2)}</p>
        ) : null}
      </div>

      {product.isDiscount ? (
        <p className="card__promo">Get 20% Off in App</p>
      ) : null}

      <div className="card__button">
        <Button
          text={product.isOutOfStock ? 'Sold out' : 'Add to cart'}
          isDark
          isSmall
          disabled={product.isOutOfStock}
          onClick={() => props.onAddToCart(product)}
        />
      </div>
    </div>
  )
}
