import { combineReducers } from 'redux';

const defaultState = {
    activeSearchType: 'text',
    searchUrl: '',
    searchText: '',
    result: null
};

const search = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_URL':
            return Object.assign({}, state, { searchUrl: action.searchUrl });
        case 'CHANGE_SEARCH_TYPE':
            return Object.assign({}, state, { activeSearchType: action.activeSearchType });
        case 'CHANGE_SEARCH_TEXT':
            return Object.assign({}, state, { searchText: action.searchText });
        case 'SET_SEARCH_RESULT':
            return Object.assign({}, state, { result: action.result });
        default:
            return state;
    }
};

export default search;
