import s from './Comments.module.scss';

export const Comments = ({ name, text }) => {
  return (
    <>
      <div>
        <p>{name}</p>
        <span>
          <p>{text}</p>
        </span>
      </div>
    </>
  )
}
