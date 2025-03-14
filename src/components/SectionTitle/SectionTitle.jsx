import s from './SectionTitle.module.scss'

export const SectionTitle = ({title, text, textAlign = 'left' , padding, fontSize, color, fontWeight = '600'}) =>{
    return(
        <>
        <div className={s.sectionTitleStyle}  style={{ textAlign, padding, fontSize, color, }}>
            <h3  style={{fontSize, color, fontWeight  }}>
                {title}
            </h3>
            <p>{text}</p>
        </div>
        </>
    )
}