import fetch from 'isomorphic-fetch'

const apiBaseUrl = 'http://api.smt-finder.local';
const itemsOnPage = 20;

export const setIsLoading = (isLoading) => {
    return {
        type: 'SET_IS_LOADING',
        isLoading
    }
};

export const setBackUrl = (backUrl) => {
    return {
        type: 'SET_BACK_URL',
        backUrl
    }
};

export const changeSearchUrl = (searchUrl) => {
    return {
        type: 'CHANGE_SEARCH_URL',
        searchUrl
    }
};

export const changeSearchType = (activeSearchType) => {
    return {
        type: 'CHANGE_SEARCH_TYPE',
        activeSearchType
    }
};

export const changeSearchText = (searchText) => {
    return {
        type: 'CHANGE_SEARCH_TEXT',
        searchText
    }
};

const setResult = (result) => {
    return {
        type: 'SET_SEARCH_RESULT',
        result
    }
};

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
};

export const loadHistory = () => {
    return (dispatch, getState) => {
        dispatch(setIsLoading(true));
        dispatch(requestHistory());
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        //@todo handle errors
        return fetch(`${apiBaseUrl}/v1/requests`, request)
            .then(response => {
                // console.log(response.headers);
                // console.log(response.headers.values());
                // console.log(response.headers.get('X-Pagination-Current-Page'));
                return response.json();
            })
            .then(items => {
                console.log('items', items);
                dispatch(receiveHistory(items));
                dispatch(setIsLoading(false));
            });
    };
};

export const changePageOfHistoryList = (pageNumber) => {
    return {
        type: 'CHANGE_PAGE_OF_HISTORY_LIST',
        pageNumber
    }
};

export const changePageOfHistoryDetailsList = (pageNumber) => {
    return {
        type: 'CHANGE_PAGE_OF_HISTORY_DETAILS_LIST',
        pageNumber
    }
};

/* API ACTIONS */

const requestHistory = () => {
    return {
        type: 'REQUEST_HISTORY'
    };
};

const receiveHistory = (json) => {
    return {
        type: 'RECEIVE_HISTORY',
        items: json
    };
};

const requestResultDetails = () => {
    return {
        type: 'REQUEST_RESULT_DETAILS'
    };
};

const receiveResultDetails = (json) => {
    return {
        type: 'RECEIVE_RESULT_DETAILS',
        details: json.data
    };
};

const requestSearch = () => {
    return {
        type: 'REQUEST_SEARCH'
    };
};

const receiveSearchResult = (json) => {
    return {
        type: 'RECEIVE_SEARCH_RESULT',
        details: json.data
    };
};
