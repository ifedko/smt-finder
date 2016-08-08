import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadResultDetails, loadResultItems, addPageOfSearchDetailsList } from '../actions';
import * as constants from '../constants';
import ResultItem from '../components/ResultItem';

class SearchDetailsContainer extends Component {
    static get propTypes() {
        return {
            params: PropTypes.shape({
                resultId: PropTypes.string
            }),
            backUrl: PropTypes.string.isRequired,
            data: PropTypes.shape({
                id: PropTypes.number,
                searchType: PropTypes.string,
                url: PropTypes.string,
                createdAt: PropTypes.string,
                resultsCount: PropTypes.number
            }),
            items: PropTypes.array.isRequired,
            pagination: PropTypes.shape({
                pageNumber: PropTypes.number,
                pagesCount: PropTypes.number
            }),
            isLoading: PropTypes.bool.isRequired,
            init: PropTypes.func.isRequired,
            addPage: PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillMount() {
        const resultId = (this.props.params.resultId && Number(this.props.params.resultId) > 0)
            ? Number(this.props.params.resultId)
            : 0;
        if (resultId > 0) {
            this.props.init(resultId);
        }
    }

    handleChangePage(pageNumber) {
        if (this.props.data.id) {
            this.props.addPage(this.props.data.id, pageNumber);
        }
    }

    render() {
        const { data, items, pagination, isLoading, backUrl } = this.props;
        return (
            <div>
                <Link to={backUrl}>
                    <span className="glyphicon glyphicon-menu-left"></span> Назад
                </Link>
                {!isLoading && data.id &&
                    <ResultItem data={data} items={items} pagination={pagination} handleChangePage={this.handleChangePage}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        backUrl: state.application.backUrl,
        data: state.history.historyDetails.data,
        items: state.history.historyDetails.items,
        pagination: {
            pageNumber: state.history.historyDetails.pagination.pageNumber,
            pagesCount: state.history.historyDetails.pagination.pagesCount,
            itemsPerPage: constants.resultItemsPerPage
        },
        isLoading: state.application.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (resultId, pageNumber) => {
            dispatch(loadResultDetails(resultId))
                .then(() => dispatch(loadResultItems(resultId, pageNumber)));
        },
        addPage: (resultId, pageNumber) => {
            dispatch(loadResultItems(resultId, pageNumber, true));
        }
    };
};

SearchDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchDetailsContainer);

export default SearchDetailsContainer;
