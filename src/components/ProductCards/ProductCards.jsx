import React from 'react'
import s from './ProductCards.module.scss'
import { NavLink } from 'react-router-dom'

export const ProductCards = ({ name, img, link }) => {
  return (
    <figure className={s.productCardStyle}>
      <NavLink to={link}>
        <img src={img} alt="" />
        <figcaption>{name}</figcaption>
      </NavLink>
    </figure>
  )
}
