import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import SubmitForm from "../Form/Form"
import { ordersFirestore } from "../../services/firestore/Orders.js"
import "./Checkout.css"

const Checkout = () => {

  //const [loading, setLoading] = useState(false)

  const { clear } = useContext(CartContext)

  const [personalData, setPersonalData] = useState(false)

  const [datos, setDatos] = useState({})

  const fullData = (name, phone, email, adress) => {
    setDatos({name, phone, email, adress})
    setPersonalData(true)
  }

  const navigate = useNavigate()

  const { createOrder} = ordersFirestore()

  const getOrder = () => {
    createOrder(datos).then(response => {
      if(response.result === 'orderCreated') {
        clear()
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    })
    } 

    return (
      <div className="checkout-main">
        <h2>Checkout</h2>
        <div className="checkout-campos">
          <p className="info">Ingresa tus datos correctamente para terminar tu compra.</p>
          <div className="submit">
            <SubmitForm fullData={fullData} />
            { personalData 
            ? <button className="getorder-button" onClick={getOrder}>Finalizar Compra</button>
            : ""
          }
            
          </div>
        </div>        
      </div>
    )

  } 

export default Checkout 