import './Textarea.css';

const Textarea = ({
    value,
    placeholder,
    readOnly,

    isCheckLength = true,
    maxLength,
    fontSize,

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
                    fontSize: fontSize,
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
                        <span
                            className={`textarea-count ${value?.length === maxLength ? 'max' : ''} large gray1`}
                            style={{
                                fontSize: fontSize,
                            }}
                        >
                            {value?.length} / {maxLength}
                        </span>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    );
};

export default Textarea;