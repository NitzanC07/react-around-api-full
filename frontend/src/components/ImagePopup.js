import Popup from "./Popup";

function ImagePopup({isOpen, name, onClose, ...props}) {

    return(
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <button 
                className="popup__close-button popup__close-button_image" 
                type="button" 
                onClick={props.onClose} 
            />
            <img 
                className="popup__image" 
                src={props.selectedCard.link}
                alt={props.selectedCard.name}
            />
            <div className="popup__image-description">{props.selectedCard.name}</div>
        </Popup>        
    )
}

export default ImagePopup;