import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
    // console.log("Delete Card Popup: ", props);    

    function submitHandler(e) {
        e.preventDefault();
        props.onUpdateDeleteCard(props.selectedCard)
    }
    return(
        <PopupWithForm 
            name='delete-card' 
            title='Are you Sure?' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Yes" 
            onSubmit={submitHandler}
        />
    )
}

export default DeleteCardPopup;