import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setBackUrl, changePageOfHistoryList, loadHistory } from '../actions';
import ResultList from '../components/ResultList';

class HistoryContainer extends Component {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(PropTypes.shape({
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                resultsCount: PropTypes.number.isRequired
            })).isRequired,
            pagination: PropTypes.shape({
                pageNumber: PropTypes.number.isRequired,
                pagesCount: PropTypes.number.isRequired
            }).isRequired,
            isLoading: PropTypes.bool.isRequired,
            setBackUrl: PropTypes.func.isRequired,
            handleChangePage: PropTypes.func.isRequired,
            init: PropTypes.func.isRequired
        };
    }

    componentWillMount() {
        this.props.setBackUrl('/history');
        this.props.init();
    }

    render() {
        const { items, pagination, handleChangePage, isLoading } = this.props;
        return (
            <div>
                <h1>История поиска</h1>
                {!isLoading && items.length > 0 &&
                    <ResultList items={items} pagination={pagination} handleChangePage={handleChangePage}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.history.historyList.items,
        pagination: {
            pageNumber: state.history.historyList.pageNumber,
            pagesCount: state.history.historyList.pagesCount
        },
        isLoading: state.application.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBackUrl: (backUrl) => {
            dispatch(setBackUrl(backUrl));
        },
        handleChangePage: (pageNumber) => {
            dispatch(changePageOfHistoryList(pageNumber));
        },
        init: () => {
            dispatch(loadHistory());
        }
    };
};

HistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryContainer);

export default HistoryContainer;
