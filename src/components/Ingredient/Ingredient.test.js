import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import Ingredient from "./Ingredient";
import '@testing-library/jest-dom/extend-expect';
import Recipe from "../Recipe/Recipe";
import {v4 as uuid} from 'uuid';

const setupComponent = (props = {}) => {
    return render(<Ingredient {...props} />);
}

describe('<Ingredient>', () => {
    it('Ingredient shows a text with the ingredient name', () => {

        const ingredientName = 'Ingredient name';

        const {getByText} = setupComponent({
            ingredient: {id: uuid(), name: ingredientName}
        });
        expect(getByText(ingredientName)).toBeInTheDocument();
    });

    it('Ingredient removed after click on remove icon', () => {

        const ingredientName = 'Ingredient name';
        const onremove = jest.fn();
        const {getByTestId} = setupComponent({
            ingredient: {id: uuid(), name: ingredientName},
            onremove:onremove
        });


        expect(getByTestId('remove-icon')).toBeInTheDocument();
        fireEvent.click(getByTestId('remove-icon'))
        expect(onremove).toBeCalledTimes(1);
    });
})