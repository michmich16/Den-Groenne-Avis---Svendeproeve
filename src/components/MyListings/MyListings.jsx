import s from './MyListings.module.scss';
import { NavLink } from "react-router-dom"

export const MyListing = ({ name, price, description, img }) => {
    return (
        <>
            <section className={s.myListingStyle}>
                <div className={s.myListingContainer}>
                    <div className={s.myListingName}>
                        <div><h3>{name}</h3><h4>{price}</h4></div>
                        <div><p>{description}</p></div>
                    </div>
                    <div  className={s.myListingImg}>
                        <img src={img} alt="" />
                    </div>
                </div>
        
            </section>

        </>
    )
}