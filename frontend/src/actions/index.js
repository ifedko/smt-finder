import { CALL_API } from 'redux-api-middleware';

const apiBaseUrl = 'http://api.smt-finder.local';
const itemsOnPage = 20;

export const fetchHistoryList = (offset) => {
    return {
        [CALL_API]: {
            endpoint: `${apiBaseUrl}/v1/requests`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        },
        types: ['REQUEST', 'SUCCESS', 'FAILURE']
    };
}

export const fetchResultDetail = (id) => {
    return {
        [CALL_API]: {
            endpoint: `${apiBaseUrl}/v1/requests/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            types: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    };
}

export const search = (url, searchType, text) => {
    return {
        [CALL_API]: {
            endpoint: `${apiBaseUrl}/v1/search`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    url,
                    searchType,
                    text
                }
            }),
            types: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    };
}

export const setIsLoading = (isLoading) => {
    return {
        type: 'SET_IS_LOADING',
        isLoading
    }
}

export const setBackUrl = (backUrl) => {
    return {
        type: 'SET_BACK_URL',
        backUrl
    }
}

export const changeSearchUrl = (searchUrl) => {
    return {
        type: 'CHANGE_SEARCH_URL',
        searchUrl
    }
}

export const changeSearchType = (activeSearchType) => {
    return {
        type: 'CHANGE_SEARCH_TYPE',
        activeSearchType
    }
}

export const changeSearchText = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText
    }
}

export const setHistoryItems = (items) => {
    return {
        type: 'SET_HISTORY_ITEMS',
        items
    }
}

export const setHistoryDetails = (details) => {
    return {
        type: 'SET_HISTORY_DETAILS',
        details
    }
}

const setResult = (result) => {
    return {
        type: 'SET_SEARCH_RESULT',
        result
    }
}

export const submitSearchForm = (data) => {
    return (dispatch, getState) => {
        console.log('SUBMITTING DATA');
        dispatch(setIsLoading(true));
        dispatch(search(data.url, data.searchType, data.text));
        // @todo load result by data
        const searchResult = {
            searchType: data.searchType,
            url: data.url,
            date: '2016',
            text: data.text,
            foundCount: 100
        };
        dispatch(setResult(searchResult));
        setTimeout(() => {
            dispatch(setIsLoading(false));
        }, 2000);
    }
}

export const loadHistory = () => {
    return (dispatch, getState) => {
        dispatch(setIsLoading(true));
        dispatch(fetchHistoryList()).then((items) => {
            dispatch(setHistoryItems(items.payload));
            dispatch(setIsLoading(false));
        });
    };
}

export const changePageOfHistoryList = (pageNumber) => {
    return {
        type: 'CHANGE_PAGE_OF_HISTORY_LIST',
        pageNumber
    }
}

export const changePageOfHistoryDetailsList = (pageNumber) => {
    return {
        type: 'CHANGE_PAGE_OF_HISTORY_DETAILS_LIST',
        pageNumber
    }
}
