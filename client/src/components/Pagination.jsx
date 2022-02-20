import { React, useState } from 'react';
import s from '../css/Pagination.module.css';

const Pagination = ({ breedsPerPage, currentPage, totalBreeds, paginate }) => {
    const pageNumbers = [];
    const [prevTarget, setPrevTarget] = useState('');

    for (let i = 1; i <= Math.ceil(totalBreeds / breedsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleActive = (event, number) => {
        if (prevTarget) prevTarget.className = `${s.pages}`;
        event.target.className = `${s.pages} ${s.active}`;
        setPrevTarget(event.target);
        if (number < 1) return;
        paginate(number);
    }

    const handlePrevNextPage = (action) => {
        if ((currentPage <= 1 && action === 'prev') || (currentPage >= 23 && action === 'next')) return;
        else if (action === 'prev') paginate(currentPage - 1);
        else if (action === 'next') paginate(currentPage + 1);
    }

    let shortPages = [];
    if (currentPage === 1) shortPages = pageNumbers.slice(currentPage - 1, currentPage + 4);
    else if (currentPage === 2) shortPages = pageNumbers.slice(currentPage - 2, currentPage + 3);
    else shortPages = pageNumbers.slice(currentPage - 3, currentPage + 2);

    return (
        <nav className={s.container}>
            <div className={s.pagination}>
                <button className={s.pages} onClick={e => handlePrevNextPage('prev')} key='prevPage'>
                    «
                </button>
                {shortPages?.map(number =>
                    <button className={s.pages} id={number} onClick={e => handleActive(e, number)} key={number}>
                        {number}
                    </button>)}
                <button className={s.pages} onClick={e => handlePrevNextPage('next')} key='nextPage'>
                    »
                </button>
            </div>
        </nav>
    )
}

export default Pagination;