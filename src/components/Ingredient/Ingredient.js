import React from "react";
import styled from 'styled-components'
import '../../utils.css';

const IngredientContainer = styled.div`
    position: relative;
    width: fit-content;
    font-size: 1.1em;
    padding: 3px;
    border: solid 0.5px orange;
    line-height: 1em;
    border-radius: 3px;
    float: left;
    margin: 1px;
    background-color: darkseagreen;
    color: white;
    `;

export default (props) => {
    return (
        <IngredientContainer data-testid='ingredient-container'>
            {props.ingredient.name}&nbsp;
            <i data-testid='remove-icon' className='fa fa-remove' onClick={() => props.onremove(props.ingredient.id)}/>
        </IngredientContainer>);
}