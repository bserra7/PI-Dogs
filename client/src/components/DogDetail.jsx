import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDetails, getDogDetail } from "../actions";
import Loader from './Loader';
import s from '../css/DogDetail.module.css';

const DogDetail = ({dogId}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogDetail(dogId))
        return () => {
            dispatch(clearDetails());
        }
    },[dispatch, dogId])

    const dog = useSelector((state) => state.dogDetail);

    return(
        <> 
        { Object.keys(dog).length ? 
        <div className={s.dogBox}>
            <div className={s.name}>
                Breed Name: {dog.name}
            </div>
            <div className={s.imageBox}><img className={s.image} src={dog.image} alt={dog.name}/></div>
            <div className={s.data}>
                <div className={s.temps}>Temperaments: {dog.temperaments?.map(temp => <span key={temp}>• {temp}</span> )}</div>
                <p>Height: {dog.height} cm</p>
                <p>Weight: {dog.weight} kg</p>
                <p>Life Expectation: {dog.life_span}</p>
            </div>
        </div>
        : <Loader/>}
        </>
    )
}

export default DogDetail;
        