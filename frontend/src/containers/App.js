import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import RootContainer from '../containers/RootContainer';
import HomeContainer from '../containers/HomeContainer';
import HistoryContainer from '../containers/HistoryContainer';
import SearchDetailsContainer from '../containers/SearchDetailsContainer';


class App extends Component {
    static get propTypes() {
        return {
            history: PropTypes.object.isRequired,
            DevTools: PropTypes.func
        };
    }

    render() {
        const { history, DevTools } = this.props;
        return (
            <div>
                <Router
                    onUpdate={() => window.scrollTo(0, 0)}
                    history={history}
                >
                    <Route path="/" component={RootContainer}>
                        <IndexRoute component={HomeContainer} />
                        <Route path="/history" component={HistoryContainer} />
                        <Route path="/search-details" component={SearchDetailsContainer} />
                    </Route>
                </Router>
                <DevTools />
            </div>
        );
    }
}

export default App;
