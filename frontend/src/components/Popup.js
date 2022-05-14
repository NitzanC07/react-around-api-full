import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children }) => {

    useEffect(() => {
        if (!isOpen) return;

        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        
        const handleOverlay = (evt) => {
            if (evt.target.classList.contains('popup_open')) {
                onClose();
            }
        }

        document.addEventListener('mouseup', handleOverlay)
        return () => document.removeEventListener('mouseup', handleOverlay)
    }, [isOpen, onClose]);
  
    return (
        <div 
            className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}
            // onClick={() => handleOverlay()}
        >
        
            <div className={`popup__container${name === 'image' ? '-image' : ''}`}>
                
                { children }

                <button
                    className='popup__close-button popup__close-button_profile'
                    type='button'
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Popup;

