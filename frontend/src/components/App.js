import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Register from './Register';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import api from '../utils/api.js';
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip.js';
import iconSuccess from '../images/tool-tip-success.svg';
import iconFailed from '../images/tool-tip-failed.svg';
import * as auth from '../utils/auth';

function App() {

    const history = useHistory();
    const [currentUser , setCurrentUser ] = useState({});
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);

    function handleLoginSubmit(email, password) {
        auth.login(email, password)
        .then((res) => {
            if(res.token) {
                localStorage.setItem("jwt", res.token);
                setCurrentUser(currentUser);
                setLoggedIn(true);
                setInfoToolTipSuccess(true);
                history.push('/');
                console.log(`User logged in: ${localStorage}`);
            }
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
            setInfoToolTipFaild(true);
        });
    }
    
    function handleRegisterSubmit({email, password}) {
        auth.register({email, password})
        .then((res) => {
            setInfoToolTipSuccess(true);
            history.push('/signin');
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
            setInfoToolTipFaild(true);
        });
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        console.log(`User logged out: ${localStorage}`);
        setLoggedIn(false);
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(jwt) {
            auth.getContent(jwt)
            .then((data) => {
                if(data) {
                    setLoggedIn(true);
                    setUserData(JSON.stringify(data));
                    history.push('/')
                }
            }, )
            .catch((err) => {
                console.log(`Something went wrong in getContent function: ${err}`);
                setInfoToolTipFaild(true);
            })
        }
    }, [isLoggedIn]);

    const userEmail = userData ? JSON.parse(userData).data.email : '';

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
            setCurrentUser(userData);
            setCards(cardsData);
        })
        .catch(err => {
            console.log("Error - there is any communication with the server: ", err);
        });
    }, []);
 
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => 
                state.map((c) => c._id === card._id ? newCard : c ));
        })
        .catch((err) => {
            console.log("Error - there is any communication with the server: ", err);
        })
    }
  
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
    const [isInfoToolTipSuccess, setInfoToolTipSuccess] = useState(false);
    const [isInfoToolTipFaild, setInfoToolTipFaild] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
        
    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setDeleteCardPopupOpen(false);
        setInfoToolTipSuccess(false);
        setInfoToolTipFaild(false);
    }
    
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleInfoToolTipSuccess() {
        setInfoToolTipSuccess(true);
    }

    function handleInfoToolTipFaild() {
        setInfoToolTipFaild(true);
    }

    function handleImageClick(card) {
        setSelectedCard(card)
        setImagePopupOpen(true);
    }

    function handleDeleteCardClick(card) {
        setSelectedCard(card);
        setDeleteCardPopupOpen(true);
    }

    function handleCardDelete(card) {
        setSelectedCard(card)
        const cardId = card._id
        api.deleteCard(cardId)
        .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== cardId))
            closeAllPopups();
        })
        .catch((err) => {
            console.log("Error - there is any communication with the server: ", err);
        })
    }

    function handlerUpdateUser(data) {
        api.setUserInfo(data)
            .then(() => {
                // console.log("User data updated: ", data);
                setCurrentUser({
                    name: data.name, 
                    about: data.about, 
                    avatar: currentUser.avatar,
                    _id: currentUser._id,
                    cohort: currentUser.cohort
                })
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    function handlerUpdateAddCard(newCard) {
        api.createCard(newCard)
            .then((card) => {
                // console.log("Card was added.", card);
                setCards([card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(() => {
                // console.log("Avatar was updated: ", data);
                setCurrentUser({
                    name: currentUser.name, 
                    about: currentUser.about, 
                    avatar: data.avatar,
                    _id: currentUser._id,
                    cohort: currentUser.cohort
                })
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Error - there is any communication with the server: ", err);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Switch>
                        <ProtectedRoute 
                            exact path='/' 
                            loggedIn={isLoggedIn}
                        >
                            <Header 
                                loggedIn={isLoggedIn} 
                                user={userEmail}
                                logOut={handleSignOut}
                                buttonText='Log out'
                                url='/signin'
                            />
                            <Main 
                                onEditProfileClick={handleEditProfileClick}
                                onAddPlaceClick={handleAddPlaceClick}
                                onEditAvatarClick={handleEditAvatarClick}
                                onCardClick={handleImageClick}
                                isEditProfilePopupOpen={isEditProfilePopupOpen}
                                isAddPlacePopupOpen={isAddPlacePopupOpen}
                                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                                isImagePopupOpen={isImagePopupOpen}
                                cards={cards}
                                onCardDelete={handleDeleteCardClick}
                                onCardlikeClick={handleCardLike}
                            />

                            <Footer />

                            <EditProfilePopup
                                isOpen={isEditProfilePopupOpen}
                                onClose={closeAllPopups}
                                onUpdateUser={handlerUpdateUser}
                            />

                            <AddPlacePopup 
                                isOpen={isAddPlacePopupOpen}
                                onClose={closeAllPopups}
                                onUpdateAddCard={handlerUpdateAddCard}
                                cards={cards}
                            />

                            <EditAvatarPopup 
                                isOpen={isEditAvatarPopupOpen} 
                                onClose={closeAllPopups} 
                                onUpdateAvatar={handleUpdateAvatar}
                            />

                            <DeleteCardPopup 
                                isOpen={isDeleteCardPopupOpen}
                                onClose={closeAllPopups}
                                onUpdateDeleteCard={handleCardDelete}
                                selectedCard={selectedCard}
                            />
                        </ProtectedRoute>

                        <Route path='/signup'>
                            <Header 
                                loggedIn={isLoggedIn}
                                logOut={handleSignOut}
                                user={userEmail}
                                buttonText='Log in'
                                url='/signin'
                            />
                            <Register 
                                title="Sign up"
                                link="Log in" 
                                loggedIn={isLoggedIn}
                                onSubmit={handleRegisterSubmit}
                                infoPopup={setInfoToolTipFaild}
                            />
                        </Route>
                        <Route path='/signin'>
                            <Header 
                                loggedIn={isLoggedIn}
                                logOut={handleSignOut}
                                user={userEmail}
                                buttonText='Sign up'
                                url='/signup'
                            />
                            <Login 
                                title="Log in"
                                link='Sign up'
                                loggedIn={setLoggedIn}
                                onSubmit={handleLoginSubmit}
                                infoPopup={setInfoToolTipFaild}
                            />
                        </Route>
                    </Switch>
                                        
                    <ImagePopup 
                        className="popup popup_type_image" 
                        isOpen={isImagePopupOpen ? 'popup_open' : ''} 
                        name='image'
                        onClose={closeAllPopups}
                        selectedCard={selectedCard}
                    />

                    <InfoToolTip
                        name="info-success"
                        isOpen={isInfoToolTipSuccess ? 'popup_open' : ''}
                        onClose={closeAllPopups}
                        text='Success! You have now been registered.'
                        icon={iconSuccess}
                    />

                    <InfoToolTip
                        name="info-faild"
                        isOpen={isInfoToolTipFaild ? 'popup_open' : ''}
                        onClose={closeAllPopups}
                        text='Oops, something went wrong! Please try again.'
                        icon={iconFailed}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;