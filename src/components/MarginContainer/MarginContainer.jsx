import s from "./MarginContainer.module.scss";

export const MarginContainer = ({ children }) => {

    return(
        <div className={s.marginContainer}>
            {children}
        </div>
    );
}