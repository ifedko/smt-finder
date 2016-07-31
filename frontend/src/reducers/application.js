import { combineReducers } from 'redux';

const defaultState = {
    isLoading: false,
    backUrl: ''
};

const application = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_IS_LOADING':
            return Object.assign({}, state, { isLoading: action.isLoading });
        case 'SET_BACK_URL':
            return Object.assign({}, state, { backUrl: action.backUrl });
        default:
            return state;
    }
};

export default application;
