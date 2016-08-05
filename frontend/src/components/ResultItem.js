import React, { Component, PropTypes } from 'react';
import { Table, Pagination, Alert } from 'react-bootstrap';

class ResultItem extends Component {
    static get propTypes() {
        return {
            details: PropTypes.shape({
                data: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    searchType: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                    createdAt: PropTypes.string.isRequired,
                    resultsCount: PropTypes.number.isRequired
                }).isRequired,
                items: PropTypes.array.isRequired,
                pagination: PropTypes.shape({
                    pageNumber: PropTypes.number.isRequired,
                    pagesCount: PropTypes.number.isRequired
                }).isRequired
            }),
            handleChangePage: PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);
        this.handleSelectPage = this.handleSelectPage.bind(this);
    }

    handleSelectPage(pageNumber) {
        this.props.handleChangePage(pageNumber);
    }

    getLabel(type, key) {
        const labelsMap = {
            text: {
                'header': 'текста',
                'table': 'Текст',
            },
            images: {
                'header': 'картинок',
                'table': 'Картинка',
            },
            links: {
                'header': 'ссылок',
                'table': 'Ссылка',
            }
        };
        return labelsMap[type][key];
    }

    render() {
        console.log('PROPS of RESULT ITEM', this.props);
        const { details: { data, items, pagination } } = this.props;
        const rows = [];
        if (items) {
            items.forEach((value, index) => {
                rows.push(
                    <tr key={index}>
                        <td>{index}</td>
                        <td>
                            {data.searchType === 'images' &&
                            <img className="img-thumbnail" width="200px" src={value}/>
                            }
                            {(data.searchType === 'text' || data.searchType === 'links') &&
                            {value}
                            }
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div>
                <h3>
                    Результат поиска {this.getLabel(data.searchType, 'header')} на сайте {data.url} {data.createdAt}
                </h3>
                {rows.length === 0 &&
                    <Alert bsStyle="info">
                        Ничего не найдено :(
                    </Alert>
                }
                {rows.length > 0 &&
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{this.getLabel(data.searchType, 'table')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                }
                {(rows.length > 0 && pagination.pagesCount > 1) &&
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
                        onSelect={this.handleSelectPage}
                    />
                }
            </div>
        );
    }
}

export default ResultItem;
