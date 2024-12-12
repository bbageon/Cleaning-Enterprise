import './Title.style.css';

const Title = ({
    children,
    style = {},
    size = 24,
    weight = 700,
    marginBottom = 20,
    maxLine = 1,
    color,
    className,
    onClick,
    ...props
}) => {

    /* ===== RENDER ===== */
    return (
        <p
            className={`text-comp ${className}`}
            style={{
                fontSize: size,
                fontWeight: weight,
                marginBottom: marginBottom,
                WebkitLineClamp: maxLine,
                color: color,
                cursor: onClick ? 'pointer' : 'default',
                ...style,
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </p>
    );
};

export default Title;