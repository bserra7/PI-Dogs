import { React, useState } from 'react';
import s from '../css/Pagination.module.css';

const Pagination = ({breedsPerPage, currentPage, totalBreeds, paginate}) => {
    const pageNumbers = [];
    const [prevTarget, setPrevTarget] = useState('');

    for (let i = 1; i <= Math.ceil(totalBreeds / breedsPerPage); i++) {
        pageNumbers.push(i);        
    }

    const handleClick = (event, number) => {
        if(prevTarget) prevTarget.className = `${s.pages}`;
        event.target.className = `${s.pages} ${s.active}`;
        setPrevTarget(event.target);
        paginate(number);
    }
    return(
        <nav className={s.container}>
            <div className={s.pagination}>
                {pageNumbers?.map(number => 
                    <button className={s.pages} id={number} onClick={e => handleClick(e, number)} key={number}>
                        {number}
                    </button>
                    )}
            </div>
        </nav>
    )
}

export default Pagination;