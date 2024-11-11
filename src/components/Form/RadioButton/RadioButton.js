import formatPrice from '../../../utils/priceUtils';
import './RadioButton.css';

const RadioButton = ({
    options,

    setPrice,
    selected,
    setSelected,

    buttonWidth,
    buttonHeight,
}) => {

    /* ===== FUNCTION ===== */
    const handleChange = (e) => {
        const selectedOption = options.find(option => option.id === e.target.value);
        setSelected(e.target.value);

        if (options.price) {
            setPrice(selectedOption.price);
        } else {
            return;
        }
    };

    /* ===== RENDER ===== */
    return (
        <>
            {
                options.map((option, index) => {
                    return (
                        <div
                            className='radio-button-container'
                            style={{
                                width: options.price ? '' : 'auto',
                            }}
                            key={index}
                        >
                            <div
                                className='radio-button-left'
                                
                            >
                                <label>
                                    <input
                                        style={{
                                            width: buttonWidth,
                                            height: buttonHeight,
                                        }}
                                        id={option.id}
                                        value={option.id}
                                        type='radio'
                                        checked={selected === option.id}
                                        onChange={handleChange}
                                    />
                                    <span
                                        className={options.price ? 'medium bold' : 'small bold'}
                                    >{option.name}</span>
                                </label>
                            </div>
                            {
                                options.price ? (
                                    <div className='radio-button-right'>
                                        <span className='bold'>
                                            + {option.price && formatPrice(option?.price)} 원
                                        </span>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    );
};

export default RadioButton;