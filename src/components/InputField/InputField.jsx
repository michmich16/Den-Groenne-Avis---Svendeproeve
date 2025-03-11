import style from './InputField.module.scss'


export const InputField = ({ type, placeholder, name, labelText, action, custom, id, img }) => {

  const onInputChange = (event) => {
    action(event.target.value);
  };

  return (
    <>
      {name && <label htmlFor={name}>{labelText}</label>}
      <div>
        <input
          className={`${style.inputStyle} ${style[custom]}`}
          onChange={(event) => onInputChange(event)}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
        />
        <img src={img} alt="" />
      </div>
    </>
  )
}