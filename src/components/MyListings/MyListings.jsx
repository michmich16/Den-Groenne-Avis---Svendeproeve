import s from './MyListings.module.scss';
import { NavLink } from "react-router-dom"

export const MyListing = ({ name, price, description, img }) => {
    return (
        <>
            <section className={s.myListingStyle}>
                <div className={s.myListingContainer}>
                    <div className={s.myListingName}>
                        <div className={s.greenName}><h3>{name}</h3><h3 className={s.priceStyle}>Pris: {price} DKK</h3></div>
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