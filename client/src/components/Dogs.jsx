import { React, Component } from "react";
import Dog from "./Dog";
import { Link } from "react-router-dom";
import s from '../css/Dogs.module.css';
import { connect } from 'react-redux';
import { getBreeds } from "../actions";

class Dogs extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        this.props.getBreeds();
    }

    render(){
        return(
            <div className={s.dogsContainer}>  
                {this.props.dogBreeds?.map(dog => <Link className={s.nostyle} to={`dog/${dog.id}`}><Dog key={dog.id} name={dog.name} temperaments={dog.temperaments} weight={dog.weight} image={dog.image}/></Link>)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dogBreeds: state.dogBreeds
});

const mapDispatchToProps = dispatch => ({
    getBreeds: () => dispatch(getBreeds())
})


export default connect(mapStateToProps, mapDispatchToProps)(Dogs);
        