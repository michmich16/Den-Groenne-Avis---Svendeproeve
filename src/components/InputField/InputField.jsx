import style from './InputField.module.scss';

export const InputField = ({ type, placeholder, name, labelText, action, custom, id, img, width, height }) => {

  const onInputChange = (event) => {
    action(event.target.value);
  };

  return (
    <>
      {name && <label htmlFor={name}>{labelText}</label>}
      <div className={style.inputFieldStyle}>
        <input
          className={`${style.inputStyle} ${style[custom]}`}
          onChange={(event) => onInputChange(event)}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          style={{ width: width, height: height }} 
        />
        {img && <img src={img} alt="" />}
      </div>
    </>
  );
};
