import React from 'react'
import s from './CategoryCards.module.scss'

export const CategoryCards = ({ name, img }) => {
  return (
    <figure className={s.categoryCardStyle}>
      <figcaption>{name}</figcaption>
      <img src={img} alt="" />
    </figure>
  )
}