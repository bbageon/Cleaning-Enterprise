import './Textarea.css';

const Textarea = ({
    value,
    placeholder,
    readOnly,

    isCheckLength = true,
    maxLength,

    onChange,

    width,
    height,
}) => {

    return (
        <div className='textarea-container'>
            <textarea
                style={{
                    width: width,
                    height: height,
                }}
                value={value}
                placeholder={placeholder}
                readOnly={readOnly}
                onChange={onChange}
                maxLength={maxLength}
            />
            {
                isCheckLength ? (
                    <div className='end'>
                        <span className={`textarea-count ${value.length === maxLength ? 'max' : ''} large gray1`}>{value.length} / {maxLength}</span>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
};

export default Textarea;