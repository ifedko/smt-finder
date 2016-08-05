import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Pagination, Table, Alert } from 'react-bootstrap';

class ResultList extends Component {
    static get propTypes() {
        return {
            items: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                resultsCount: PropTypes.number.isRequired,
                text: PropTypes.string
            })).isRequired,
            pagination: PropTypes.shape({
                pageNumber: PropTypes.number.isRequired,
                pagesCount: PropTypes.number.isRequired,
                itemsPerPage: PropTypes.number.isRequired
            }),
            handleChangePage: PropTypes.func
        };
    }

    constructor(props) {
        super(props);
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }

    handlePageSelect(pageNumber) {
        if (this.props.handleChangePage && this.props.pagination.pageNumber !== pageNumber) {
            this.props.handleChangePage(pageNumber);
        }
    }

    getSearchTypeName(type, text = '') {
        const map = {
            text: `текст (${text})`,
            links: 'ссылки',
            images: 'картинки',
        };
        return map[type] ? map[type] : '-';
    }

    render() {
        const { items, pagination } = this.props;
        const rows = [];
        if (items) {
            items.forEach((item, index) => {
                const itemKey = (index + 1) + pagination.itemsPerPage * (pagination.pageNumber - 1);
                const text = (item.text) ? item.text : '';
                rows.push(
                    <tr key={itemKey}>
                        <td>{itemKey}</td>
                        <td>{item.url}</td>
                        <td>{item.createdAt}</td>
                        <td>{this.getSearchTypeName(item.searchType, text)}</td>
                        <td>{item.resultsCount}</td>
                        <td>
                            {item.searchType !== 'text' &&
                                <Link to={`/search-details/${item.id}`}>
                                    <span className="glyphicon glyphicon-eye-open"></span>
                                </Link>
                            }
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div>
                {(items && items.length === 0) &&
                    <Alert bsStyle="info">
                        История поиска еще пуста.
                    </Alert>
                }
                {(items && items.length > 0) &&
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Сайт</th>
                                <th>Дата</th>
                                <th>Тип поиска</th>
                                <th>Шт.</th>
                                <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                }
                {(items && items.length > 0 && pagination && pagination.pagesCount > 1) &&
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={pagination.pagesCount}
                        maxButtons={5}
                        activePage={pagination.pageNumber}
                        onSelect={this.handlePageSelect}
                    />
                }
            </div>
        );
    }
}

export default ResultList;
