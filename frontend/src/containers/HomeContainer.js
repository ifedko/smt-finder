import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setBackUrl, changeSearchType, changeSearchUrl, changeSearchText, submitSearchForm } from '../actions';
import SearchForm from '../components/SearchForm';
import ResultList from '../components/ResultList';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.setBackUrl('/');
    }

    static get propTypes() {
        return {
            search: PropTypes.shape({
                activeSearchType: PropTypes.string.isRequired,
                result: PropTypes.shape({
                    searchType: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                    foundCount: PropTypes.number.isRequired,
                    text: PropTypes.string
                })
            }).isRequired,
            isLoading: PropTypes.bool.isRequired,
            setBackUrl: PropTypes.func.isRequired,
            handleChangeSearchType: PropTypes.func.isRequired,
            handleChangeUrl: PropTypes.func.isRequired,
            handleChangeSearchText: PropTypes.func.isRequired,
            handleSubmitSearchForm: PropTypes.func.isRequired
        };
    }

    render() {
        const { search: { activeSearchType, result }, isLoading } = this.props;
        const items = result ? [result] : [];
        return (
            <div>
                <SearchForm
                    activeSearchType={activeSearchType}
                    onChangeSearchType={this.props.handleChangeSearchType}
                    onChangeUrl={this.props.handleChangeUrl}
                    onChangeSearchText={this.props.handleChangeSearchText}
                    onSubmit={this.props.handleSubmitSearchForm}
                />
                {!isLoading && items.length > 0 &&
                    <ResultList items={items} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search,
        isLoading: state.application.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBackUrl: (backUrl) => {
            dispatch(setBackUrl(backUrl));
        },
        handleChangeSearchType: (searchType) => {
            dispatch(changeSearchType(searchType));
        },
        handleChangeUrl: (url) => {
            dispatch(changeSearchUrl(url));
        },
        handleChangeSearchText: (text) => {
            dispatch(changeSearchText(text));
        },
        handleSubmitSearchForm: (data) => {
            dispatch(submitSearchForm(data));
        }
    };
};

HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);

export default HomeContainer;
