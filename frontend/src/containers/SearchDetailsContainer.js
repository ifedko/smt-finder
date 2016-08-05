import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadResultDetails, changePageOfHistoryDetailsList } from '../actions';
import ResultItem from '../components/ResultItem';

class SearchDetailsContainer extends Component {
    static get propTypes() {
        return {
            params: PropTypes.shape({
                resultId: PropTypes.string
            }),
            backUrl: PropTypes.string.isRequired,
            details: PropTypes.shape({
                data: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    searchType: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                    createdAt: PropTypes.string.isRequired,
                    resultsCount: PropTypes.number.isRequired
                }),
                items: PropTypes.array.isRequired,
                pagination: {
                    pageNumber: PropTypes.number.isRequired,
                    pagesCount: PropTypes.number.isRequired
                }
            }),
            isLoading: PropTypes.bool.isRequired,
            init: PropTypes.func.isRequired,
            handleChangePage: PropTypes.func.isRequired
        };
    }

    componentWillMount() {
        const resultId = (this.props.params.resultId && Number(this.props.params.resultId) > 0)
            ? Number(this.props.params.resultId)
            : 0;
        if (resultId > 0) {
            this.props.init(resultId);
        }
    }

    render() {
        const { details, handleChangePage, isLoading, backUrl } = this.props;
        return (
            <div>
                <Link to={backUrl}>
                    <span className="glyphicon glyphicon-menu-left"></span> Назад
                </Link>
                {!isLoading && details &&
                    <ResultItem details={details} handleChangePage={handleChangePage}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        backUrl: state.application.backUrl,
        details: state.history.historyDetails,
        isLoading: state.application.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: (resultId) => {
            dispatch(loadResultDetails(resultId));
        },
        handleChangePage: (pageNumber) => {
            dispatch(changePageOfHistoryDetailsList(pageNumber));
        }
    };
};

SearchDetailsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchDetailsContainer);

export default SearchDetailsContainer;
