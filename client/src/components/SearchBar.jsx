import { React, useEffect, useState } from "react";
import s from '../css/SearchBar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { orderBreeds, getBreedsFiltered, getTemperaments, clearFilters } from "../actions";

const SearchBar = ({paginate}) => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getTemperaments());
    }, []); // eslint-disable-line

    const temperaments = useSelector(state => state.temperaments);

    const [form, setForm] = useState({
        searchName: '',
        dataSource: 'allSources',
        temperaments: ''
    });

    const [order, setOrder] = useState('');
    
    useEffect(()=>{
        dispatch(orderBreeds(order))
    },[order, dispatch]) 
    
    const handleOrder = event => {
        setOrder(state => (event.target.value));
        paginate(1);
    }

    const resetFilters = () => {
        dispatch(clearFilters());
        setOrder('');
        setForm({
            searchName: '',
            dataSource: 'allSources',
            temperaments: ''
        })
        paginate(1);
    }

    const handleFilter = event => {
        setForm(state => ({
            ...state,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(getBreedsFiltered(form));
        paginate(1);
    }

    return(
        <div className={s.searchBar}>
        <form className={s.searchForm} onSubmit={e => handleSubmit(e)}>
            <input className={s.inputs} type="search" name="searchName" value={form.searchName} onChange={e => handleFilter(e)} placeholder="Search by breed name"/>
            <select className={s.inputs} name="dataSource" defaultValue='none' onChange={e => handleFilter(e)} id="dataSource">
                <option value="none" disabled hidden>Select Data Source</option>
                <option value='allSources'>All Sources</option>
                <optgroup label='Sources'>
                    <option value='apiOnly'>API Only</option>
                    <option value='createdBreed'>Created Breed</option>
                </optgroup>
            </select>
            <select className={s.inputs} name="temperaments" defaultValue='none' onChange={e => handleFilter(e)} id="temperaments">
                <option value="none" disabled hidden>Select Temperaments</option>
                <option value="">All Temperaments</option>
                <optgroup label='Temperaments'> 
                    {temperaments?.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
                </optgroup>
            </select>
            <select className={s.inputs} name="orderAscDesc" defaultValue='none' onChange={e => handleOrder(e)} id="orderAscDesc">
                <option value="none" disabled hidden>Order by Name or Weight</option>
                <optgroup label='Breed Name'>                
                    <option value='nameAsc'>Ascendent A to Z</option>
                    <option value='nameDesc'>Descendent Z to A</option>
                </optgroup>
                <optgroup label='Weight'>
                    <option value='weightAsc'>Lower to Higher</option>
                    <option value='weightDesc'>Higher to Lower</option>
                </optgroup>
            </select>
            <input className={s.btn} type="reset" onClick={e => resetFilters()} value='Reset Filters'/>
            <input className={s.searchBtn} type="submit" value='Search'/>
        </form>
    </div>
    )
}




export default SearchBar;
        