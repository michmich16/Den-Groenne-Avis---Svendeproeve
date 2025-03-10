import s from "./GridContainer.module.scss";

export const GridContainer = ({ children, columns, sx, gap, paddingTop }) => {
    const inlinestyle = {
        gridTemplateColumns: `${columns}`,
        gap: gap,
        paddingTop: paddingTop,
    }

    return (
        <div className={`${s.grid}`} style={inlinestyle}>
            {children}
        </div>
    );
}