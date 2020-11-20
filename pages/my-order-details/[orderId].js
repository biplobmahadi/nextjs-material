import Head from 'next/head';
import ButtonAppBar from '../../components/ButtonAppBar';
import MainFooter from '../../components/MainFooter';
import OrderDetails from '../../components/OrderDetails';
import ReceiverAddress from '../../components/ReceiverAddress';
import OrderedProduct from '../../components/OrderedProduct';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountOptionList from '../../components/AccountOptionList';
import parseCookies from '../../lib/parseCookies';
import axios from 'axios';

import Hidden from '@material-ui/core/Hidden';
import TrackingStepper from '../../components/TrackingStepper';
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});
export default function MyOrderDetails({ order }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('0');
    let output;
    if (value === '0') {
        output = <OrderDetails order={order && order} />;
    } else if (value === '1') {
        output = <ReceiverAddress order={order && order} />;
    } else {
        output = <OrderedProduct order={order && order} />;
    }

    console.log(order);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            {' '}
            <Head>
                <title>My Order Details</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
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
                            <strong>BIPLOB MAHADI</strong>
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
                                                <strong>
                                                    My Orders Details
                                                </strong>{' '}
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant='contained'
                                                size='small'
                                            >
                                                <Box px={3}>
                                                    Order ID: {order.id}
                                                </Box>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box
                                    p={2}
                                    mt={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <TrackingStepper order={order && order} />
                                </Box>
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor='primary'
                                        textColor='primary'
                                        variant='fullWidth'
                                        centered
                                    >
                                        <Tab label='Order Details' value='0' />
                                        <Tab
                                            label='Receiver Address'
                                            value='1'
                                        />
                                        <Tab
                                            label='Ordered Products'
                                            value='2'
                                        />
                                    </Tabs>
                                </Paper>
                                <Box
                                    mt={2}
                                    p={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    {output}
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

const fetchDataForOrder = async (params, config) =>
    await axios
        .get(`http://localhost:8000/my-order/${params.orderId}/`, config)
        .then((res) => ({
            order: res.data,
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
    const dataOrder = await fetchDataForOrder(params, config);

    // let myOrders = dataOrder.orders;

    return {
        props: dataOrder,
    };
}
