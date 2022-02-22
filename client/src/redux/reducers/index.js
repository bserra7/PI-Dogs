import { GET_BREEDS, GET_TEMPERAMENTS, GET_BREED_DETAIL, CREATE_DOG_BREED, GET_BREEDS_FILTERED, ERROR_OCURRED,
         CLEAR_ERROR, CLEAR_FILTERS, CLEAR_DETAILS, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "../actions";
import { sortAsc, sortDesc } from "../../utils";

const initialState = {
    dogBreeds: [],
    temperaments: [],
    dogsRaw: [],
    dogDetail: {},
    postStatus: '',
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
                postStatus: action.payload
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
        case ORDER_BY_NAME: {
            let orderName = [];
            let toOrder = state.dogBreeds;
            if (action.payload === 'nameAsc') orderName = [...toOrder]?.sort((a, b) => sortAsc(a, b, 'name'));
            else if (action.payload === 'nameDesc') orderName = [...toOrder]?.sort((a, b) => sortDesc(a, b, 'name'));
            else orderName = [...toOrder]
            return {
                ...state,
                dogBreeds: orderName,
            }
        }
        case ORDER_BY_WEIGHT: {
            let orderWeight = [];
            let toOrder = state.dogBreeds;
            if (action.payload === 'weightAsc') orderWeight = [...toOrder]?.sort((a, b) => sortAsc(a, b, 'weight'));
            else if (action.payload === 'weightDesc') orderWeight = [...toOrder]?.sort((a, b) => sortDesc(a, b, 'weight'));
            else orderWeight = [...toOrder]
            return {
                ...state,
                dogBreeds: orderWeight,
            }
        }
        default: return state;
    }
}

export default rootReducer;