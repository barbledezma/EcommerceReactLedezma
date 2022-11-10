import React from "react";
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import SkeletonItem from "../Skeleton/Skeleton";
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase';

const ItemDetailContainer = ({ setCart }) => {
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(true)

  const { productId } = useParams()

  useEffect(() => {

    const docRef = doc(db, 'products', productId )
    getDoc(docRef).then(response => {
      const data = response.data()
      const productAdapted = { id: response.id, ...data }
      setProduct(productAdapted)
    }).finally(() => {
      setLoading(false)
    })
  }, [productId])

  if (loading) {
    return <SkeletonItem />
  }

  return (
    //tengo que recibir un objeto
    <div>
      <ItemDetail {...product}/>
    </div>
  )
}

export default ItemDetailContainer;