import {get,post,  put, remove} from "../helpers/ajax.helpers";
const BASE_URL = 'http://localhost:8080/api/'

const RecipesService = {
    search: async (text) => {
        const searchToApply = `?name=${text}`;
        const results = await get(`${BASE_URL}recipe/recipes/${searchToApply}`)
        return results;
    },
    create: async (recipe) => {
        const result = await post(`${BASE_URL}recipe/recipes/`, recipe);
        return result;
    },
    update: async (recipe) => {
        const result = await put(`${BASE_URL}recipe/recipes/${recipe.id}/`, recipe);
        return result;
    },
    delete: async (recipeId) => {
        const result = await remove(`${BASE_URL}recipe/recipes`, recipeId);
        return result;
    }
}

export default RecipesService;