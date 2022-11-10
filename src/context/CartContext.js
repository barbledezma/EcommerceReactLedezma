import { createContext, useState, useEffect } from "react"

export const CartContext = createContext({
  cart: [],
  totalQuantity: 0,
  }
)

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const totalQty = getQuantity()
    setTotalQuantity(totalQty)
   }, [cart]) //eslint-disable-line

  useEffect(() => {
    const total = getTotal()
    setTotal(total)
  }, [cart]) //eslint-disable-line


  const addItem = (productToAdd, quantity) => {
    if(!isInCart(productToAdd.id)) {
      productToAdd.quantity = quantity
        setCart([...cart, productToAdd])
    } else { //eslint-disable-next-line
        const CartUptaded = cart.map(prod => { 
          if(prod.id === productToAdd.id) {
            const productUptaded = {
              ...prod,
              quantity: quantity
            }
            return productUptaded
          } else {
            return prod
          }
        })
        setCart(CartUptaded)
    }
  }

  const isInCart = (id) => {
    return cart.some(prod => prod.id === id)
  }

  const removeItem = (id) => {
    const cartWithoutItem = cart.filter(prod => prod.id !== id)
    setCart(cartWithoutItem)
  }

  const getQuantity = () => {
    let accu = 0
    cart.forEach(prod => {
      accu += prod.quantity
    })
    return accu
  }

const getTotal = () => {
    let accu = 0
    cart.forEach(prod => {
      accu += prod.quantity * prod.price
    })

    return accu
}

  const clear = () => {
    setCart([])
  }

  const getProductQuantity = (id) => {
    const product = cart.find(prod => prod.id === id)
    return product?.quantity
  }

  return(
    <CartContext.Provider value={{ cart, addItem, removeItem, isInCart, total, totalQuantity, clear, getProductQuantity}}>
      {children}
    </CartContext.Provider>  
    )
}

export default CartProvider