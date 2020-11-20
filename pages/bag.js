import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import ProductTable from '../components/ProductTable';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormikFormDemo from '../components/FormikFormDemo';
import Divider from '@material-ui/core/Divider';

import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { initializeStore } from '../store/store';

const useCounter = () => {
    const getStateProduct = useSelector(
        (state) => state.singleProductReducer.stateProduct
    );
    const dispatch = useDispatch();
    const setStateProduct = (product) =>
        dispatch({
            type: 'GET_PRODUCT',
            payload: product,
        });
    const setTotalBagProduct = (total) =>
        dispatch({
            type: 'TOTAL_BAG_PRODUCT',
            payload: total,
        });

    return { getStateProduct, setStateProduct, setTotalBagProduct };
};

export default function Bag({ myBag, config }) {
    const {
        getStateProduct,
        setStateProduct,
        setTotalBagProduct,
    } = useCounter();
    const router = useRouter();
    console.log('bag e', myBag);

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
                                router.push(`/reciever/${orderId}`);
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
            <ButtonAppBar />
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
                                <ProductTable
                                    myBag={myBag && myBag}
                                    config={config && config}
                                />
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
                                            <Typography>122 TK.</Typography>
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
                                            <Typography>50 TK.</Typography>
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
                                            <Typography>500 TK.</Typography>
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
                                            <Typography>Gift Rapper</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box px={5}>
                                            <Typography>50 TK.</Typography>
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
                                                <strong>550 TK.</strong>
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

    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;

    // dispatch({
    //     type: 'GET_PRODUCT',
    //     payload: dataProduct.product,
    // });

    return {
        props: {
            // initialReduxState: reduxStore.getState(),
            myBag,
            config,
        },
    };
}
