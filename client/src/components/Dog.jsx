import { React } from "react";
import styled from 'styled-components';
import s from '../css/Dog.module.css';
import print from '../assets/print.png';

const Dog = ({id, name, image, temperaments, weight}) => {
    const DogBox = styled.div`
        width: 450px;
        min-width: 250px;
        height: 310px;
        border-radius: 10px;
        margin: 20px 12px;
        background-image: url(${image});
        background-repeat: no-repeat;
        background-size: 500px;
        background-position: center;
        color: #FFF;
        transition: ease-out 0.3s;
        /* box-shadow: 3px 3px 5px 1px #dddddd; */
        position: relative;
        &:hover{
        transform: scale(1.02);
        transition: ease-in 0.3s;
        }
    `;
    return(
        <div className={s.theContainer}>
            <DogBox>
                <div className={s.darker}>
                    {id.length === 10 && <div className={s.createdByUser}><img src={print} alt="Created by the User" /></div>}
                    <div className={s.title}>{name}</div> 
                    <div className={s.container}>
                        <div className={s.data}>Temperaments: {temperaments?.slice(0,6).map(temp => temp + ' | ')}</div>
                        <div className={s.data}>Weight: {weight} kg</div>
                    </div>
                </div>
            </DogBox>
        </div>
    )
}

export default Dog;
        