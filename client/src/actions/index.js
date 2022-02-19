export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_BREEDS_FILTERED = 'GET_BREEDS_FILTERED';
export const GET_BY_ID = 'GET_BY_ID';
export const CREATE_DOG_BREED = 'CREATE_DOG_BREED';
export const ORDER_BREEDS = 'ORDER_BREEDS';
export const ERROR_OCURRED = 'ERROR_OCURRED';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const RESET_FILTERS = 'RESET_FILTERS';

const url = 'http://localhost:3001';

export const getBreeds = () => {
    return function (dispatch) {
        return fetch(`${url}/dogs`)
                .then(response => {
                    if(!response.ok) throw Error(response.status)
                    return response.json()})
                .then(data => {
                    dispatch({ type: GET_BREEDS, payload: data });
                })
                .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString()}));
    };
};

export const getTemperaments = () => {
    return function (dispatch) {
        return fetch(`${url}/temperament`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: GET_TEMPERAMENTS, payload: data });
                })
                .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString()}));
    };
};

/* export const getDogByName = (form) => {
    return function (dispatch) {
        return fetch(`${url}/dogs?name=${form.searchName}&source=${form.dataSource}&temp=${form.orderTemperaments}`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: GET_BY_NAME, payload: data });
                })
                .catch(error => dispatch({ type: ERROR_OCURRED, payload: error }));
    };
}; */

export const getBreedsFiltered = (form) => {
    return function (dispatch) {
        return fetch(`${url}/dogs?name=${form.searchName}&source=${form.dataSource}&temp=${form.temperaments}`)
                .then(response => {
                    if(!response.ok) throw Error(response.status);
                    return response.json()})
                .then(data => {
                    dispatch({ type: GET_BREEDS_FILTERED, payload: data });
                })
                .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString()}));
    };
};

export const getDogById = (id) => {
    return function (dispatch) {
        return fetch(`${url}/dogs/${id}`)
                .then(response => {
                    if(!response.ok) throw Error(response.status);
                    return response.json()})
                .then(data => {
                    dispatch({ type: GET_BY_ID, payload: data });
                })
                .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString()}));
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
            dispatch({ type: CREATE_DOG_BREED, payload: response.status })})
        .catch(error => dispatch({ type: ERROR_OCURRED, payload: error.toString()}));
    };
};

export const orderBreeds = (payload) => {
    return{
        type: ORDER_BREEDS,
        payload
    }
};

export const clearError = () => {
    return{
        type: CLEAR_ERROR,
    }
}

export const clearFilters = () => {
    return{
        type: RESET_FILTERS,
    }
}
