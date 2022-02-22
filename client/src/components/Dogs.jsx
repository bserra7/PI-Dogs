import { React, useEffect, useState } from "react";
import Dog from "./Dog";
import Pagination from './Pagination';
import { Link } from "react-router-dom";
import s from '../css/Dogs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getBreeds } from "../redux/actions";
import Loader from "./Loader";
import Modal from './Modal';
import SearchBar from "./SearchBar";

const Dogs = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const dogBreeds = useSelector(state => state.dogBreeds);
    const error = useSelector(state => state.error);
    useEffect(() => {
        dispatch(getBreeds());
    }, [dispatch])

    // Defino las razas a mostrar por Página
    const breedsPerPage = 8;
    const LastBreed = currentPage * breedsPerPage;
    const firstBreed = LastBreed - breedsPerPage;
    const breeds = dogBreeds.slice(firstBreed, LastBreed);

    //Cambio de Pagina
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const clearErrors = () => {
        dispatch(clearError());
    }

    return (
        <>
            <SearchBar paginate={paginate}/>
            {error && <Modal show={true} setShow={clearErrors} message={"The search doesn't found any results"} />}
            <div className={s.dogsContainer}>
                {dogBreeds.length ? breeds?.map(dog => <Link key={'l-' + dog.id} className={s.nostyle} to={`dog/${dog.id}`}>
                    <Dog key={dog.id} name={dog.name} temperaments={dog.temperaments} weight={dog.weight} image={dog.image} /></Link>)
                    : <Loader />}
            </div>
            <Pagination breedsPerPage={breedsPerPage} currentPage={currentPage} totalBreeds={dogBreeds.length} paginate={paginate} /></>
    )
}

export default Dogs;