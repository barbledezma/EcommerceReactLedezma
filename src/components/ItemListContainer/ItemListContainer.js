import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import SkeletonItem from '../Skeleton/Skeleton';
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase';

import './ItemListContainer.css';

//CATEGORÍAS
const ItemListContainer = () => {
  //parte como un array vacio
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    const collectionRef = categoryId
    ? query(collection(db, 'products'), where('category', '==', categoryId))
    : collection(db, 'products')

    getDocs(collectionRef).then(response => {
      const productsAdapted = response.docs.map(doc => {
        const data = doc.data()
        return { id: doc.id, ...data }
      })
      setProducts(productsAdapted)
    }).catch(error => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
}, [categoryId])

  if(loading){
    return (
      <div className='skeleton'>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    )
  }

  return (
    <div className="itemlist-maincontainer">
      <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer;