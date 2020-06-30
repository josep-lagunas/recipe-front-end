import {useState, useEffect} from 'react';
import RecipesService from "../services/Recipes.Service";

export default recipeSearch => {
    const [fetchResult, setFetchResult] = useState({recipes: [], loading: false});

    useEffect(() => {
        const fetchData = async () => {
            setFetchResult({recipes: [], loading: true});
            const results = await RecipesService.search(recipeSearch.text);
            setFetchResult({recipes: results, loading: false});
        }
        fetchData();

    }, [recipeSearch]);

    return fetchResult;
}