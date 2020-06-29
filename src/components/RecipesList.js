import React, {memo, useEffect, useReducer} from "react";
import recipesReducer from "../reducers/recipes.reducer";
import {get, BASE_URL, remove} from "../helpers/ajax.helpers"
import styled from "styled-components";
import {v4 as uuid} from 'uuid';
import Recipe from "./Recipe";
import {useHistory} from 'react-router-dom';

const RecipesContainer = styled.div`
    width: 82vw;
    margin: 10vh;
    height: 80vh;
    align-items: center;
    display: inline-table;
`;

const AddRecipeButton = styled.div`
    position: fixed;
    width: 4vw;
    height: 4vw;
    border-radius: 50px;
    cursor: pointer;
    bottom: 30px;
    opacity: 1;
    right: 30px;
    line-height: 4vw;
    font-size:20px;
    background: radial-gradient(ellipse at center, rgba(254,204,177,1) 0%,rgba(241,116,50,1) 100%,rgba(251,149,94,1) 100%);
    transition: all 0.3s;
    color: #fff;
    &:hover{
            box-shadow: 0px 0px 5px 3px rgba(245,245,245,0.5);
            opacity: 1;
            transform: translateY(-3px) scale(1);
            z-index:10;
        } 
`;

const Loading = styled.div`
    position:relative;
    margin:22%;
    width:auto;
    font: arial;
    font-size: 0.5em;
    padding: 3px;
    border:solid 0.5px #fff;
    color: #fff;
    `;

const RecipesList = memo((props) => {
    const initialState = {loading: true, data: undefined};

    const [state, dispatch] = useReducer(recipesReducer, initialState);
    const history = useHistory();

    useEffect(() => {
        get(`${BASE_URL}recipe/recipes/`)
            .then(result => {
                dispatch({Type: 'FETCHING_SUCCESS', payload: result});
            });

    }, []);

    const onRemove = (id) => {
        remove(`${BASE_URL}recipe/recipes`, id)
            .then(result => {
                dispatch({Type: 'REMOVING_SUCCESS', payload: {id: id}});
            });
    }

    return (
        <>
            <RecipesContainer key={uuid().toString()}>
                {
                    state.loading ? <Loading key={uuid().toString()}>loading data...</Loading> :
                        state.data.map(r => <Recipe key={uuid().toString()} recipe={r} onremove={onRemove}/>)
                }
            </RecipesContainer>
            {!state.loading &&
            <AddRecipeButton onClick={() => {
                history.push('/create');
            }}>+</AddRecipeButton>
            }
        </>);
});
export default RecipesList;