import s from "./GridContainer.module.scss";

export const GridContainer = ({
    children,
    columns = "1fr",
    mobileColumns = "1fr",
    tabletColumns = "1fr 1fr",
    gap = "8px",
    paddingTop,
    paddingBottom,
}) => {
    const inlinestyle = {
        "--columns": columns,
        "--mobile-columns": mobileColumns,
        "--tablet-columns": tabletColumns,
        gap: gap,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
    };

    return (
        <div className={`${s.grid}`} style={inlinestyle}>
            {children}
        </div>
    );
};
