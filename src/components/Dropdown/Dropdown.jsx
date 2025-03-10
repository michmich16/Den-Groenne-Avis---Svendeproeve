import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useGet } from '../../hooks/useGet';
import s from './Dropdown.module.scss';

export const Dropdown = ({ Navigate }) => {
  const { isLoading, data, error } = useGet('http://localhost:4242/categories');

  return (
    <select name="kategori">
      {data?.data?.map((item) => {
        return <option key={item?.id} value={item?.slug}>{item?.name}</option>
      })}
    </select>
  );
};
