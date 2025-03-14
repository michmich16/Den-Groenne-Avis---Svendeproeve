import React from 'react'
import s from './NavBar.module.scss'
import { Dropdown } from '../DropDown/DropDown'
import { useNavigate } from 'react-router-dom'


export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <Dropdown />
      <button onClick={() => navigate(`/ny-annoncer`)}>opret annonce</button>
      <span>
        <img src="/icons/mailIcon.png" alt="" />
        <img src="/icons/infoIcon.png" alt="" />
        <img src="/icons/accountIcon.png" alt="" onClick={() => navigate(`/login`)} />
      </span>
    </nav>
  )
}
