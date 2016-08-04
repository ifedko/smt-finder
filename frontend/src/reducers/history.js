import { combineReducers } from 'redux';

const defaultState = {
    list: {
        items: [
            {
                searchType: 'links',
                url: 'e2e4online.ru',
                createdAt: '16:20 16.06.2016',
                resultsCount: 152
            },
            {
                searchType: 'text',
                url: 'e2e4online.ru',
                createdAt: '16:20 16.06.2016',
                resultsCount: 22,
                searchValue: 'комплектующие'
            },
            {
                searchType: 'images',
                url: 'e2e4online.ru',
                createdAt: '16:20 16.06.2016',
                resultsCount: 78
            }
        ],
        pageNumber: 3,
        pagesCount: 5,
        isFetching: false
    },
    details: {
        searchType: 'images',
        url: 'e2e4online.ru',
        createdAt: '16:20 16.06.2016',
        resultsCount: 78,
        items: [
            "http://static1.squarespace.com/static/53323bb4e4b0cebc6a28ffa2/53573350e4b0758dd79db484/53d7ed16e4b042d1ea99f850/1406732832301/?format=1000w",
            "http://images2.fanpop.com/images/photos/4800000/kate-evangeline-lilly-4806637-1400-1050.jpg"
        ],
        itemsPageNumber: 2,
        itemsPagesCount: 5,
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
                items: action.items
            });
        case 'CHANGE_PAGE_OF_HISTORY_LIST':
            return Object.assign({}, state, { pageNumber: action.pageNumber });
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
                isFetching: false,
                searchType: action.searchType,
                url: action.url,
                createdAt: action.createdAt,
                resultsCount: action.resultsCount,
                items: action.items
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
