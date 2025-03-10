import React from 'react'
import s from './Banner.module.scss'

export const Banner = ({ img, title, text }) => {
  return (
    <figure className={s.bannerStyle}>
      <img src={img} alt="" />
      <figcaption>
        <h2>{title}</h2>
        <p>{text}</p>
      </figcaption>
    </figure>
  )
}
