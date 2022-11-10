//import { Formik, Form, Field, ErrorMessage } from 'formik'
import { createContext, useState } from 'react'
import "./Form.css"

export const CheckoutForm = createContext({
  name:"",
  email:"",
  phone:"",
  address:""
}) 


const SubmitForm = ({fullData}) => {
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");




const submit = (e) => {
  e.preventDefault ();

  fullData(
      name,
      phone,
      email,
      address
  )}


  return (
    <div>
      <form className="main-form">
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" pattern="[a-zA-Z ]{1,35}"   className="form-input"   placeholder="Nombre" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  className="form-input"   placeholder="Email" required/>
        <input value={phone}onChange={(e) => setPhone(e.target.value)} type="number" className="form-input"   placeholder="Teléfono"required />
        <input value={address}onChange={(e) => setAddress(e.target.value)}type="text"   className="form-input"   placeholder="Dirección"required />
      </form>

      <div>
        <button className="submit-button" onClick={submit}>Registrar Compra</button>
      </div>
    </div>
  )
}


export default SubmitForm