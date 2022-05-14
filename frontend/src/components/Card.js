import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    // console.log("Card props", props);

    const currentUser = useContext(CurrentUserContext);
    const isOwner = currentUser._id === props.card.owner._id;
    const isLiked = props.card.likes.some(user => currentUser._id === user._id)

    function handleLikeClick() {
        props.onCardLike(props.Card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id)
    }
    
    return(
        <li className="cards__card">
            <img 
                className="cards__image" 
                onClick={() => props.onCardClick({name: props.name, link: props.link})}
                src={props.link} 
                alt={props.name} 
            />
            <button 
                className={`cards__delete-button${isOwner ? '' : '_invisible'}`} 
                type="button" onClick={handleDeleteClick}
            />
            <div className="cards__group">
                <h2 className="cards__header">{props.name}</h2>
                <div className="cards__likes">
                    <button 
                        className={`cards__like-button ${isLiked ? 'cards__like-button_active' : '' }`} 
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <span className="cards__likes-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;