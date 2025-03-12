import React from 'react'
import s from './Footer.module.scss'
import { GridContainer } from '../GridContainer/GridContainer'

export const Footer = () => {
  return (
    <footer className={s.footerStyle}>
    <GridContainer columns='1fr 1fr 1fr' gap='1rem'>
    <ul>
      <li>
        <h4>Nyhedsbrev</h4>
      </li>
      <li>
        Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og
        få de seneste klima opdateringer direkte i din indbakke
      </li>
      <li>
        <input type="text" />
      </li>
    </ul>
    <ul>
      <li>
        <h4>Kontakt</h4>
      </li>
      <li>Redningen 42</li>
      <li>2210 Vinterby Øster</li>
      <li>+45 99229422</li>
      <li>dga@info.dk</li>
    </ul>
    <ul>
      <li>
        <h4>FN's Verdensmål</h4>
      </li>
      <li>
        Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor
        besluttet at en del af overskuddet går direkte til verdensmål nr. 13;
        Klimahandling
      </li>
      <li className={s.footerLink}>
        <a href="https://www.verdensmaalene.dk/" target="_blank">
          Læs mere om verdensmålene her
        </a>
      </li>
    </ul>
    </GridContainer>
  </footer>
  )
}
