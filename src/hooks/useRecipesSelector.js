import {useState, useEffect} from 'react';
import {BASE_URL, get} from "../helpers/ajax.helpers";

export default recipeSearchText => {
    const [fetchResult, setFetchResult] = useState({recipes: [], loading: false});

    useEffect(() => {

        const searchToApply = recipeSearchText.trim() !== '' ? `?name=${recipeSearchText}` : '';
        const fetchData = async () => {
            setFetchResult({recipes: [], loading: true});
            const results = await get(`${BASE_URL}recipe/recipes/${searchToApply}`)
            setFetchResult({recipes: results, loading: false});
        }
        fetchData();

    }, [recipeSearchText]);

    return fetchResult;
}