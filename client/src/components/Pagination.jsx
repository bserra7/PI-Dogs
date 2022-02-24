import { React, useState } from 'react';
import s from '../css/Pagination.module.css';

const Pagination = ({ breedsPerPage, currentPage, totalBreeds, paginate }) => {
    const pageNumbers = [];
    const [prevTarget, setPrevTarget] = useState('');
    const [lastPage, setLastPage] = useState();

    for (let i = 1; i <= Math.ceil(totalBreeds / breedsPerPage); i++) {
        pageNumbers.push(i);
    }

    if(prevTarget && currentPage === 1) prevTarget.className = `${s.pages}`;
    if(lastPage && currentPage === 1)  document.getElementById(lastPage)?.setAttribute('class', `${s.pages}`);
    
    const handleActive = (event, number) => {
        if (prevTarget) prevTarget.className = `${s.pages}`;
        document.getElementById(currentPage)?.setAttribute('class', `${s.pages}`);
        event.target.className = `${s.pages} ${s.active}`;
        setPrevTarget(event.target);
        if (number < 1) return;
        paginate(number);        
    }

    const handlePrevNextPage = (action) => {
        if ((currentPage <= 1 && action === 'prev') || (currentPage >= pageNumbers.length && action === 'next')) return;
        else if (action === 'prev'){
            document.getElementById(currentPage)?.setAttribute('class', `${s.pages}`);
            document.getElementById(currentPage - 1)?.setAttribute('class', `${s.pages} ${s.active}`);
            setLastPage(currentPage - 1);
            paginate(currentPage - 1);
        } 
        else if (action === 'next'){
            document.getElementById(currentPage)?.setAttribute('class', `${s.pages}`);
            document.getElementById(currentPage + 1)?.setAttribute('class', `${s.pages} ${s.active}`);
            setLastPage(currentPage + 1);
            paginate(currentPage + 1);
        } 
    }

    // Establezco el mismo largo de 5 numeros en el arreglo para no modificar el tamaño de la barra de paginación
    let shortPages = [];
    if (currentPage === 1) shortPages = pageNumbers.slice(currentPage - 1, currentPage + 4);
    else if (currentPage === 2) shortPages = pageNumbers.slice(currentPage - 2, currentPage + 3);
    else if (currentPage === pageNumbers.length - 1) shortPages = pageNumbers.slice(currentPage - 4, currentPage + 1);
    else if (currentPage === pageNumbers.length) shortPages = pageNumbers.slice(currentPage - 5, currentPage);
    else shortPages = pageNumbers.slice(currentPage - 3, currentPage + 2);

    return (
        <nav className={s.container}>
            <div className={s.pagination}>
                <button className={s.pages} onClick={e => handlePrevNextPage('prev')} key='prevPage'>
                    «
                </button>
                {shortPages?.map(number =>{
                    if(currentPage === 1 && number === 1) {
                         return <button className={`${s.pages} ${s.active}`} id={number} onClick={e => handleActive(e, number)} key={number}>
                            {number}
                        </button>
                    }
                    return <button className={s.pages} id={number} onClick={e => handleActive(e, number)} key={number}>
                        {number}
                    </button>
                })}
                <button className={s.pages} onClick={e => handlePrevNextPage('next')} key='nextPage'>
                    »
                </button>
            </div>
        </nav>
    )
}

export default Pagination;