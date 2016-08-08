import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Router } from 'react-router';
import { push } from 'react-router-redux';
import { Grid, Row, Col, Navbar, Nav, NavItem, Alert } from 'react-bootstrap';

class RootContainer extends Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            application: PropTypes.shape({
                isLoading: PropTypes.bool.isRequired,
                error: PropTypes.string
            }),
            routerPushPath: PropTypes.func.isRequired
        };
    }

    render() {
        const { application: { isLoading, error }, routerPushPath } = this.props;
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
                                <Nav>
                                    <NavItem
                                        eventKey={1}
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            routerPushPath('/');
                                        }}
                                    >
                                        Поиск
                                    </NavItem>
                                    <NavItem
                                        eventKey={2}
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            routerPushPath('/history');
                                        }}
                                    >
                                        История
                                    </NavItem>
                                </Nav>
                            </Navbar>
                        </Col>
                    </Row>
                    <Row>
                        {!isLoading && error &&
                            <Col md={12}>
                                <Alert bsStyle="danger">
                                    <h6>{error}</h6>
                                </Alert>
                            </Col>
                        }
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
        application: state.application
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        routerPushPath: (url) => {
            dispatch(push(url));
        }
    };
};

RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);

export default RootContainer;
