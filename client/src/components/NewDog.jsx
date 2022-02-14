import { React, Component } from "react";
import { connect } from "react-redux";
import { createDogBreed } from "../actions";
import s from '../css/NewDog.module.css';

export function validate(inputs){
    const errors = {}
    //const regexStr = /^([a-zA-Z]+)\w$/g;
    const regexStr = /^([^0-9]+)\w$/i;
    const regexUrl = /[a-zA-Z]+:\/\/([a-zA-Z]+(\.[a-zA-Z]+)+)/i;
    if(!inputs.name){
        errors.name = "Name is required";
    }
    else if (!regexStr.test(inputs.name)){
        errors.name = "Name is invalid";  
    }

    else if(!inputs.min_height || !inputs.max_height){
        errors.height = "Both (min and max) Height are required";
    }
    else if(Number(inputs.min_height) > Number(inputs.max_height)){
        errors.height = "Min Height can't be greater than Max Height";   
    }

    else if(!inputs.min_weight || !inputs.max_weight){
        errors.weight = "Both (min and max) Weight are required";
    }
    else if(Number(inputs.min_weight) > Number(inputs.max_weight)){
        errors.weight = "Min Weight can't be greater than Max Weight";   
    }

    else if(!inputs.min_life_span || !inputs.max_life_span){
        errors.life_span = "Both (min and max) Life Expectation are required";
    }
    else if(Number(inputs.min_life_span) > Number(inputs.max_life_span)){
        errors.life_span = "Min Life Span can't be greater than Max Life Span";   
    }
    

    else if(!inputs.image){
        errors.image = "Image URL is required";
    }
    else if(!regexUrl.test(inputs.image)){
        errors.image = "Image must be a valid URL";   
    }

    else if(!inputs.temperaments){
        errors.temperaments = "Temperaments is required";
    }
    
    return errors;
  }

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
                temperaments: ''
                },
            errors: {},                    
        }; 
    };

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
        if(Object.keys(this.state.errors).length) return alert('Ups! Algo ha salido mal... Revisa el formulario y vuelve a enviarlo!');
        this.props.addDog(this.state.inputs);
        alert('Raza creada correctamente!');
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
                temperaments: ''
                },
            errors: {},                    
        });
    }


    render(){
        let disabled;
        return(
        <div className={s.formWrapper}>
            <form className={s.forms} method="post" action='/dog' onSubmit={e => this.handleSubmit(e)}>
            <label className={s.labels} htmlFor='name'>Breed:</label>
            {this.state.errors.name && <span className={s.danger}>{this.state.errors.name}</span>}
            <input className={`${s.inputs} ${this.state.errors.name && s.error}`} value={this.state.inputs.name} onChange={e => this.handleSetInputs(e)} type="text" name="name" autoComplete='off'/>

            <div className={s.doubleInp}>
                {this.state.errors.height && <span className={s.danger}>{this.state.errors.height}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='height'>Height Range:</label>
                    <input className={`${s.inputFrag} ${this.state.errors.height && s.error}`} value={this.state.inputs.min_height} onChange={e => this.handleSetInputs(e)} type="number" name="min_height" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.height && s.error}`} value={this.state.inputs.max_height} onChange={e => this.handleSetInputs(e)} type="number" name="max_height" placeholder="max" autoComplete='off'/>
                </div>
                {this.state.errors.weight && <span className={s.danger}>{this.state.errors.weight}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='weight'>Weight Range:</label>
                    <input className={`${s.inputFrag} ${this.state.errors.weight && s.error}`} value={this.state.inputs.min_weight} onChange={e => this.handleSetInputs(e)} type="number" name="min_weight" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.weight && s.error}`} value={this.state.inputs.max_weight} onChange={e => this.handleSetInputs(e)} type="number" name="max_weight" placeholder="max" autoComplete='off'/>
                </div>
                {this.state.errors.life_span && <span className={s.danger}>{this.state.errors.life_span}</span>}
                <div className={s.inpPair}>
                    <label className={s.labels} htmlFor='life_span'>Life expectation:</label>
                    <input className={`${s.inputFrag} ${this.state.errors.life_span && s.error}`} value={this.state.inputs.min_life_span} onChange={e => this.handleSetInputs(e)} type="number" name="min_life_span" placeholder="min" autoComplete='off'/>
                    <input className={`${s.inputFrag} ${this.state.errors.life_span && s.error}`} value={this.state.inputs.max_life_span} onChange={e => this.handleSetInputs(e)} type="number" name="max_life_span" placeholder="max" autoComplete='off'/>
                </div>
            </div>
            
            <label className={s.labels} htmlFor='image'>Image:</label>
            {this.state.errors.image && <span className={s.danger}>{this.state.errors.image}</span>}
            <input className={`${s.inputs} ${this.state.errors.image && s.error}`} value={this.state.inputs.image} onChange={e => this.handleSetInputs(e)} type="text" name="image" autoComplete='off'/>

            <label className={s.labels} htmlFor='temperaments'>Temperaments:</label>
            {this.state.errors.temperaments && <span className={s.danger}>{this.state.errors.temperaments}</span>}
            <select className={`${s.inputs} ${this.state.errors.temperaments && s.error}`} name="temperaments" onChange={e => this.handleSelects(e)} autoComplete='off'>
                <option value="" selected disabled hidden>Choose one or more</option>
                {this.props.temperaments?.map(temp => <option key={temp.id} value={temp.id}>{temp.name}</option>)}
            </select>

            <input className={`${s.btn} `} type="submit" value="Save 🐶" disabled={Object.keys(this.state.errors).length ? true : false}/>
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
    addDog: (newDog) => dispatch(createDogBreed(newDog))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDog)