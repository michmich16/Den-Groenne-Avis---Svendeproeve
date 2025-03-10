import s from './SectionTitle.module.scss'

export const SectionTitle = ({title, text, textAlign = 'left' , padding, fontSize}) =>{
    return(
        <>
        <div className={s.sectionTitleStyle}  style={{ textAlign, padding, fontSize }}>
            <h3>
                {title}
            </h3>
            <p>{text}</p>
        </div>
        </>
    )
}