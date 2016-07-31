import { combineReducers } from 'redux';

const defaultState = {
    list: {
        items: [
            {
                searchType: 'links',
                url: 'e2e4online.ru',
                date: '16:20 16.06.2016',
                foundCount: 152
            },
            {
                searchType: 'text',
                url: 'e2e4online.ru',
                date: '16:20 16.06.2016',
                foundCount: 22,
                searchValue: 'комплектующие'
            },
            {
                searchType: 'images',
                url: 'e2e4online.ru',
                date: '16:20 16.06.2016',
                foundCount: 78
            }
        ],
        pageNumber: 3,
        pagesCount: 5
    },
    details: {
        searchType: 'images',
        url: 'e2e4online.ru',
        date: '16:20 16.06.2016',
        items: [
            "http://static1.squarespace.com/static/53323bb4e4b0cebc6a28ffa2/53573350e4b0758dd79db484/53d7ed16e4b042d1ea99f850/1406732832301/?format=1000w",
            "http://images2.fanpop.com/images/photos/4800000/kate-evangeline-lilly-4806637-1400-1050.jpg"
        ],
        itemsPageNumber: 2,
        itemsPagesCount: 5
    }
};

const historyList = (state = defaultState.list, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE_OF_HISTORY_LIST':
            return Object.assign({}, state, { pageNumber: action.pageNumber });
        default:
            return state;
    }
};

const historyDetails = (state = defaultState.details, action) => {
    switch (action.type) {
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
