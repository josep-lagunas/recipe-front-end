import React, {useState} from "react";
import styled from 'styled-components'

const SearchBox = styled.div`
    position: relative;
    `;

const Input = styled.input`
    width: 80%;
    height: 80%;
    position:relative;
    float:left;
    font-size: 1.1em;
    padding:10px;
    border:none;
    outline:none;
    `;

const Button = styled.button`
    position: relative;
    float: left;
    height: 80%;
    font-size: 1.1em;
    padding: 10px;
    border: none;
    margin-left: 1px;
    outline: none;
    cursor: pointer;
    `;

export default props => {

    const [textToSearch, setTextToSearch] = useState('');

    const handleOnChange = evt => {
        setTextToSearch(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        props.onSearch(textToSearch.trim());
        setTextToSearch('');
    }

    return (<SearchBox>
        <form onSubmit={handleSubmit}>
            <Input name='searchText' id='search-text' type='text' onChange={handleOnChange} value={textToSearch}
                   placeholder='recipe name'/>
            <Button><i className='fa fa-search'></i></Button>
        </form>
    </SearchBox>);

}

