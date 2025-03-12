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
                cols="30"
                rows="10"
                onChange={(event) => onInputChange(event)}
            ></textarea>
        </>
    )
}