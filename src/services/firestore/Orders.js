import { CartContext } from "../../context/CartContext"
import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from "firebase/firestore"
import { db } from "../../services/firebase/index"
import { useContext } from 'react'

export const ordersFirestore = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { cart, total } = useContext(CartContext)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const createOrder = async (datos) => {
    try {
      const objOrder = {
        buyer: datos,
        items: cart,
        total
      }

      const batch = writeBatch(db)

      const outStock = []

      const ids = cart.map(prod => prod.id)
      const productsRef = collection(db, 'products')

      const productsAddedFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
      const { docs } = productsAddedFirestore

      docs.forEach(doc => {
        const dataDoc = doc.data()
        const stockDb = dataDoc.stock

        const productAddedToCart = cart.find(prod => prod.id === doc.id)
        const prodQuantity = productAddedToCart?.quantity 

        if (stockDb >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuantity})
        } else {
          outStock.push({ id: doc.id, ...dataDoc})
        }
      })

      if(outStock.length === 0) {
      
        const orderRef = collection(db, 'orders')
        const orderAdded = await addDoc(orderRef, objOrder)

        await batch.commit()
        return { result: 'orderCreated', id: orderAdded.id }
      } else {
          return { result: 'outStock', products: outStock }
      } 
    } catch(error) {
      console.log(error)
  } 
}

  return {
    createOrder,
  }
  
}
