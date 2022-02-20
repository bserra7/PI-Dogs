import { React, Component } from "react";
import { connect } from "react-redux";
import { createDogBreed, getTemperaments } from "../actions";
import { validate } from "../utils";
import s from '../css/NewDog.module.css';
import Modal from "./Modal";

class NewDog extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputs: {
                name: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                min_life_span: '',
                max_life_span: '',
                image: '',
                temperaments: []
                },
            errors: {empty: true},         
            added: false,
            error: false               
        }; 
    };
    componentDidMount(){
        this.props.getTemperaments();
    }

    handleSetInputs = event => {
        this.setState({
        inputs: {
            ...this.state.inputs,
            [event.target.name]: event.target.value
        },
        errors: validate({
            ...this.state.inputs,
            [event.target.name]: event.target.value
        })
    });
    }

    handleSelects = event => {
        if(this.state.inputs.temperaments.includes(event.target.value)) return;
        this.setState({
            inputs: {
                ...this.state.inputs,
                temperaments: [...this.state.inputs.temperaments, event.target.value]
            },
            errors: validate({
                ...this.state.inputs,
                temperaments: [...this.state.inputs.temperaments, event.target.value]
            }) 
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(Object.keys(this.state.errors).length) return this.setState({...this.state, error: true});
        this.props.addDog(this.state.inputs);
        console.log(this.props.postResponse);
        this.setState({
            inputs: {
                name: '',
                min_height: '',
                max_height: '',
                min_weight: '',
                max_weight: '',
                min_life_span: '',
                max_life_span: '',
                image: '',
                temperaments: []
                },
            errors: {}, 
            added: true,
            error: false                   
        });
    }

    handleDelete = event => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                temperaments: this.state.inputs.temperaments?.filter(temp => temp !== event.target.id)
            }
        })
    }

    setAdded = value =>{
        this.setState({
            ...this.state,
            added: value
        });
        this.props.history.push('/home'); 
    }

    setError = value =>{
        this.setState({
            ...this.state,
            error: value
        })
    }


    render(){
        return(
        <div className={s.formWrapper}>
            <Modal show={this.state.added} setShow={this.setAdded} message={"Breed added correctly!"}/>
            <Modal show={this.state.error} setShow={this.setError} message={"Ups! Something went wrong... Please check the form and send it again!"}/>
            <div className={s.title}>Create a new Dog Breed!</div>
            <form className={s.forms} method="post" action='/dog' onSubmit={e => this.handleSubmit(e)}>
            <label className={s.labels} htmlFor='name'>Breed:</label>
            {this.state.errors.name && <span className={s.danger}>{this.state.errors.name}</span>}
            <input className={`${s.inputs} ${this.state.errors.name && s.error}`} value={this.state.inputs.name} onChange={e => this.handleSetInputs(e)} type="text" name="name" autoComplete='off'/>

            <div className={s.doubleInp}>
                {this.state.errors.height && <span className={s.danger}>{this.state.errors.height}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='height'>Height Range (cm):</label>
                    <input className={`${s.inputFrag} ${this.state.errors.height && s.error}`} value={this.state.inputs.min_height} onChange={e => this.handleSetInputs(e)} type="number" name="min_height" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.height && s.error}`} value={this.state.inputs.max_height} onChange={e => this.handleSetInputs(e)} type="number" name="max_height" placeholder="max" autoComplete='off'/>
                </div>
                {this.state.errors.weight && <span className={s.danger}>{this.state.errors.weight}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='weight'>Weight Range (kg):</label>
                    <input className={`${s.inputFrag} ${this.state.errors.weight && s.error}`} value={this.state.inputs.min_weight} onChange={e => this.handleSetInputs(e)} type="number" name="min_weight" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.weight && s.error}`} value={this.state.inputs.max_weight} onChange={e => this.handleSetInputs(e)} type="number" name="max_weight" placeholder="max" autoComplete='off'/>
                </div>
                {this.state.errors.life_span && <span className={s.danger}>{this.state.errors.life_span}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='life_span'>Life expectation (y):</label>
                    <input className={`${s.inputFrag} ${this.state.errors.life_span && s.error}`} value={this.state.inputs.min_life_span} onChange={e => this.handleSetInputs(e)} type="number" name="min_life_span" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.life_span && s.error}`} value={this.state.inputs.max_life_span} onChange={e => this.handleSetInputs(e)} type="number" name="max_life_span" placeholder="max" autoComplete='off'/>
                </div>
            </div>
            
            <label className={s.labels} htmlFor='image'>Image:</label>
            {this.state.errors.image && <span className={s.danger}>{this.state.errors.image}</span>}
            <input className={`${s.inputs} ${this.state.errors.image && s.error}`} value={this.state.inputs.image} onChange={e => this.handleSetInputs(e)} type="text" name="image" autoComplete='off'/>

            <label className={s.labels} htmlFor='temperaments'>Temperaments:</label>
            {this.state.errors.temperaments && <span className={s.danger}>{this.state.errors.temperaments}</span>}
            <select className={`${s.inputs} ${this.state.errors.temperaments && s.error}`} defaultValue='none' name="temperaments" onChange={e => this.handleSelects(e)} autoComplete='off'>
                <option value="none" disabled hidden>Choose one or more</option>
                {this.props.temperaments?.map(temp => <option key={temp.id} value={temp.name}>{temp.name}</option>)}
            </select>
            <div className={s.addedTemp}>{this.state.inputs.temperaments?.map(temp => <div key={temp} className={s.tempContainer}><div className={s.temperament}>{temp}</div><div className={s.deleteTemp} id={temp} onClick={e => this.handleDelete(e)}>x</div></div>)}</div>

            <input className={`${s.btn} `} type="submit" value="Save 🐶"/>
            </form>
         </div>
        )
    }
}

const mapStateToProps = state => ({
    temperaments: state.temperaments,
    postResponse: state.postResponse
})

const mapDispatchToProps = dispatch => ({
    addDog: (newDog) => dispatch(createDogBreed(newDog)),
    getTemperaments: () => dispatch(getTemperaments())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDog)