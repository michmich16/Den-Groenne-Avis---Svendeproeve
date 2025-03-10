import s from './Donation.module.scss';

export const Donation = ({ img, title, text, money, ending }) => {
    return (
        <figure className={s.donationStyle}>
            <img src={img} alt="" />
            <figcaption>
                <h2>{title}</h2>
                <p>{text}</p>
                <p className={s.moneyStyle}>{money}</p>
                <p className={s.endningStyle}>{ending}</p>
            </figcaption>
        </figure>
    )
}