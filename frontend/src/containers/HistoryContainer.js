import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { setBackUrl, loadHistory } from '../actions';
import * as constants from '../constants';
import ResultList from '../components/ResultList';

class HistoryContainer extends Component {
    static get propTypes() {
        return {
            params: PropTypes.shape({
                page: PropTypes.string
            }),
            items: PropTypes.arrayOf(PropTypes.shape({
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                resultsCount: PropTypes.number.isRequired
            })),
            pagination: PropTypes.shape({
                pageNumber: PropTypes.number.isRequired,
                pagesCount: PropTypes.number.isRequired,
                itemsPerPage: PropTypes.number.isRequired
            }).isRequired,
            isLoading: PropTypes.bool.isRequired,
            handleChangePage: PropTypes.func.isRequired,
            init: PropTypes.func.isRequired
        };
    }

    componentWillMount() {
        const pageNumber = (this.props.params.page && Number(this.props.params.page) > 0)
            ? Number(this.props.params.page)
            : 1;
        this.props.init(pageNumber);
    }

    componentWillReceiveProps(nextProps) {
        const pageNumber = (this.props.params.page && Number(this.props.params.page) > 0)
            ? Number(this.props.params.page)
            : 1;
        const defaultPageNumber = 1;
        if (!nextProps.params.page && pageNumber > defaultPageNumber) {
            this.props.init(defaultPageNumber);
        }
    }

    render() {
        const { items, pagination, handleChangePage, isLoading } = this.props;
        return (
            <div>
                <h1>История поиска</h1>
                {!isLoading && items && items.length > 0 &&
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
            pagesCount: state.history.historyList.pagesCount,
            itemsPerPage: constants.itemsPerPage
        },
        isLoading: state.application.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangePage: (pageNumber) => {
            const backUrl = (pageNumber > 1) ? `/history/page/${pageNumber}` : '/history';
            dispatch(setBackUrl(backUrl));
            dispatch(push(`/history/page/${pageNumber}`));
            dispatch(loadHistory(pageNumber));
        },
        init: (pageNumber) => {
            const backUrl = (pageNumber > 1) ? `/history/page/${pageNumber}` : '/history';
            dispatch(setBackUrl(backUrl));
            dispatch(loadHistory(pageNumber));
        }
    };
};

HistoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryContainer);

export default HistoryContainer;
