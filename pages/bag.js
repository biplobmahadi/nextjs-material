import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductWithQuantityInBag from '../components/ProductWithQuantityInBag';
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
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Snackbar from '@material-ui/core/Snackbar';

import Cookies from 'js-cookie';
import { useEffect } from 'react';

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
    const [reRender, setReRender] = React.useState(false);

    let myBag = myBagRe ? myBagRe : props.myBag;
    let config = props.config;
    let rows = myBag ? myBag.product_with_quantity : [];

    const changeMyBag = (value) => {
        myBagRe = value;
        // console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // console.log('bag e', myBag);
    // console.log('bag e Re', myBagRe);

    // here useEffect -> when component mount and update myBagRe will undefined
    // because, when we change route then myBagRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag will server rendered

    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
        myBagRe = undefined;
    });

    const handleCheckout = () => {
        if (myBag) {
            if (myBag.product_with_quantity.length !== 0) {
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/my-order/`,
                        {
                            my_bag: myBag.id,
                            total: myBag.sub_total,
                            total_payable: myBag.sub_total + 50,
                        },
                        config
                    )
                    .then((res) => {
                        // console.log(res.data);
                        // this.setState({ orderId: res.data.id });
                        let orderCode = res.data.order_code;
                        axios
                            .patch(
                                `${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/${myBag.id}/`,
                                { is_send_to_my_order: true },
                                config
                            )
                            .then((res) => {
                                // console.log(res.data);
                                router.push(`/receiver/${orderCode}`);
                            })
                            .catch((err) => {
                                console.log(err.response);
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

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box pt={11} px={3}>
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
                                                        ? myBag
                                                              .product_with_quantity
                                                              .length
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
                            {rows.length === 0 ? (
                                <Box pt={2}>
                                    <Alert severity='error'>
                                        <AlertTitle>Sorry Dear</AlertTitle>
                                        You Have No Product In Your Bag Yet —{' '}
                                        <strong>
                                            Hope You Will Add Product In Your
                                            Bag Soon!
                                        </strong>
                                    </Alert>
                                </Box>
                            ) : (
                                <ProductWithQuantityInBag
                                    myBag={myBag}
                                    rows={rows}
                                    config={config}
                                    changeMyBag={changeMyBag}
                                />
                            )}
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
                                                {myBag && myBag.sub_total !== 0
                                                    ? 50
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
                                        disabled={
                                            !myBag ||
                                            (myBag &&
                                                myBag.product_with_quantity
                                                    .length === 0)
                                        }
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
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`, config)
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
