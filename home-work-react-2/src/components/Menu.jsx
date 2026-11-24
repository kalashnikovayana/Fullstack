import { ProductCard } from './ProductCard.jsx'
import { Button } from './Button.jsx'
import './Menu.css'

export const Menu = (props) => {
  if (props.isLoading) {
    return (
      <div className="menu">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <section className="menu">
      <h1 className="menu__title">Our Menu</h1>

      <div className="menu__list">
        {props.products.map((product) => {
          return <ProductCard key={product.id} info={product} />
        })}
      </div>

      <Button text="Load More" />
    </section>
  )
}
