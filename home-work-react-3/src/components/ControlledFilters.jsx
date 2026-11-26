import { Button } from './Button.jsx'
import './ControlledFilters.css'

export const ControlledFilters = (props) => {
  return (
    <form className="filters" onSubmit={(event) => event.preventDefault()}>
      <label className="filters__field">
        Search
        <input
          type="search"
          className="filters__input"
          placeholder="Coffee name"
          value={props.search}
          onChange={(event) => props.onSearchChange(event.target.value)}
        />
      </label>

      <label className="filters__field">
        Category
        <select
          className="filters__input"
          value={props.category}
          onChange={(event) => props.onCategoryChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="hot">Hot drinks</option>
          <option value="cold">Cold drinks</option>
          <option value="desserts">Desserts</option>
        </select>
      </label>

      <label className="filters__field">
        Sort
        <select
          className="filters__input"
          value={props.sort}
          onChange={(event) => props.onSortChange(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </label>

      <label className="filters__checkbox">
        <input
          type="checkbox"
          checked={props.onlySale}
          onChange={(event) => props.onOnlySaleChange(event.target.checked)}
        />
        Only sale
      </label>

      <Button text="Reset" onClick={props.onReset} />
    </form>
  )
}
