import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import ProductTable from '../components/ProductTable';
import OrderCard from '../components/OrderCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountOptionList from '../components/AccountOptionList';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.only('xs')]: {
            textAlign: 'center',
        },
    },
}));

export default function MyOrders({ orders, myBag, user }) {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
    }, []);

    console.log(orders);
    return (
        <div>
            <Head>
                <title>My Orders</title>
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
                <Box mt={8} pt={3} px={3}>
                    <Box
                        p={2}
                        boxShadow={1}
                        textAlign='center'
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                    >
                        <img
                            src='/aa.jpg'
                            alt=''
                            srcset=''
                            height='60'
                            width='60'
                            style={{ borderRadius: '50%' }}
                        />
                        <Typography variant='h5'>
                            <strong>
                                {user &&
                                    user.first_name.toUpperCase() +
                                        ' ' +
                                        user.last_name.toUpperCase()}
                            </strong>
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={3}>
                            <Hidden lgDown>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={3}
                                >
                                    <Box
                                        p={1}
                                        boxShadow={1}
                                        borderRadius='borderRadius'
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <AccountOptionList />
                                    </Box>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Box
                                    p={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                    className={classes.root}
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
                                            <Typography
                                                variant='h5'
                                                component='h5'
                                            >
                                                <strong>My Orders</strong>{' '}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                size='small'
                                            >
                                                <Box px={3}>
                                                    Total: {orders.length}
                                                </Box>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box mt={2}>
                                    <Grid container spacing={3}>
                                        {orders.length !== 0 &&
                                            orders.map((myOrder) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                    lg={4}
                                                    xl={4}
                                                >
                                                    <OrderCard
                                                        myOrder={myOrder}
                                                    />
                                                </Grid>
                                            ))}
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
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

const fetchDataForUser = async (config) =>
    await axios
        .get('http://localhost:8000/rest-auth/user/', config)
        .then((res) => ({
            user: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForOrder = async (config) =>
    await axios
        .get(`http://localhost:8000/my-order/`, config)
        .then((res) => ({
            orders: res.data,
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
            // We got exact bag for user
            // 1st we filter out the bags whose not send to my order
            // then there have many bags for that user because of backend, hacker can do anything!!
            // the 1st created one is selected as myBag
        }
    }

    const dataOrder = await fetchDataForOrder(config);

    const orders = dataOrder.orders ? dataOrder.orders : null;

    const dataUser = await fetchDataForUser(config);
    const user = dataUser.user ? dataUser.user : null;

    return {
        props: { orders, myBag, user },
    };
}
