import { React } from 'react';
import s from '../css/About.module.css';

const About = () => {
    return(
        <div className={s.container}>
            <p className={s.description}>Welcome to the dogs breeds App where you will be able to know in detail about all dog breeds and create a new one. 
                        This is a project for Henry Bootcamp and was possible thanks to thedogapi.com API</p>
        </div>        
    )
}

export default About;