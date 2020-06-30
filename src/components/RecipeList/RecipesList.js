import React, {memo, useState} from "react";
import styled from "styled-components";
import {v4 as uuid} from 'uuid';
import Recipe from "../Recipe/Recipe";
import {useHistory} from 'react-router-dom';
import SearchBox from "../SearchBox/SearchBox";
import useRecipesSearcher from "../../hooks/useRecipesSearcher";
import RecipesService from "../../services/Recipes.Service";

const RecipesContainer = styled.div`
    width: 82vw;
    margin: 10vh;
    height: 78vh;
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
    font-size:2.5em;
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

const StartContainer = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
    `;

const Banner = styled.div`
    position: absolute;
    width: 100vw;
    font-size: 3em;
    color: #fff;
    filter: drop-shadow(0px 5px 1px #000);
    top: 40vh;
    `;

const StartCreatingButton = styled.div`
    position: absolute;
    height: 2vw;
    width: 200px;
    top: 50vh;
    left: 43%;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    line-height: 2vw;
    font-size: 20px;
    transition: all 0.3s;
    color: #fff;
    display: inline-block;
    align-items: center;
    background: radial-gradient(ellipse at center,rgba(254,204,177,1) 0%,rgba(241,116,50,1) 100%,rgba(251,149,94,1) 100%);
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
    font-size: 1.2em;
    padding: 3px;
    border:solid 0.5px #fff;
    color: #fff;
    `;

const SearchWrapper = styled.div`
    position:absolute;
    width: 300px;
    height: 40px;
    top: 20px;
    right: 20px;   
    z-index: 100; 
    `;

export default memo((props) => {

    const [recipeSearch, setSearch] = useState({text: '', searchExecuted: false});
    let recipesState = useRecipesSearcher(recipeSearch);

    const existsData = recipesState.recipes.length > 0;

    const history = useHistory();

    const onSearch = textToSearch => setSearch({...recipeSearch, text: textToSearch, searchExecuted: true});
    const onRemove = async id => {
        await RecipesService.delete(id);
        setSearch({...recipeSearch, text: recipeSearch.text, searchExecuted: false});
    }

    const recipesComparer = (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);

    const RenderNoSearchMatch = _ => {
        return (<StartContainer>
            <Banner>
                {recipeSearch.searchExecuted ?
                    `No results found for ${recipeSearch.text}` : 'Start creating your first recipe right now'}
            </Banner>
            <div style={{'width': '100vw'}}>
                <StartCreatingButton onClick={() => {
                    history.push('/create');
                }}>Create Recipe
                </StartCreatingButton>
            </div>
        </StartContainer>);
    }

    const RenderSearchMatching = _ => {
        return (<>
            <RecipesContainer key={uuid().toString()}>
                {
                    recipesState.loading ? <Loading key={uuid().toString()}>loading data...</Loading> :
                        recipesState
                            .recipes
                            .sort(recipesComparer)
                            .map(r =>
                                <Recipe key={uuid().toString()} recipe={r} onremove={onRemove}/>)
                }
            </RecipesContainer>
        </>);
    }

    return (
        <>
            <SearchWrapper>
                <SearchBox onSearch={onSearch}/>
            </SearchWrapper>
            {existsData ? RenderSearchMatching() : RenderNoSearchMatch()}

            {!recipesState.loading && existsData &&

            <AddRecipeButton onClick={() => {
                history.push('/create');
            }}>+</AddRecipeButton>
            }
        </>);
})
;