

const Button = ({onClick, value, className, label}) => {
    return(
        <button 
            onClick={onClick} 
            value={value} 
            className={className}
        >
            {label}
        </button>
    );
};

export default Button