import { useEffect, useRef, useState } from 'react';
import './Dropdown.style.css';

const Dropdown = ({
    placeholder,
    options,
    selected,
    setSelected,
}) => {

    /* ===== STATE ===== */
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    /* ===== FUNCTION ===== */
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionClick = (option) => {
        if (option === '없음') {
            setSelected(null);
        } else {
            setSelected(option);
        }
        setIsDropdownOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    /* ===== EFFECT ===== */
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mouseDown', handleOutsideClick);
        }
    }, []);


    /* ===== RENDER ===== */
    return (
        <div
            className='dropdown-container'
            ref={dropdownRef}
        >
            <div
                className={`dropdown-wrap ${selected ? 'selected' : ''}`}
                onClick={toggleDropdown}
            >
                {
                    selected ? (
                        <span className='selected'>{selected}</span>
                    ) : (
                        <span className='placeholder'>
                            {placeholder}
                        </span>
                    )
                }
                <div>
                    <button
                        className={`dropdown-button ${isDropdownOpen ? 'open' : 'close'}`}
                        onClick={toggleDropdown}
                    >⟩</button>
                </div>
            </div>
            {
                isDropdownOpen && (
                    <div className='dropdown-content'>
                        {
                            options.map((option, index) => (
                                <div
                                    key={index}
                                    className='dropdown-item'
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option}
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Dropdown