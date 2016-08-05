import { combineReducers } from 'redux';

const defaultState = {
    list: {
        items: [],
        pageNumber: 1,
        pagesCount: 1,
        isFetching: false
    },
    details: {
        data: {},
        items: [],
        pageNumber: 1,
        pagesCount: 1,
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
                pageNumber: action.pagination.pageNumber,
                pagesCount: action.pagination.pagesCount
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
            console.log('RECEIVE_RESULT_DETAILS', action);
            return Object.assign({}, state, {
                data: historyDetailsData(state.data, action),
                isFetching: false,
            });
        case 'SET_HISTORY_DETAILS':
            return Object.assign({}, state, {
                searchType: action.details.searchType,
                url: action.details.url,
                createdAt: action.details.createdAt,
                resultsCount: action.details.resultsCount,
                items: action.details.items
            });
        case 'CHANGE_PAGE_OF_HISTORY_DETAILS_LIST':
            return Object.assign({}, state, { itemsPageNumber: action.pageNumber });
        default:
            return state;
    }
};

const history = combineReducers({
    historyList,
    historyDetails
});

export default history;
