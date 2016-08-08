import { combineReducers } from 'redux';

const defaultState = {
    list: {
        items: [],
        pagination: {
            pageNumber: 1,
            pagesCount: 1
        },
        isFetching: false
    },
    details: {
        data: {},
        items: [],
        pagination: {
            pageNumber: 1,
            pagesCount: 1
        },
        isFetching: false
    }
};

const historyList = (state = defaultState.list, action) => {
    switch (action.type) {
        case 'REQUEST_HISTORY':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_HISTORY':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.items,
                pagination: action.pagination
            });
        default:
            return state;
    }
};

const historyDetailsData = (state = defaultState.details.data, action) => {
    switch (action.type) {
        case 'RECEIVE_RESULT_DETAILS':
            return Object.assign({}, state, {
                id: action.data.id,
                url: action.data.url,
                searchType: action.data.searchType,
                resultsCount: action.data.resultsCount,
                createdAt: action.data.createdAt
            });
        default:
            return state;
    }
};

const historyDetails = (state = defaultState.details, action) => {
    switch (action.type) {
        case 'REQUEST_RESULT_DETAILS':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_RESULT_DETAILS':
            return Object.assign({}, state, {
                data: historyDetailsData(state.data, action),
                isFetching: false
            });
        case 'REQUEST_RESULT_ITEMS':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVE_RESULT_ITEMS':
            return Object.assign({}, state, {
                items: (action.appendItems) ? [...state.items, ...action.items] : action.items,
                pagination: action.pagination,
                isFetching: false
            });
        default:
            return state;
    }
};

const history = combineReducers({
    historyList,
    historyDetails
});

export default history;
