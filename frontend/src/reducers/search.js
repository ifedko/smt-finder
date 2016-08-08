import { combineReducers } from 'redux';

const defaultState = {
    isFetching: false,
    activeSearchType: 'text',
    searchUrl: '',
    searchText: '',
    result: null
};

const result = (state = defaultState.result, action) => {
    switch (action.type) {
        case 'RECEIVE_SEARCH_RESULT':
            return Object.assign({}, state, {
                id: action.result.id,
                url: action.result.url,
                text: action.result.text,
                searchType: action.result.searchType,
                resultsCount: action.result.resultsCount,
                createdAt: action.result.createdAt
            });
        default:
            return state;
    }
};

const search = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_URL':
            return Object.assign({}, state, { searchUrl: action.searchUrl });
        case 'CHANGE_SEARCH_TYPE':
            return Object.assign({}, state, { activeSearchType: action.activeSearchType });
        case 'CHANGE_SEARCH_TEXT':
            return Object.assign({}, state, { searchText: action.searchText });
        case 'REQUEST_SEARCH':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_SEARCH_RESULT':
            return Object.assign({}, state, {
                result: result(state.result, action),
                isFetching: false
            });
        default:
            return state;
    }
};

export default search;
