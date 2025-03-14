import s from './CommentInput.module.scss';

export const CommentInput = ({ name, placeholder, labelText, action, id }) => {
    const onInputChange = (event) => {
        action(event.target.value);
    };

    return (
        <>
            {name && <label htmlFor={name}>{labelText}</label>}
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={(event) => onInputChange(event)}
                className={s.commentInputStyle}
            ></textarea>
        </>
    )
}