export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_BY_NAME = 'GET_BY_NAME';
export const CREATE_DOG_BREED = 'CREATE_DOG_BREED';

const url = 'http://localhost:3001';

export const getBreeds = () => {
    return function (dispatch) {
        return fetch(`${url}/dogs`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: GET_BREEDS, payload: data });
                });
    };
};

export const getTemperaments = () => {
    return function (dispatch) {
        return fetch(`${url}/temperament`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: GET_TEMPERAMENTS, payload: data });
                });
    };
};

export const getDogByName = (name) => {
    return function (dispatch) {
        return fetch(`${url}/dogs?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: GET_BY_NAME, payload: data });
                });
    };
};

export const getDogDetail = (payload) => {
    return {
        type: GET_DOG_DETAIL,
        payload
    }
};

export const createDogBreed = (payload) => {
    return function (dispatch) {
        return fetch(`${url}/dog`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(response => {
            dispatch({ type: CREATE_DOG_BREED, payload: response }
                )})
    }
}