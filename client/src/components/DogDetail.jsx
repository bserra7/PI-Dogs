import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../actions";
import s from '../css/DogDetail.module.css';

const DogDetail = ({dogId}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDogDetail(dogId))
    },[dispatch, dogId])

    const dog = useSelector((state) => state.dogDetail);

    return(
        <> 
        {dog ? 
        <div className="dogBox">
            <div className="head">
                Breed Name: {dog.name}
            <img src={dog.image} alt={dog.name}/>
            </div>
            <div className="data">
                Temperaments: {dog.temperament}
                Height: {dog.height}
                Weight: {dog.weight}
                Life Expectation: {dog.life_span}
            </div>
        </div>
        : 'Loading...'}
        </>
    )
}

export default DogDetail;
        