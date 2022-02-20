import { React } from 'react';
import s from '../css/About.module.css';
import Banner from '../assets/about-dogs-breeds.jpg';

const About = () => {
    return(
        <div className={s.container}>
            <div className={s.banner}><img src={Banner} alt="About Dogs Breeds App" srcset="" /></div>
            <div className={s.description}>Welcome to the dogs breeds App where you will be able to know in detail about all dog breeds and create a new one. 
                        This is a project for Henry Bootcamp and was possible thanks to thedogapi.com API</div>
            <div className={s.description}>The App was created using the following tecnologies: - React - Redux - NodeJs - Sequelize - Postgres</div>
        </div>        
    )
}

export default About;