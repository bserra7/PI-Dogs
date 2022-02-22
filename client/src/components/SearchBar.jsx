import { React, useEffect, useState } from "react";
import s from '../css/SearchBar.module.css';
import { useDispatch, useSelector } from "react-redux";
import { orderByName, orderByWeight, getBreedsFiltered, getTemperaments, clearFilters } from "../redux/actions";

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

    const [orderName, setOrderName] = useState('');
    const [orderWeight, setOrderWeight] = useState('');
    
    useEffect(()=>{
        dispatch(orderByName(orderName))
    },[orderName, dispatch]) 

    useEffect(()=>{
        dispatch(orderByWeight(orderWeight))
    },[orderWeight, dispatch]) 
    
    const handleOrderName = event => {
        setOrderName(state => (event.target.value));
        paginate(1);
    }

    const handleOrderWeight = event => {
        setOrderWeight(state => (event.target.value));
        paginate(1);
    }

    const resetFilters = () => {
        dispatch(clearFilters());
        setOrderName('');
        setOrderWeight('');
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
            <select className={s.inputsOrder} name="orderByName" defaultValue='none' onChange={e => handleOrderName(e)} id="orderByName">
                <option value="none" disabled hidden>Order by Name</option>                
                <option value='nameAsc'>Ascendent A to Z</option>
                <option value='nameDesc'>Descendent Z to A</option>
            </select>
            <select className={s.inputsOrder} name="orderByWeight" defaultValue='none' onChange={e => handleOrderWeight(e)} id="orderByWeight">
                <option value="none" disabled hidden>Order by Weight</option>
                <option value='weightAsc'>Lower to Higher</option>
                <option value='weightDesc'>Higher to Lower</option>
            </select>
            <input className={s.btn} type="reset" onClick={e => resetFilters()} value='Reset Filters'/>
            <input className={s.searchBtn} type="submit" value='Search'/>
        </form>
    </div>
    )
}




export default SearchBar;
        