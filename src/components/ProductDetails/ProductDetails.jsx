import s from './ProductDetails.module.scss'

export const ProductDetails = ({ img, name, description, price }) => {
    return (
        <>
            <section className={s.productDetailsStyle}>
                <img src={img} alt={name} />
                <h3>{name}</h3>
                <p>{description}</p>
                <h4>Pris: {price} DKK</h4>
            </section>
        </>
    )
}