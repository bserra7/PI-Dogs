import { React } from "react";
import { Link } from "react-router-dom";
import s from '../css/NavBar.module.css'
import Logo from '../assets/dogapp_logo.svg';

const NavBar = () => {
    return(
        <div className={s.navBar}>
            <div className={s.applogo}><Link to='/home'><img src={Logo} alt="dogBreedApp-Logo" /></Link></div>
            <ul className={s.menu}>
                <li><Link className={s.links} to='/home'>Home</Link></li>
                <li><Link className={s.links} to='/about'>About</Link></li>
                <li><Link to='/new-dog'><button className={s.button}>+ Create Dog</button></Link></li>
            </ul>
        </div>
    )
}

export default NavBar;
        