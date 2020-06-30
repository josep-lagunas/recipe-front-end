import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBox from "./SearchBox";

const setupComponent = (props = {}) => {
    return render(<SearchBox {...props} />);
}

describe('<SeachBox/>', () => {
    it('Search prop method is invoke on Enter hit', () => {

        const searchText = 'recipe name';
        const onSearch = jest.fn();

        const {getByTestId} = setupComponent({
            onSearch: onSearch
        });

        fireEvent.submit(getByTestId('form-search'));
        expect(onSearch).toBeCalledTimes(1);
    });
});