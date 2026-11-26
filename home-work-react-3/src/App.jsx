import { useState, useEffect } from 'react'
import { Header } from './components/Header.jsx'
import { Menu } from './components/Menu.jsx'
import { CartPage } from './components/CartPage.jsx'
import { Modal } from './components/Modal.jsx'
import { ControlledCheckoutForm } from './components/ControlledCheckoutForm.jsx'

const API_URL = '/products.json'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('coffee-cart') || '[]')
  )

  const [page, setPage] = useState('menu')

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Could not load the menu')
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem('coffee-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (!message) {
      return
    }

    const timerId = setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [message])

  const handleAddToCart = (product) => {
    const cartItem = cart.find((item) => item.id === product.id)

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      setCart(newCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const handleChangeQuantity = (id, step) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + step }
      }
      return item
    })
    setCart(newCart)
  }

  const handleRemove = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleCheckout = (customer) => {
    const order = {
      id: Date.now(),
      customer: customer,
      items: cart,
      total: cartTotal,
    }

    localStorage.setItem('lastOrder', JSON.stringify(order))
    setCart([])
    setIsCheckoutOpen(false)
    setMessage(`Order №${order.id} is saved. Thank you!`)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <>
      <Header
        page={page}
        cartCount={cartCount}
        onChangePage={setPage}
      />

      <main className="container">
        {page === 'menu' ? (
          <Menu
            products={products}
            isLoading={isLoading}
            error={error}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <CartPage
            cart={cart}
            total={cartTotal}
            onChangeQuantity={handleChangeQuantity}
            onRemove={handleRemove}
            onClear={handleClearCart}
            onCheckout={() => setIsCheckoutOpen(true)}
            onGoToMenu={() => setPage('menu')}
          />
        )}
      </main>

      {isCheckoutOpen && (
        <Modal onClose={() => setIsCheckoutOpen(false)}>
          <ControlledCheckoutForm
            total={cartTotal}
            onSubmit={handleCheckout}
            onCancel={() => setIsCheckoutOpen(false)}
          />
        </Modal>
      )}

      {message && <div className="toast">{message}</div>}
    </>
  )
}

export default App
