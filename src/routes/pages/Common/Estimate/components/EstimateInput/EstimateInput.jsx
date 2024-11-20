import './EstimateInput.css';

const EstimateInput = ({
    label,

    id,
    placeholder,

    value,
    setValue,
    defaultValue,

    type,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='estimate-service-form'>
            <span className='small'>{label}</span>
            <input
                id={id}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={setValue}
                type={type}
            />
        </div>
    );
};

export default EstimateInput;