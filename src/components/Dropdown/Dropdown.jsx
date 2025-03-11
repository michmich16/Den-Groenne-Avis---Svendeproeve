import { useState, useEffect } from 'react';
import { useGet } from '../../hooks/useGet';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Dropdown.module.scss';

export const Dropdown = () => {
  const { isLoading, data, error } = useGet('http://localhost:4242/categories');
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // get nuværende route

  // resetter dropdown med at tjekker path på url
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory(""); // sætter dropdown tilbage til "Vælg Kategori"
    }
  }, [location.pathname]);

  const handleChange = (event) => {
    const slug = event.target.value;
    setSelectedCategory(slug);
    navigate(`/products/category/${slug}`);
  };

  return (
    <select
      name="kategori"
      value={selectedCategory}
      onChange={handleChange}
    >
      <option value="" disabled>
        Vælg Kategori
      </option>
      {data?.data?.map((category) => (
        <option key={category?.id} value={category?.slug}>
          {category?.name}
        </option>
      ))}
    </select>
  );
};
