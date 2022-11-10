import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import './ItemDetail.css'

//componente de visualización
const ItemDetail = ({id, name, price, img, description, stock }) => {

  // eslint-disable-next-line
  const { addItem, isInCart, getProductQuantity } = useContext(CartContext)
  const navigate = useNavigate()

  const handleOnAdd = (quantity) => { 

  const productToAdd = { 
    id, 
    name, 
    price, 
    quantity 
  }   
    addItem(productToAdd, quantity)
  }

  const quantityAdded = getProductQuantity(id)

  return (
    <div  className="itemdetail-container">
        <img src={img} alt={name} className="itemdetail-img" />
        <div className="content">
          <button className="volver-button" onClick={() => navigate(-1)}> Volver</button>
          <h3 className="itemdetail-title">{name}</h3>
          <p className="itemdetail-detail">{description}</p>
          <p className="itemdetail-price">${price}</p>

        <div>
          { stock !== 0 ? <ItemCount onAdd={handleOnAdd} stock={stock} initial={quantityAdded}/> : <p>No hay stock disponible</p>}
          {
            isInCart(id) && <Link className="end-button" to='/cart'>Finalizar compra</Link>
          }
         
          </div>
        </div>
    </div>
  )
}

export default ItemDetail