import {useState, useEffect, useReducer} from 'react';
import {BASE_URL, get, remove} from "../helpers/ajax.helpers";

export default (action, payload) => {

    const initialState = {isLoading: false, status: 'SUCCESS', data: {}};
    const [state, setState] = useState(initialState);

    switch (action) {
        case 'SEARCH_RECIPES':
            const searchToApply = payload.textToSearch.trim() !== '' ? `?name=${payload.textToSearch.trim()}` : '';
            const fetchData = async () => {
                dispatch({isLoading: true, status: 'PENDING', data: []});
                const results = await get(`${BASE_URL}recipe/recipes/${searchToApply}`)
                dispatch({isLoading: false, status: 'SUCCESS', data: results});
            }
            fetchData();

    }

    return state;

}