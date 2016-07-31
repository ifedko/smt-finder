import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { changePageOfHistoryDetailsList } from '../actions';
import ResultItem from '../components/ResultItem';

class SearchDetailsContainer extends Component {
    static get propTypes() {
        return {
            backUrl: PropTypes.string.isRequired,
            details: PropTypes.shape({
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                items: PropTypes.array.isRequired,
                itemsPageNumber: PropTypes.number.isRequired,
                itemsPagesCount: PropTypes.number.isRequired,
            }).isRequired,
            isLoading: PropTypes.bool.isRequired,
            handleChangePage: PropTypes.func.isRequired
        };
    }

    render() {
        const { details, handleChangePage, isLoading, backUrl } = this.props;
        return (
            <div>
                <Link to={backUrl}>
                    <span className="glyphicon glyphicon-menu-left"></span> Назад
                </Link>
                {!isLoading &&
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
