import { GET_BREEDS, GET_TEMPERAMENTS, GET_DOG_DETAIL, CREATE_DOG_BREED, GET_BREEDS_FILTERED, GET_BY_ID, ORDER_BREEDS, ERROR_OCURRED, CLEAR_ERROR, RESET_FILTERS } from "../actions";
import { sortAsc, sortDesc } from "../utils";

const initialState = {
    dogBreeds: [],
    temperaments: [],
    dogs: [],
    toFilter: [],
    dogDetail: {},
    post: '',
    error: '',
    alreadyFiltered: false
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_BREEDS:
            return {
                ...state,
                dogBreeds: action.payload,
                dogs: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case GET_BREEDS_FILTERED:
            return {
                ...state,
                dogBreeds: action.payload,
                toFilter: action.payload
            };
        case GET_BY_ID:
            return {
                ...state,
                dogBreeds: action.payload
            };
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: state.dogBreeds?.find(dog => dog.id.toString() === action.payload)
            };        
        case CREATE_DOG_BREED:
            return {
                ...state,
                post: action.payload
            };
        case ERROR_OCURRED:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: ''
            }
        case RESET_FILTERS:
            return {
                ...state,
                dogBreeds: state.dogs,
            }
        case ORDER_BREEDS:{
            let ordered = []; 
            let toOrder = state.dogBreeds;
            switch (action.payload.value){
                case 'nameDesc': ordered = [...toOrder]?.sort((a,b) => sortDesc(a, b, 'name')); 
                break;
                case 'weightAsc': ordered = [...toOrder]?.sort((a,b) => sortAsc(a, b, 'weight')); 
                break; 
                case 'weightDesc': ordered = [...toOrder]?.sort((a,b) => sortDesc(a, b, 'weight')); 
                break;
                case 'nameAsc':
                default: ordered = [...toOrder]?.sort((a,b) => sortAsc(a, b, 'name')); 
                break;
            }
            return{
                ...state,
                dogBreeds: ordered,
            }
        }
        default: return state;
    }
}

export default rootReducer;