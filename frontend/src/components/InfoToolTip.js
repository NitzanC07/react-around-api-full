import Popup from "./Popup";

function InfoToolTip({isOpen, name, onClose, ...props}) {
    
    return(
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <div className='popup__container-info'>
                <img 
                    className="popup__info-icon" 
                    src={props.icon}
                    alt={props.text}
                />
                <p className="popup__info-text">{props.text}</p>
            </div>
        </Popup>        
    )
}

export default InfoToolTip;