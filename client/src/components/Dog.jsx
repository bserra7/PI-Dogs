import { React } from "react";
import styled from 'styled-components';
import s from '../css/Dog.module.css';

const Dog = ({name, image, temperaments, weight}) => {
    const DogBox = styled.div`
        width: 450px;
        min-width: 250px;
        height: 350px;
        border-radius: 10px;
        margin: 10px 20px;
        background-image: url(${image});
        background-repeat: no-repeat;
        background-size: 500px;
        background-position: center;
        color: #FFF;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        transition: ease-out 0.3s;
        box-shadow: 3px 3px 5px 1px #dddddd;
        &:hover{
        transform: scale(1.02);
        color: #0082D8;
        transition: ease-in 0.3s;
    `;
    return(
        <div className={s.theContainer}>
            <DogBox>
                <div className={s.title}>{name}</div> 
                <div className={s.container}>
                    <div className={s.data}>Temperaments: {temperaments?.map(temp => temp + ' | ')}</div>
                    <div className={s.data}>Weight: {weight} kg</div>
                </div>
            </DogBox>
        </div>
    )
}

export default Dog;
        