import React, {useState} from "react";
import styled from 'styled-components'
import {v4 as uuid} from 'uuid';
import '../utils.css';
import { useHistory } from 'react-router-dom';

const RecipeContainer = styled.div`
        background-color: #fff;
        display: flex;
        position: relative;
        float: left;
        height: 7vw;
        border: solid 0.5px #fff;
        border-radius: 4px;
        width: 7vw;
        cursor: pointer;
        margin: 0.1vw;
        opacity: 0.5;
        text-align: center;
        align-items: center;
        overflow: hidden;
        opacity: 0.7;
        
        
        transition: all 0.3s;

        &:hover{
            background-color: #fff;
            opacity: 1;
            transform: scale(1.3);
            border-radius: 2px;
            z-index:10;
        }
     `;

const Title = styled.p`
        font-family: 'Annie Use Your Telescope', cursive;
        font-size: 0.7em;
        width: inherit;
     `;

const IconsContainer = styled.div`
        position: absolute;
        bottom: 0;
        right: -30px;  
        transition: all 0.3s;
                
        ${RecipeContainer}:hover & {
            right: 0;
        }
     `;

const Icon = styled.i`
        font-size: 0.4em;
        margin-right: 3px;
        cursor: pointer;
     `;

const Recipe = (props) => {

    const [removed, setRemoved] = useState(false);
    const [id, setId] = useState(-1);

    const history = useHistory();

    const performRemoveActions = evt => {
        evt.stopPropagation()
        setRemoved(true);
        setId(props.recipe.id);
    };

    const openEditRecipe = evt => {
        history.push('/edit', props.recipe);
    }

    return (
        <RecipeContainer onClick={openEditRecipe}
                         className={removed && props.recipe.id === id && 'removedItem'}
                         onAnimationEnd={() => {
                             props.onremove(props.recipe.id);
                         }}>
            <Title key={uuid().toString()}>{props.recipe.name}</Title>
            <IconsContainer onClick={performRemoveActions}>
                <Icon className="fa fa-trash" />
            </IconsContainer>
        </RecipeContainer>
    );
}

export default Recipe;