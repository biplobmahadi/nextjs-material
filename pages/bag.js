import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductTable from '../components/ProductTable';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { useRouter } from 'next/router';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';

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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import TableHead from '@material-ui/core/TableHead';

import Cookies from 'js-cookie';
import { useEffect } from 'react';

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

// 1. when anything change on state the component will re render
// 2. we use useEffect only if we need anything to do before component mount or willmount
// 3. these two are most important about react component
// 4. Don't depend on state for data, which related to backend. because state can be changed from devtools
//    if state change then in server everything will be changed which is too harmful..
// 5. we can't change component props. so this is secure
// 6. formik to get form value, here also no need to use state.

let myBagRe;

export default function Bag(props) {
    const router = useRouter();

    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [reRender, setReRender] = React.useState(false);

    let myBag = myBagRe ? myBagRe : props.myBag;
    let config = props.config;
    let rows = myBag ? myBag.product : [];

    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };
    
    console.log('bag e', myBag);
    console.log('bag e Re', myBagRe);

    // here useEffect -> when component mount and update myBagRe will undefined
    // because, when we change route then myBagRe again remain previous one which is not 
    // updated one, that's why we make it undefined and bag will server rendered

    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
        myBagRe = undefined
    });

    
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
                        // here product.product.productavailable.id used, because here product means product with quantity not single product
                        axios
                        .patch(
                            `http://localhost:8000/product-update-only-quantity/${product.product.productavailable.id}/`,
                            {
                                available_quantity: product.product.productavailable.available_quantity - 1
                            },
                            config
                        )
                        .then((res) => {
                            // final get will be after all post, patch done
                            axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
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
                        // here product.product.productavailable.id used, because here product means product with quantity not single product
                        axios
                        .patch(
                            `http://localhost:8000/product-update-only-quantity/${product.product.productavailable.id}/`,
                            {
                                available_quantity: product.product.productavailable.available_quantity + 1
                            },
                            config
                        )
                        .then((res) => {
                            // final get will be after all post, patch done
                            axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                // this.setState({ myBag: res.data });
                                console.log('final after add', res.data);
                                changeMyBag(res.data);
                            })
                            .catch((err) => console.log(err.response));
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
                        // here product.product.productavailable.id used, because here product means product with quantity not single product
                        axios
                        .patch(
                            `http://localhost:8000/product-update-only-quantity/${product.product.productavailable.id}/`,
                            {
                                available_quantity: product.product.productavailable.available_quantity + product.quantity
                            },
                            config
                        )
                        .then((res) => {
                            // final get will be after all post, patch done
                            axios
                            .get(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                config
                            )
                            .then((res) => {
                                // this.setState({ myBag: res.data });
                                console.log('final after add', res.data);
                                changeMyBag(res.data);
                            })
                            .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                        
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    };

    const handleCheckout = () => {
        if (myBag) {
            if (myBag.product.length !== 0) {
                axios
                    .post(
                        'http://localhost:8000/my-order/',
                        { my_bag: myBag.id },
                        config
                    )
                    .then((res) => {
                        console.log(res.data);
                        // this.setState({ orderId: res.data.id });
                        let orderId = res.data.id;
                        axios
                            .patch(
                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                { is_send_to_my_order: true },
                                config
                            )
                            .then((res) => {
                                console.log(res.data);
                                router.push(`/receiver/${orderId}`);
                                // this.setState({ submitted: true });
                            })
                            .catch((err) => {
                                console.log(err.response);
                                // this.setState({ submitted: false });
                            });
                    })
                    .catch((err) => {
                        console.log(err.response);
                    });
            } else {
                console.log('You must have one product in your bag!');
            }
        } else {
            console.log('You must have product in your bag!');
        }
    };

    return (
        <div>
            <Head>
                <title>My Bag</title>
                <link rel='icon' href='/a.ico' />
                {/* <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                /> */}
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar totalProductInBag={ myBag && myBag.product.length} />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={6} pt={3} px={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Typography variant='h5' component='h5'>
                                            <strong>My Bag</strong>{' '}
                                            <Chip
                                                label={`${
                                                    myBag
                                                        ? myBag.product.length
                                                        : 0
                                                } item`}
                                                color='secondary'
                                                size='small'
                                            />
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Button variant='contained'>
                                            <Box px={3}>
                                                Total Tk.{' '}
                                                {myBag ? myBag.sub_total : 0}
                                            </Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box pt={2} borderRadius='borderRadius'>
                                <TableContainer component={Paper}>
                                    <Table
                                        className={classes.table}
                                        aria-label='custom pagination table'
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>
                                                    Name
                                                </TableCell>
                                                <TableCell align='center'>
                                                    Price
                                                </TableCell>
                                                <TableCell align='center'>
                                                    Quantity
                                                </TableCell>
                                                <TableCell align='center'>
                                                    Cost
                                                </TableCell>
                                                <TableCell align='center'>
                                                    Option
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(rowsPerPage > 0
                                                ? rows.slice(
                                                      page * rowsPerPage,
                                                      page * rowsPerPage +
                                                          rowsPerPage
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
                                                    <TableCell
                                                        style={{ width: 160 }}
                                                        align='center'
                                                    >
                                                        {row.product.price}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ width: 160 }}
                                                        align='center'
                                                    >
                                                        {row.quantity > 1 && (
                                                            <IconButton
                                                                color='error'
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        JSON.stringify(
                                                                            row
                                                                        )
                                                                    )
                                                                }
                                                            >
                                                                <RemoveCircleIcon />
                                                            </IconButton>
                                                        )}

                                                        {row.quantity}
                                                        {row.product.productavailable.available_quantity !== 0
                                                        ?
                                                        <IconButton
                                                            color='error'
                                                            onClick={() =>
                                                                handleAdd(
                                                                    JSON.stringify(
                                                                        row
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <AddCircleIcon />
                                                        </IconButton>
                                                        :
                                                        <Chip 
                                                            label='Not In Stock'
                                                            color='secondary'
                                                            size='small'
                                                        />
                                                        }
                                                        
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ width: 160 }}
                                                        align='center'
                                                    >
                                                        {row.cost}
                                                    </TableCell>

                                                    <TableCell
                                                        style={{ width: 160 }}
                                                        align='center'
                                                    >
                                                        <IconButton
                                                            color='error'
                                                            onClick={() =>
                                                                handleDelete(
                                                                    JSON.stringify(
                                                                        row
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: 53 * emptyRows,
                                                    }}
                                                >
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
                                                        {
                                                            label: 'All',
                                                            value: -1,
                                                        },
                                                    ]}
                                                    colSpan={5}
                                                    count={rows.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: {
                                                            'aria-label':
                                                                'rows per page',
                                                        },
                                                        native: true,
                                                    }}
                                                    onChangePage={
                                                        handleChangePage
                                                    }
                                                    onChangeRowsPerPage={
                                                        handleChangeRowsPerPage
                                                    }
                                                    ActionsComponent={
                                                        TablePaginationActions
                                                    }
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                            <Box
                                p={2}
                                mt={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Box textAlign='center'>
                                    <Typography variant='h5' component='h5'>
                                        <strong>Checkout Please</strong>
                                    </Typography>
                                </Box>
                                <Box py={2}>
                                    <Divider variant='middle' />
                                </Box>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Sub Total</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            {' '}
                                            <Typography>
                                                {myBag ? myBag.sub_total : 0}{' '}
                                                TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant='middle' />
                                </Box>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Shipping</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                {myBag && myBag.sub_total !== 0 ? 50 : 0}{' '}
                                                TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant='middle' />
                                </Box>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>Total</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                {myBag
                                                    ? myBag.sub_total !== 0
                                                        ? myBag.sub_total + 50
                                                        : 0
                                                    : 0}{' '}
                                                TK.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant='middle' />
                                </Box>
                                <Grid
                                    container
                                    direction='row'
                                    justify='space-between'
                                    alignItems='center'
                                >
                                    <Grid
                                        item
                                        xs={6}
                                        sm={6}
                                        md={6}
                                        lg={6}
                                        xl={6}
                                    >
                                        <Box px={5}>
                                            <Typography>
                                                <strong>Total Payable</strong>
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>
                                                <strong>
                                                    {myBag
                                                        ? myBag.sub_total !== 0
                                                            ? myBag.sub_total +
                                                              50
                                                            : 0
                                                        : 0}{' '}
                                                    TK.
                                                </strong>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box py={1}>
                                    <Divider variant='inset' />
                                </Box>
                                <Box pt={5} textAlign='right'>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleCheckout}
                                    >
                                        <Box textAlign='center' px={4}>
                                            Pay For You
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForBag = async (config) =>
    await axios
        .get(`http://localhost:8000/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

export async function getServerSideProps({ req, params }) {
    const cookies = parseCookies(req);
    const haha_ecom_bangla_token = cookies.haha_ecom_bangla_token
        ? cookies.haha_ecom_bangla_token
        : null;
    // when there have no cookies in browser it will return undefined that is not serializable, thats why set it as null

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };
    const dataBag = await fetchDataForBag(config);

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
        }
    }

    return {
        props: {
            myBag,
            config,
        },
    };
}
