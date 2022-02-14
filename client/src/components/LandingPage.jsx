import { Component, React } from 'react';
import { Link } from 'react-router-dom';
import s from '../css/LandingPage.module.css';

export default class LandingPage extends Component{
    render(){
        return(
            <div className={s.back}>
                <div className={s.container}>
                <h1 className={s.appName}>Dog Breeds APP</h1>
                    <p className={s.description}>Welcome to the dogs breeds App where you will be able to know in detail about all dog breeds and create a new one. 
                        This is a project for Henry Academy and was possible thanks to thedogapi.com API</p>
                    <Link className={s.nostyle} to='/home'><button className={s.inButton}>START APP</button></Link>
                </div>
            </div>
        )
    }
}