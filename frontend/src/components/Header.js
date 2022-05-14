import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

    const handleLogOut = () => {
        props.logOut();
    }

    return(
        <header className="header">
            <img className='logo' src={logo} alt='Logo' />
            <div>
                <NavLink to='/' className='header__links'>
                    {props.loggedIn ? props.user : ''}
                </NavLink>
                {/* <NavLink to='/signin' className='header__links'> */}
                     {
                        props.loggedIn 
                        ? <NavLink to='/signin' onClick={handleLogOut} className='header__links'>Log out</NavLink>
                        : <NavLink to={props.url} className='header__links'>{props.buttonText}</NavLink>
                     }
                {/* </NavLink> */}
            </div>
            
            
        </header>
    )    
}

export default Header;