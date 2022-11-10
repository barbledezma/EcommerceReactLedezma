import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import "./Cart.css"
import Delete from '@mui/icons-material/DeleteOutlined'

const Cart = () => {
  const { cart, removeItem, total, clear } = useContext(CartContext)

  return(
    <div>
      <h2>Tu orden</h2>
    {  
        cart.map(prod => (
            <div className="main-cart">
              <div className="product-detail">
                <img className="img-detail-cart" scr={prod.img} alt=""></img>
                  <div className="detail">
                    <p>Título</p>
                    <h4>{prod.name}</h4>
                  </div>
                  <div className="detail">
                    <p>Cantidad</p>
                    <h4>{prod.quantity}</h4>
                  </div>
                  <div>
                    <button className="eliminar-button" onClick={() => removeItem(prod.id)}><Delete /></button>
                  </div>
              </div> 
          </div>
        ))
    }

      <div className="main-total">
        <div>
          <p>Total</p>
          <h3>{total}</h3>
        </div>
        <div className="checkout-main">
          <button><Link className="checkout-button" to='/checkout'>Checkout</Link></button> 
          <button className="clear-cart" onClick={() => clear()}>Limpiar carrito</button> 
        </div>
      </div>
    </div>
  )
}


export default Cart