import React from "react";
import styled from 'styled-components'
import '../utils.css';

const IngredientContainer = styled.div`    position: relative;
    width: fit-content;
    height: 10px;
    font-size: 0.5em;
    padding: 3px;
    border: solid 0.5px orange;
    line-height: 8px;
    border-radius: 3px;
    float: left;
    margin: 1px;
    `;

const Ingredient = (props) => {
    return <IngredientContainer>
        {props.ingredient.name}&nbsp;
        <i className='fa fa-remove' style={{'cursor': 'pointer'}}
           onClick={() => props.onremove(props.ingredient.id)}/>
    </IngredientContainer>
};

export default Ingredient;