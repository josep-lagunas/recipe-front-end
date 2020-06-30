import React from 'react';
import './App.css';
import RecipesList from "./components/RecipeList/RecipesList";
import RecipeForm from "./components/RecipeForm/RecipeForm"
import {v4 as uuid} from "uuid";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div key={uuid().toString()} className="App">
            <BrowserRouter>
                <Redirect exact from='/' to='home'/>
                <Switch>
                    <Route exact path='/home'>
                        <RecipesList/>
                    </Route>
                    <Route exact
                           path='/create'
                           render={(props) => (<RecipeForm {...props} isEditing={false}/>)}
                    />
                    <Route exact
                           path='/edit'
                           render={(props) => (<RecipeForm {...props} isEditing={true}/>)}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
