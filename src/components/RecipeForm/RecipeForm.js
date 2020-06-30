import React, {useState} from "react";
import Ingredient from "../Ingredient/Ingredient";
import styled from 'styled-components'
import {v4 as uuid} from 'uuid';
import {useHistory} from 'react-router-dom';
import '../../utils.css';
import RecipesService from "../../services/Recipes.Service";

const Fields = styled.div`
    margin-top: 5vh;
    `;

const FormContainer = styled.div`
    background-color: #fff;
    display: inline-table;
    position: relative;
    margin-top: 20vh;
    max-height: 60vh;
    border: solid 1.1px #fff;
    border-radius: 4px;
    width: 40vw;
    cursor: pointer;
    text-align: center;
    align-items: center;
    overflow: hidden;
    opacity: 1;
    font-family: arial;
    `;

const Input = styled.input`
    display: flex;
    width: 65%;     
    margin-left: 3%;
    font-size: 1.1em;
    padding: 3px;
    `;

const TextArea = styled.textarea`
    display: flex;
    width: 65%;
    margin-left: 3%;
    font-size: 1.1em;
    padding: 3px;
    font-family: arial;
    `;

const Label = styled.label`
    display: inline-block;
    width: 27%;
    font-size: 1.1em;
    text-align: right;
    font-family: arial;
    `;

const FieldWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 2%;
    `;

const Icon = styled.i`
    margin-left: 5px;
    width: auto;
    font-size: 1em;
    `;

const ButtonsWrapper = styled.div`
    width: 95%;
    bottom: 15px;
    text-align: right;
    margin: 10px;
    `;

const Button = styled.button`
    margin-right: 10px;
    width: auto;
    font-size: 1.1em;
    cursor:pointer;
    padding: 3px;
    `;

const SuccessButton = styled.button`
    background-color: rgb(142, 222, 102);
    border: solid 1.1px;
    border-radius: 1px;
    padding: 3px;
    color: darkgreen;
    font-size: 1.1em;
    cursor:pointer;
    `;

const IngredientsWrapper = styled.div`
    position:relative;
    width: 91%;
    margin: 5%;
    max-height: 10vw;
    overflow: auto;
    `;

const RecipeForm = (props) => {
        const history = useHistory();

        const buildDefaultRecipe = () => {
            if (props.isEditing && !!history.location.state) {
                const editableRecipe = history.location.state;

                return {
                    recipeName: editableRecipe.name,
                    recipeDescription: editableRecipe.description,
                    currentIngredient: '',
                    ingredients: editableRecipe.ingredients.map(i => ({id: uuid(), name: i.name}))
                }
            }

            return {recipeName: '', recipeDescription: '', currentIngredient: '', ingredients: []};

        }
        const defaultRecipe = buildDefaultRecipe(history.location.state);
        const [recipe, setRecipe] = useState(defaultRecipe);

        const canSave = recipe.recipeName.trim() !== ''
            && recipe.recipeDescription.trim() !== ''
            && recipe.ingredients.length > 0;

        const handleIngredientRemove = (id) => {
            const modifiedIngredients = recipe.ingredients.filter(i => i.id !== id);
            setRecipe({...recipe, ingredients: modifiedIngredients});
        }

        const handleChange = (evt) => {
            setRecipe({
                ...recipe,
                [evt.target.name]: evt.target.value
            });
        }
        const GoBack = (evt) => {
            evt.preventDefault();
            history.push('/home');
        }

        const handleAddIngredientToRecipe = (evt) => {
            if (evt.which !== 13 || recipe.currentIngredient.trim() === '') return;
            const modifiedIngredients = [...recipe.ingredients, {id: uuid(), name: recipe.currentIngredient}];
            setRecipe({...recipe, ingredients: modifiedIngredients, currentIngredient: ''});
        }

        const disableSubmit = (evt) => {
            if (evt.key === 'Enter') {
                evt.stopPropagation();
                evt.preventDefault();

            }
        }

        const handleSubmit = async (evt) => {
            evt.preventDefault();

            const payload = {
                name: recipe.recipeName,
                description: recipe.recipeDescription,
                ingredients: recipe.ingredients.map(i => ({name: i.name}))
            };

            if (props.isEditing) {
                payload.id = history.location.state.id;
                await RecipesService.update(payload);
                history.push('/home');
            } else {
                await RecipesService.create(payload);
                history.push('/home');
            }
        };

        return (
            <FormContainer>
                <form data-testid='form-recipe' onSubmit={handleSubmit}>
                    <Fields>
                        <FieldWrapper>
                            <Label htmlFor='recipe-name'>Recipe name:</Label>
                            <Input type='text' id='recipe-name' name='recipeName' value={recipe.recipeName}
                                   placeholder='Add a name for your recipe' onChange={handleChange}
                                   onKeyPress={disableSubmit}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label htmlFor='recipe-description'>Recipe description:</Label>
                            <TextArea id='recipe-description' name='recipeDescription' value={recipe.recipeDescription}
                                      placeholder='Add a description for you recipe' onChange={handleChange}/>
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label htmlFor='currentIngredient'>Ingredient:</Label>
                            <Input type='text' id='ingredient' name='currentIngredient' value={recipe.currentIngredient}
                                   placeholder='Add an ingredient and press enter'
                                   onChange={handleChange}
                                   onKeyPress={disableSubmit}
                                   onKeyUp={handleAddIngredientToRecipe}/>

                        </FieldWrapper>
                        <IngredientsWrapper>
                            {recipe.ingredients.map(i => <Ingredient key={uuid().toString()} ingredient={i}
                                                                     onremove={handleIngredientRemove}/>)}
                        </IngredientsWrapper>
                    </Fields>
                    <ButtonsWrapper>
                        <Button onClick={GoBack}>Back<Icon className="fa fa-step-backward"/></Button>
                        <SuccessButton data-testid='success-action-button' disabled={!canSave}
                                       className={!canSave ? 'disabled' : ''}>
                            {props.isEditing ? 'Update' : 'Create'}
                            <Icon className="fa fa-check"></Icon>
                        </SuccessButton>
                    </ButtonsWrapper>
                </form>
            </FormContainer>
        );
    }
;

export default RecipeForm;