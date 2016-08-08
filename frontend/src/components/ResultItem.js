import React, { Component, PropTypes } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class ResultItem extends Component {
    static get propTypes() {
        return {
            data: PropTypes.shape({
                id: PropTypes.number.isRequired,
                searchType: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                createdAt: PropTypes.string.isRequired,
                resultsCount: PropTypes.number.isRequired
            }).isRequired,
            items: PropTypes.array,
            pagination: PropTypes.shape({
                pageNumber: PropTypes.number.isRequired,
                pagesCount: PropTypes.number.isRequired,
                itemsPerPage: PropTypes.number.isRequired
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
        const { data, items, pagination } = this.props;
        const rows = [];
        if (items) {
            if (data.searchType === 'images') {
                const countCellsInRow = 5;
                const rowsNumber = Math.ceil(items.length / countCellsInRow);
                for (let rowNumber = 0; rowNumber < rowsNumber; rowNumber++) {
                    const rowCells = [];
                    for (let cellNumber = 0; cellNumber < countCellsInRow; cellNumber++) {
                        const itemNumber = cellNumber + countCellsInRow * rowNumber;
                        if (!items[itemNumber]) {
                            break;
                        }

                        rowCells.push(
                            <td key={itemNumber} colSpan={2}>
                                <a href={items[itemNumber].value} target="_blank">
                                    <img className="img-thumbnail" width="200px" src={items[itemNumber].value}/>
                                </a>
                            </td>
                        );
                    }

                    rows.push(
                        <tr key={rowNumber}>
                            {rowCells}
                        </tr>
                    );
                }
            }
            if (data.searchType === 'links') {
                items.forEach((item, index) => {
                    const itemKey = (index + 1);
                    rows.push(
                        <tr key={index}>
                            <td>{itemKey}</td>
                            <td>
                                <a href={item.value} target="_blank">
                                    {item.value}
                                </a>
                            </td>
                        </tr>
                    );
                });
            }
        }

        return (
            <div>
                <h3>
                    Результат поиска {this.getLabel(data.searchType, 'header')} на сайте <i>{data.url}</i> ({data.createdAt})
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
                {(rows.length > 0 && pagination.pagesCount > 1 && (pagination.pageNumber < pagination.pagesCount)) &&
                    <div>
                        <Button bsStyle="info" onClick={(event) => this.handleSelectPage(pagination.pageNumber + 1)}>Загрузить еще</Button>
                    </div>
                }
            </div>
        );
    }
}

export default ResultItem;
