import fetch from 'isomorphic-fetch';
import * as constants from '../constants';

const apiBaseUrl = constants.apiBaseUrl;
const errorMessage = constants.errorUserMessage;

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

export const setError = (error) => {
    return {
        type: 'SET_ERROR',
        error
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

export const search = (data) => {
    return (dispatch, getState) => {
        dispatch(setIsLoading(true));
        dispatch(requestSearch());
        const request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(data)
        };
        return fetch(`${apiBaseUrl}/v1/requests/search`, request)
            .then(response => {
                return response.json();
            })
            .then(result => {
                if (result.status === false) {
                    const errorResultMessage = (result.error) ? result.error : 'Неизвестная ошибка';
                    dispatch(setError(errorResultMessage));
                } else {
                    dispatch(receiveSearchResult(result));
                }
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(setError(errorMessage));
                dispatch(setIsLoading(false));
            });
    }
};

export const loadHistory = (pageNumber = 1) => {
    return (dispatch, getState) => {
        dispatch(setIsLoading(true));
        dispatch(requestHistory());
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return fetch(`${apiBaseUrl}/v1/requests?page=${pageNumber}&per-page=${constants.historyItemsPerPage}&sort=-createdAt`, request)
            .then(response => {
                return {
                    itemsPromise: response.json(),
                    pagination: {
                        pagesCount: Number(response.headers.get('X-Pagination-Page-Count')),
                        pageNumber: Number(response.headers.get('X-Pagination-Current-Page'))
                    }
                };
            })
            .then(data => {
                data.itemsPromise.then(items => {
                    dispatch(receiveHistory(items, data.pagination));
                    dispatch(setIsLoading(false));
                });
            })
            .catch(error => {
                dispatch(setError(errorMessage));
                dispatch(setIsLoading(false));
            });;
    };
};

export const loadResultDetails = (id) => {
    return (dispatch, getState) => {
        dispatch(setIsLoading(true));
        dispatch(requestResultDetails());
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        return fetch(`${apiBaseUrl}/v1/requests/${id}`, request)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dispatch(receiveResultDetails(data));
                dispatch(setIsLoading(false));
            })
            .catch(error => {
                dispatch(setError(errorMessage));
                dispatch(setIsLoading(false));
            });
    };
};

export const loadResultItems = (resultId, pageNumber = 1, appendItems = false) => {
    return (dispatch, getState) => {
        dispatch(requestResultItems());
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        return fetch(`${apiBaseUrl}/v1/results?request_id=${resultId}&page=${pageNumber}&per-page=${constants.resultItemsPerPage}`, request)
            .then(response => {
                const pagesCount = (Number(response.headers.get('X-Pagination-Page-Count')) > 0)
                    ? Number(response.headers.get('X-Pagination-Page-Count'))
                    : 1;
                const pageNumber = (Number(response.headers.get('X-Pagination-Current-Page')) > 0)
                    ? Number(response.headers.get('X-Pagination-Current-Page'))
                    : 1;
                return {
                    itemsPromise: response.json(),
                    pagination: {
                        pagesCount,
                        pageNumber
                    }
                };
            })
            .then(data => {
                data.itemsPromise.then(items => {
                    dispatch(receiveResultItems(items, data.pagination, appendItems));
                });
            })
            .catch(error => {
                dispatch(setError(errorMessage));
                dispatch(setIsLoading(false));
            });
    };
};

/* API ACTIONS */

const requestHistory = () => {
    return {
        type: 'REQUEST_HISTORY'
    };
};

const receiveHistory = (items, pagination) => {
    return {
        type: 'RECEIVE_HISTORY',
        items,
        pagination
    };
};

const requestResultDetails = () => {
    return {
        type: 'REQUEST_RESULT_DETAILS'
    };
};

const receiveResultDetails = (data) => {
    return {
        type: 'RECEIVE_RESULT_DETAILS',
        data
    };
};

const requestResultItems = () => {
    return {
        type: 'REQUEST_RESULT_ITEMS'
    };
};

const receiveResultItems = (items, pagination, appendItems) => {
    return {
        type: 'RECEIVE_RESULT_ITEMS',
        items,
        pagination,
        appendItems
    };
};

const requestSearch = () => {
    return {
        type: 'REQUEST_SEARCH'
    };
};

const receiveSearchResult = (data) => {
    return {
        type: 'RECEIVE_SEARCH_RESULT',
        result: data
    };
};
