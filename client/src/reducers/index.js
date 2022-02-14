import { GET_BREEDS, GET_TEMPERAMENTS, GET_DOG_DETAIL, CREATE_DOG_BREED, GET_BY_NAME } from "../actions";

const initialState = {
    dogBreeds: [],
    temperaments: [],
    dogByName: {},
    dogDetail: {},
    postResponse: '',
}

export default (state = initialState, action) => {
    switch (action.type){
        case GET_BREEDS:
            return {
                ...state,
                dogBreeds: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload.sort((a, b) => {
                    var A = a.name.slice(0,3);
                    var B = b.name.slice(0,3);
                    if (A < B) return -1;
                    if (A > B) return 1;
                    return 0;
                    })
            };
        case GET_BY_NAME:
            return {
                ...state,
                dogByName: action.payload
            };
        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: state.dogBreeds?.find(dog => dog.id.toString() === action.payload)
            };        
        case CREATE_DOG_BREED:
            return {
                ...state,
                postResponse: action.payload
            };
        default: return state;
    }
}