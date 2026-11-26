import './Header.css'

export const Header = (props) => {
  return (
    <header className="header">
      <button
        type="button"
        className="header__logo"
        onClick={() => props.onChangePage('menu')}
      >
        Imaji <span>Coffee</span>
      </button>

      <nav className="header__nav">
        <button
          type="button"
          className={props.page === 'menu' ? 'header__link header__link--active' : 'header__link'}
          onClick={() => props.onChangePage('menu')}
        >
          Menu
        </button>

        <button
          type="button"
          className={props.page === 'cart' ? 'header__link header__link--active' : 'header__link'}
          onClick={() => props.onChangePage('cart')}
        >
          Cart ({props.cartCount})
        </button>
      </nav>
    </header>
  )
}
