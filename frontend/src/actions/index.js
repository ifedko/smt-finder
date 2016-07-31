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
