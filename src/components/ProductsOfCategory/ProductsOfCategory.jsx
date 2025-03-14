import s from './ProductsOfCategory.module.scss'
import { NavLink } from 'react-router-dom'

export const ProductsOfCategory = ({ price, name, description, img, link }) => {
    return (
        <>
            <figure className={s.productsOfCategoryStyle}>
                <NavLink to={link}>
                    <img src={img} alt={name} />
                    <figcaption><p>{price} DKK</p></figcaption>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </NavLink>
            </figure>
        </>
    )
}