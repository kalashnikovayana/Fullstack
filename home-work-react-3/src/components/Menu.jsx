import { useState } from 'react'
import { ControlledFilters } from './ControlledFilters.jsx'
import { ProductCard } from './ProductCard.jsx'
import { Button } from './Button.jsx'
import { UncontrolledSubscribeForm } from './UncontrolledSubscribeForm.jsx'
import './Menu.css'

export const Menu = (props) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [onlySale, setOnlySale] = useState(false)

  const [visibleCount, setVisibleCount] = useState(4)

  const handleReset = () => {
    setSearch('')
    setCategory('all')
    setSort('default')
    setOnlySale(false)
    setVisibleCount(4)
  }

  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 4)
  }

  if (props.isLoading) {
    return (
      <section>
        <h1 className="page-title">Our Menu</h1>
        <p className="info">Loading...</p>
        <div className="menu__list">
          {[1, 2, 3, 4].map((number) => {
            return <div key={number} className="menu__skeleton"></div>
          })}
        </div>
      </section>
    )
  }

  if (props.error) {
    return (
      <section>
        <h1 className="page-title">Our Menu</h1>
        <p className="info">Error: {props.error}</p>
      </section>
    )
  }

  const visibleProducts = props.products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase())
    const matchesCategory = category === 'all' || product.category === category
    const matchesSale = !onlySale || product.isDiscount

    return matchesSearch && matchesCategory && matchesSale
  })

  if (sort === 'price-asc') {
    visibleProducts.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    visibleProducts.sort((a, b) => b.price - a.price)
  } else if (sort === 'name-asc') {
    visibleProducts.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <section>
      <h1 className="page-title">Our Menu</h1>

      <ControlledFilters
        search={search}
        category={category}
        sort={sort}
        onlySale={onlySale}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onOnlySaleChange={setOnlySale}
        onReset={handleReset}
      />

      <p className="info">
        {visibleProducts.length > 0
          ? `Showing ${Math.min(visibleCount, visibleProducts.length)} of ${visibleProducts.length}`
          : 'Nothing found'}
      </p>

      <div className="menu__list">
        {visibleProducts.slice(0, visibleCount).map((product) => {
          return (
            <ProductCard
              key={product.id}
              info={product}
              onAddToCart={props.onAddToCart}
            />
          )
        })}
      </div>

      {visibleProducts.length > visibleCount && (
        <div className="menu__more">
          <Button text="Load More" onClick={handleLoadMore} />
        </div>
      )}

      <UncontrolledSubscribeForm />
    </section>
  )
}
