import React from 'react'
import s from './ProductCards.module.scss'

export const ProductCards = ({ name, img }) => {
  return (
    <figure>
      <img src={img} alt="" />
      <figcaption>{name}</figcaption>
    </figure>
  )
}
