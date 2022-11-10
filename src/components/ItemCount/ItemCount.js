import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({stock = 0, initial = 1, onAdd }) => {

  const [quantity, setQuantity] = useState(initial)

  const increment = () => {
    if(quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return(
    <div>
      <div className='main-count'>
        <button className='less-button' onClick={decrement}>-</button>
        <p>{quantity}</p>
        <button className='more-button' onClick={increment}>+</button>
      </div>
      <div>
        { quantity > 0 
      ? <button className="addtocart-button" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
          : <p>TT</p>
          }
      </div>
    </div>
  )
}

export default ItemCount