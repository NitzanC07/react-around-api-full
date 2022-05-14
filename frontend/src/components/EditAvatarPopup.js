import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    // console.log("Edit Avatar Popup", props);

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setAvatar('');
    }, [props.isOpen])

    function handleChangeAvatarInput(e) {
        // console.log(e.target.value);
        setAvatar(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar,
        });
    }

    return(
        <PopupWithForm 
            name='avatar' 
            title='Change Profile Picture' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Save" 
            onSubmit={submitHandler}
        >
            <label className="popup__field">
                <input 
                    type="url" 
                    className="popup__input popup__input_type_avatar" 
                    id="input-avatar" 
                    name="avatar" 
                    placeholder="Input an image URL" 
                    value={avatar || ''}
                    onChange={handleChangeAvatarInput}
                    required 
                />
                <span className="input-avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;