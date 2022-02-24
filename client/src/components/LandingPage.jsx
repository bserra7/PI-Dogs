import { Component, React } from 'react';
import { Link } from 'react-router-dom';
import s from '../css/LandingPage.module.css';
import Logo from '../assets/dogapp_logo.svg';

export default class LandingPage extends Component{
    render(){
        return(
            <div className={s.back}>
                <div className={s.container}>
                    <div className={s.appName}><img className={s.appLogo} src={Logo} alt="app-logo"/></div>
                    <div className={s.startApp}><Link className={s.nostyle} to='/home'><button className={s.inButton}>START APP</button></Link></div>
                </div>
            </div>
        )
    }
}