import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import application from './application';
import search from './search';
import history from './history';

const rootReducer = combineReducers({
    routing,
    form: formReducer,
    application,
    search,
    history
});

export default rootReducer;
