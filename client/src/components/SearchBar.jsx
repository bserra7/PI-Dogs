import { React, useEffect } from "react";
import s from '../css/SearchBar.module.css';
import { connect } from "react-redux";
import { getTemperaments } from "../actions";

const SearchBar = ( props ) => {
    useEffect(()=>{
        props.getTemperaments();
    },[]);
    return(
        <div className={s.searchBar}>
        <form className={s.searchForm} >
            <input type="search" placeholder="Search by breed name" />
            <input type="submit" value='Search' />
            <select name="orderExistent" id="orderExistent">
                <option value=''>Order by...</option>
                <optgroup label='Existent Breed'>
                    <option value='apiBreed'>From API</option>
                    <option value='createdBreed'>Created Breed</option>
                </optgroup>
            </select>
            <select name="orderTemperaments" id="orderTemperaments">
                <option value=''>Order by...</option>
                <optgroup label='Temperaments'> 
                    {props.temperaments?.map(temp => <option key={temp.id} value={temp.id}>{temp.name}</option>)}
                </optgroup>
            </select>
            <select name="orderAscDesc" id="orderAscDesc">
                <option value=''>Order by...</option>
                <optgroup label='Breed Name'>                
                    <option value='nameAsc'>Ascendent A to Z</option>
                    <option value='nameDesc'>Descendent Z to A</option>
                </optgroup>
                <optgroup label='Weight'>
                    <option value='weigthAsc'>Lower to Higher</option>
                    <option value='weigthDesc'>Higher to Lower</option>
                </optgroup>
            </select>
        </form>
    </div>
    )
}

const mapStateToProps = state => ({
    temperaments: state.temperaments
});

const mapDispatchToProps = dispatch => ({
    getTemperaments: () => dispatch(getTemperaments())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
        