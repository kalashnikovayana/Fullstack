import { Menu } from './components/Menu.jsx'
import { products } from './data/products.js'

function App() {
  return <Menu products={products} isLoading={false} />
}

export default App
