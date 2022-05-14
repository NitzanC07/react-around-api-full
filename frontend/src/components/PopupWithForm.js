import Popup from "./Popup";

function PopupWithForm({isOpen, name, onClose, ...props}) {

    return(
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <form 
                className="popup__form popup__form_profile" 
                name={props.name}
                onSubmit={props.onSubmit} 
            >
                <h2 
                    className="popup__header">
                    {props.title}
                </h2>
                {props.children}
                <button 
                    className="popup__submit-button popup__submit-button_card" 
                    type="submit">
                    {props.buttonText}
                </button>
            </form>
        </Popup>
    )
}

export default PopupWithForm;
