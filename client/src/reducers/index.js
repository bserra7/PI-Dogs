import { GET_BREEDS, GET_TEMPERAMENTS, GET_BREED_DETAIL, CREATE_DOG_BREED, GET_BREEDS_FILTERED, ORDER_BREEDS, ERROR_OCURRED, CLEAR_ERROR, CLEAR_FILTERS, CLEAR_DETAILS } from "../actions";
import { sortAsc, sortDesc } from "../utils";

const initialState = {
    dogBreeds: [],
    temperaments: [],
    dogsRaw: [],
    dogDetail: {},
    post: '',
    error: '',
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                dogBreeds: action.payload,
                dogsRaw: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case GET_BREEDS_FILTERED:
            return {
                ...state,
                dogBreeds: action.payload
            };
        case GET_BREED_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
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
        case CLEAR_FILTERS:
            return {
                ...state,
                dogBreeds: state.dogsRaw
            }
        case CLEAR_DETAILS:
            return {
                ...state,
                dogDetail: {}
            }
        case ORDER_BREEDS: {
            let ordered = [];
            let toOrder = state.dogBreeds;
            switch (action.payload) {
                case 'nameDesc': ordered = [...toOrder]?.sort((a, b) => sortDesc(a, b, 'name'));
                    break;
                case 'weightAsc': ordered = [...toOrder]?.sort((a, b) => sortAsc(a, b, 'weight'));
                    break;
                case 'weightDesc': ordered = [...toOrder]?.sort((a, b) => sortDesc(a, b, 'weight'));
                    break;
                case 'nameAsc':
                default: ordered = [...toOrder]?.sort((a, b) => sortAsc(a, b, 'name'));
                    break;
            }
            return {
                ...state,
                dogBreeds: ordered,
            }
        }
        default: return state;
    }
}

export default rootReducer;