import React from 'react'
import s from './CategoryCards.module.scss'
import { NavLink } from 'react-router-dom'

export const CategoryCards = ({ name, img, link }) => {
  return (
    <figure className={s.categoryCardStyle} >
      <NavLink  to={link}>
      <figcaption>{name}</figcaption>
      <img src={img} alt="" />
      </NavLink>
    </figure>
  )
}