import React, { Component, PropTypes } from 'react';
import { Table, Pagination, Alert } from 'react-bootstrap';

class ResultItem extends Component {
    static get propTypes() {
        return {
            details: PropTypes.shape({
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                items: PropTypes.array.isRequired,
                itemsPageNumber: PropTypes.number.isRequired,
                itemsPagesCount: PropTypes.number.isRequired,
            }).isRequired,
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
        const { details: { searchType, url, date, items, itemsPageNumber, itemsPagesCount }} = this.props;
        const rows = [];
        items.forEach((value, index) => {
            rows.push(
                <tr key={index}>
                    <td>{index}</td>
                    <td>
                        {searchType === 'images' &&
                            <img className="img-thumbnail" width="200px" src={value} />
                        }
                        {(searchType === 'text' || searchType === 'links') &&
                            {value}
                        }
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h3>
                    Результат поиска {this.getLabel(searchType, 'header')} на сайте {url} {date}
                </h3>
                {items.length === 0 &&
                    <Alert bsStyle="info">
                        Ничего не найдено :(
                    </Alert>
                }
                {items.length > 0 &&
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{this.getLabel(searchType, 'table')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                }
                {(items.length > 0 && itemsPagesCount > 1) &&
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={itemsPagesCount}
                        maxButtons={5}
                        activePage={itemsPageNumber}
                        onSelect={this.handleSelectPage}
                    />
                }
            </div>
        );
    }
}

export default ResultItem;
