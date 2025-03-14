import s from './Splitter.module.scss';

export const Splitter = ({ marginTop = 0, marginBottom = 0, height= 4, width=100}) => {
    const style = {
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        height: `${height}px`,
        width:`${width}%`
    };

    return (
        <span className={s.splitterStyle} style={style}></span>
    );
};