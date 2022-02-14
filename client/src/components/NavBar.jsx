import { React } from "react";
import { NavLink, Link } from "react-router-dom";
import s from '../css/NavBar.module.css'

const NavBar = () => {
    return(
        <div className={s.navBar}>
            <ul className={s.menu}>
                <li><NavLink className={s.links} to='/home'>HOME</NavLink></li>
                <li><NavLink className={s.links} to='/about'>ABOUT</NavLink></li>
                <li><button className={s.button}><Link className={s.nostyle} to='/new-dog'>CREATE DOG</Link></button></li>
            </ul>
        </div>
    )
}

export default NavBar;
        