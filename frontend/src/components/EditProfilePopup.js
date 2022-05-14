import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description , setDescription ] = useState('');

    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    function handleChangeNameInput(e) {
        // console.log(e.target.value);
        setName(e.target.value)
    }

    function handleChangeAboutInput(e) {
        // console.log(e.target.value);
        setDescription(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return(
        <PopupWithForm 
            name='edit-profile' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            title='Edit Profile' 
            buttonText="Save" 
            onSubmit={submitHandler}
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__input popup__input_content_name" 
                    id="input-name" 
                    name="name" 
                    placeholder="What is your name?" 
                    minLength="2" 
                    maxLength="40" 
                    value={name || ''}
                    onChange={handleChangeNameInput}
                    required 
                />
                <span className="input-name-error"></span>
            </label>
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__input popup__input_content_description" 
                    id="input-about" 
                    name="about" 
                    placeholder="Describe your role" 
                    minLength="2" 
                    maxLength="200" 
                    value={description || ''}
                    onChange={handleChangeAboutInput}
                    required 
                />
                <span className="input-about-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;