export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_BREED_DETAIL = 'GET_BREED_DETAIL';
export const GET_BREEDS_FILTERED = 'GET_BREEDS_FILTERED';
export const CREATE_DOG_BREED = 'CREATE_DOG_BREED';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const ERROR_OCURRED = 'ERROR_OCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.REACT_APP_API || 'http://localhost:3001';

export const getBreeds = () => {
    return function (dispatch) {
        return fetch(`${url}/dogs`)
            .then(response => {
                if (!response.ok) throw Error(response.status)
                return response.json()
            })
            .then(data => {
                dispatch({ type: GET_BREEDS, payload: data });
            })
            .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString() }));
    };
};

export const getTemperaments = () => {
    return async function (dispatch) {
        try {
            const temperaments = await fetch(`${url}/temperament`)
                .then(response => {
                    if (!response.ok) throw Error(response.status);
                    return response.json()
                })
            return dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
        } catch (error) {
            dispatch({ type: ERROR_OCURRED, payload: error.toString() })
        };
    };
};

export const getBreedsFiltered = (form) => {
    return async function (dispatch) {
        try {
            const response = await fetch(`${url}/dogs?name=${form.searchName}&source=${form.dataSource}&temp=${form.temperaments}`)
            if (!response.ok) throw Error(response.status);
            const filtered = await response.json();
            return dispatch({ type: GET_BREEDS_FILTERED, payload: filtered });
        } catch (error) {
            dispatch({ type: ERROR_OCURRED, payload: error.toString() });
        }
    };
};

export const getDogDetail = (id) => {
    return function (dispatch) {
        return fetch(`${url}/dogs/${id}`)
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response.json()
            })
            .then(data => {
                dispatch({ type: GET_BREED_DETAIL, payload: data[0] });
            })
            .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString() }));
    };
};

export const createDogBreed = (payload) => {
    return function (dispatch) {
        return fetch(`${url}/dog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(response => {
            dispatch({ type: CREATE_DOG_BREED, payload: response.status })
        })
            .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString() }));
    };
};

export const orderBreeds = (payload) => {
    return {
        type: ORDER_BREEDS,
        payload
    }
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const clearFilters = () => {
    return {
        type: CLEAR_FILTERS
    }
}

export const clearDetails = () => {
    return {
        type: CLEAR_DETAILS
    }
}
