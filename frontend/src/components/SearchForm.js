import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'
import { Form, FormGroup, Col, ControlLabel, Radio, Button, FormControl } from 'react-bootstrap';
import classNames from 'classnames';

const validate = (values) => {
    const errors = {};

    if (!values.url) {
        errors.url = 'заполните поле';
    } else if (values.url.length > 100) {
        errors.url = 'ограничение по длине адреса сайта в 100 символов';
    } else if (!values.url.match(/^((ht)tps?:\/\/)?[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)) {
        errors.url = 'некорректный адрес сайта';
    }

    if (values.searchType === 'text') {
        if (!values.text) {
            errors.text = 'заполните поле';
        } else if (values.text.length > 30) {
            errors.text = 'ограничение по длине текста в 30 символов';
        }
    }

    const availableValues = ['text', 'links', 'images'];
    if (!values.searchType) {
        errors.searchType = 'выберите что искать';
    } else if (availableValues.indexOf(values.searchType) < 0) {
        errors.searchType = 'выберите существующий тип поиска';
    }

    return errors
}

class SearchForm extends Component {
    static get propTypes() {
        return {
            activeSearchType: PropTypes.string.isRequired,
            fields: PropTypes.object.isRequired,
            onChangeSearchType: PropTypes.func.isRequired,
            onChangeUrl: PropTypes.func.isRequired,
            onChangeSearchText: PropTypes.func.isRequired,
            handleSubmit: PropTypes.func.isRequired,
            resetForm: PropTypes.func.isRequired,
            submitting: PropTypes.bool.isRequired
        };
    }

    constructor(props) {
        super(props);
        this.handleOnChangeSearchType = this.handleOnChangeSearchType.bind(this);
        this.handleOnChangeUrl = this.handleOnChangeUrl.bind(this);
        this.handleOnChangeSearchText = this.handleOnChangeSearchText.bind(this);
    }

    handleOnChangeUrl(event) {
        this.props.fields.url.onChange(event);
        const url = event.target.value;
        this.props.onChangeUrl(url);
    }

    handleOnChangeSearchType(event) {
        this.props.fields.searchType.onChange(event);
        const searchType = event.target.value;
        this.props.onChangeSearchType(searchType);
    }

    handleOnChangeSearchText(event) {
        this.props.fields.text.onChange(event);
        const text = event.target.value;
        this.props.onChangeSearchText(text);
    }

    render() {
        const { activeSearchType, fields: { url, searchType, text }, handleSubmit, submitting } = this.props;
        const textFieldHasError = (text.touched && text.error);
        return (
            <Form horizontal onSubmit={handleSubmit}>
                <FormGroup
                    controlId="formUrl"
                    className={classNames({
                        'has-error': (url.touched && url.error)
                    })}
                >
                    <Col componentClass={ControlLabel} sm={4}>
                        Сайт:
                    </Col>
                    <Col sm={4}>
                        <FormControl
                            type="text"
                            placeholder={"введите адрес сайта"}
                            {...url}
                            onChange={this.handleOnChangeUrl}
                        />
                        {(url.touched && url.error) &&
                            <div className="text-danger">
                                {url.error}
                            </div>
                        }
                    </Col>
                </FormGroup>
                <FormGroup controlId="formText">
                    <Col componentClass={ControlLabel} sm={4}>
                        Что ищем:
                    </Col>
                    <Col sm={4}>
                        <Radio
                            inline
                            {...searchType}
                            value="text"
                            checked={searchType.value === 'text'}
                            onChange={this.handleOnChangeSearchType}
                        >
                            Текст
                        </Radio>
                        <Radio
                            inline
                            {...searchType}
                            value="links"
                            checked={searchType.value === 'links'}
                            onChange={this.handleOnChangeSearchType}
                        >
                            Ссылки
                        </Radio>
                        <Radio
                            inline
                            {...searchType}
                            value="images"
                            checked={searchType.value === 'images'}
                            onChange={this.handleOnChangeSearchType}
                        >
                            Картинки
                        </Radio>
                    </Col>
                </FormGroup>
                {(activeSearchType === 'text') &&
                    <FormGroup
                        controlId="formText"
                        className={classNames({
                            'has-error': (text.touched && text.error)
                        })}
                    >
                        <Col componentClass={ControlLabel} sm={4}>
                            Текст:
                        </Col>
                        <Col sm={4}>
                            <FormControl
                                type="text"
                                placeholder={"введите текст поиска"}
                                {...text}
                                onChange={this.handleOnChangeSearchText}
                            />
                            {text.touched && text.error &&
                                <div className="text-danger">
                                    {text.error}
                                </div>
                            }
                        </Col>
                    </FormGroup>
                }
                <FormGroup>
                    <Col smOffset={4} sm={4}>
                        <Button type="submit" disabled={submitting} bsStyle="primary">
                            {submitting ? <i/> : <i/>} Поиск
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default reduxForm(
    {
        form: 'search',
        fields: ['url', 'searchType', 'text'],
        validate
    },
    state => ({
        initialValues: {
            searchType: state.search.activeSearchType,
            url: state.search.searchUrl,
            text: state.search.searchText
        }
    })
)(SearchForm);
