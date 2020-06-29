import {get, post, put, remove} from "../helpers/ajax.helpers";

const BASE_URL = 'http://localhost:8080/api/'
const reducer = (state, action) => {
    console.log("entra a reducer");
    switch (action.Type) {
        case "LIST":
            get(`${BASE_URL}recipe/recipes/`)
                .then(result => {
                    return result;
                });
            return state;
        case "ADD":
            post(`${BASE_URL}recipe/recipes/`, action.payload)
                .then(r => {
                    state = [...state,r];
                });
            return state;
        case "EDIT":
            put(`${BASE_URL}recipe/recipes/`, action.payload)
                .then(r => {
                    const recipes = state.filter(recipe => recipe.id !== action.payload.id);
                    return [...recipes, r];
                });
            return state;
        case "DELETE":
            remove(`${BASE_URL}recipe/recipes/`, action.id)
                .then(result => {
                    const recipes = state.filter(recipe => recipe.id !== action.payload.id);
                    return recipes;
                })
            return state;
        default:
            return state;
    }
}


export default reducer;