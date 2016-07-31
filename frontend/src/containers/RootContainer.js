import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, Navbar } from 'react-bootstrap';

class RootContainer extends Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            isLoading: PropTypes.bool.isRequired
        };
    }

    render() {
        const { isLoading } = this.props;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Navbar>
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <Link to="/">Smt finder</Link>
                                    </Navbar.Brand>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <ul>
                                        <li>
                                            <Link to="/">Поиск</Link>
                                        </li>
                                        <li>
                                            <Link to="/history">История</Link>
                                        </li>
                                    </ul>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
                {isLoading &&
                    <div id="pluswrap">
                        <div className="plus">
                            Loading...
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.application.isLoading
    };
};

RootContainer = connect(
    mapStateToProps
)(RootContainer);

export default RootContainer;
