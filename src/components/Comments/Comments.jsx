import s from './Comments.module.scss';

export const Comments = ({ name, text }) => {
  return (
    <>
      <div className={s.commentStyle}>
        <p>{name}</p>
        <span className={s.commentBox}>
          <p>{text}</p>
        </span>
      </div>
    </>
  )
}
