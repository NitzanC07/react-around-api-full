import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    // console.log("Add place popup: ", props);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        setName('');
        setUrl('');
    }, [props.isOpen])

    function handleChangeNameInput(e) {
        // console.log(e.target.value);
        setName(e.target.value);
    }

    function handleChangeUrlInput(e) {
        // console.log(e.target.value);
        setUrl(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        const data = {
            name: name,
            link: url,
        }
        props.onUpdateAddCard(data)
    }

    return(
        <PopupWithForm 
            name='add-card' 
            title='New Place' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Save" 
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__input popup__input_type_title" 
                    id="input-title" 
                    name="name" 
                    placeholder="Title" 
                    minLength="1" 
                    maxLength="30" 
                    value={name || ''}
                    onChange={handleChangeNameInput}
                    required 
                />
                <span className="input-title-error"></span>
            </label>
            <label className="popup__field">
                <input 
                    type="url" 
                    className="popup__input popup__input_type_image" 
                    id="input-image" 
                    name="link" 
                    placeholder="Image URL" 
                    value={url || ''}
                    onChange={handleChangeUrlInput}
                    required 
                />
                <span className="input-image-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;