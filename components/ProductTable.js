import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBox from '@material-ui/icons/AddBox';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import axios from 'axios';
import TableHead from '@material-ui/core/TableHead';
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label='previous page'
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function ProductTable(props) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reRender, setReRender] = React.useState(false);
    let myBag = props.myBag;
    let config = props.config;
    let rows = myBag.product;
    // let myBagRe = props.myBag;
    const changeMyBag = React.useCallback(
        (value) => {
            myBag = value;
            setReRender(!reRender);
            console.log('my bag now', myBag);
        },
        [reRender]
    );
    // const changeMyBag = async (value) => {
    //     myBagRe = value;
    //     // rows = value.product;
    //     console.log('my bag now', myBagRe);
    //     // console.log('my rows now', rows);

    //     setReRender(!reRender);
    //     // return { myBag, rows };
    //     // return myBagRe;
    // };
    React.useEffect(() => {
        console.log('re render happend');
        // changeMyBag;
        // myBag = myBagRe;
        // myBag = changeMyBag.myBag;
        console.log('final my bag now', myBag);
        // rows = myBag.product;
    }, [reRender]);

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAdd = (value) => {
        let product = JSON.parse(value);
        console.log(product);
        axios
            .patch(
                `http://localhost:8000/product-with-quantity/${product.id}/`,
                {
                    quantity: product.quantity + 1,
                    cost: product.cost + product.product.price,
                },
                config
            )
            .then((res) => {
                console.log(res.data);
                let pk = [];
                myBag.product.map((product) => (pk = pk.concat(product.id)));
                console.log(pk);
                axios
                    .patch(
                        `http://localhost:8000/my-bag/${myBag.id}/`,
                        {
                            product: pk,
                            sub_total: myBag.sub_total + product.product.price,
                        },
                        config
                    )
                    .then((res) => {
                        console.log(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${res.data.id}/`,
                                config
                            )
                            .then((res) => {
                                // this.setState({ myBag: res.data });

                                console.log('final after add', res.data);
                                changeMyBag(res.data);

                                // just jeta show hbe oita state e rakha jay, jmn ekahane just quantity
                                // no, price change kora jabe eta dekhale
                                // but price show amra direct na kore calculate kore dite pari
                                // always update the state, because I work everything using state
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleRemove = (value) => {
        let product = JSON.parse(value);
        console.log(product);
        axios
            .patch(
                `http://localhost:8000/product-with-quantity/${product.id}/`,
                {
                    quantity: product.quantity - 1,
                    cost: product.cost - product.product.price,
                },
                config
            )
            .then((res) => {
                console.log(res.data);
                let pk = [];
                myBag.product.map((product) => (pk = pk.concat(product.id)));
                console.log(pk);
                axios
                    .patch(
                        `http://localhost:8000/my-bag/${myBag.id}/`,
                        {
                            product: pk,
                            sub_total: myBag.sub_total - product.product.price,
                        },
                        config
                    )
                    .then((res) => {
                        console.log(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${res.data.id}/`,
                                config
                            )
                            .then((res) => {
                                // this.setState({ myBag: res.data });

                                console.log('final after remove', res.data);
                                // always update the state, because I work everything using state
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleDelete = (value) => {
        let product = JSON.parse(value);
        console.log(product);
        axios
            .delete(
                `http://localhost:8000/product-with-quantity/${product.id}/`,
                config
            )
            .then((res) => {
                console.log(res.data);
                let pk = [];
                myBag.product.map((product) => (pk = pk.concat(product.id)));
                console.log(pk);
                let length = pk.length;
                for (let i = 0; i < length; i++) {
                    if (pk[i] === product.id) {
                        pk.splice(i, 1);
                        i--;
                    }
                }

                // need to remove exact array element... that's why I splice this exact way
                console.log(pk);
                axios
                    .patch(
                        `http://localhost:8000/my-bag/${myBag.id}/`,
                        {
                            product: pk,
                            sub_total: myBag.sub_total - product.cost,
                        },
                        config
                    )
                    .then((res) => {
                        console.log(res.data);
                        axios
                            .get(
                                `http://localhost:8000/my-bag/${res.data.id}/`,
                                config
                            )
                            .then((res) => {
                                // this.setState({ myBag: res.data });

                                console.log('final after delete', res.data);
                                // always update the state, because I work everything using state
                            })
                            .catch((err) => console.log(err.response));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                aria-label='custom pagination table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Price</TableCell>
                        <TableCell align='center'>Quantity</TableCell>
                        <TableCell align='center'>Cost</TableCell>
                        <TableCell align='center'>Option</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name} hover>
                            <TableCell
                                component='th'
                                scope='row'
                                align='center'
                            >
                                {row.product.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align='center'>
                                {row.product.price}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align='center'>
                                {row.product.quantity !== 0 && (
                                    <IconButton
                                        color='error'
                                        onClick={() =>
                                            handleRemove(JSON.stringify(row))
                                        }
                                    >
                                        <RemoveCircleIcon />
                                    </IconButton>
                                )}

                                {row.quantity}
                                <IconButton
                                    color='error'
                                    onClick={() =>
                                        handleAdd(JSON.stringify(row))
                                    }
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell style={{ width: 160 }} align='center'>
                                {row.cost}
                            </TableCell>

                            <TableCell style={{ width: 160 }} align='center'>
                                <IconButton
                                    color='error'
                                    onClick={() =>
                                        handleDelete(JSON.stringify(row))
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 },
                            ]}
                            colSpan={5}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
