import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductDetails from '../components/ProductDetails';
import Size from '../components/forms/Size';
import Quantity from '../components/forms/Quantity';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PaymentIcon from '@material-ui/icons/Payment';
import RestoreIcon from '@material-ui/icons/Restore';
import InfoIcon from '@material-ui/icons/Info';
import RedeemIcon from '@material-ui/icons/Redeem';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ReactImageMagnify from 'react-image-magnify';
import Zoom from 'react-medium-image-zoom';
import axios from 'axios';

import ReactImageZoom from 'react-image-zoom';
import { Button } from '@material-ui/core';

export default function Product({ products, error }) {
    const [value, setValue] = React.useState('/s1.jpg');
    const handleImageClick = (value) => {
        setValue(value);
    };
    console.log('here', { products, error });
    return (
        <div>
            <Head>
                <title>Product Details - {products && products.name}</title>
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
                <Box mx={3} mt={6} pt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                            <Box
                                px={2}
                                pt={2}
                                mt={2}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Zoom>
                                    <img
                                        alt='that wanaka tree'
                                        src={value}
                                        width='100%'
                                        height='100%'
                                    />
                                </Zoom>
                                <Box pt={2}>
                                    <Grid
                                        container
                                        spacing={2}
                                        direction='row'
                                        justify='center'
                                        alignItems='center'
                                    >
                                        <Grid item>
                                            <img
                                                alt='that wanaka tree'
                                                src='/s1.jpg'
                                                width='60px'
                                                height='50px'
                                                onClick={() =>
                                                    handleImageClick('/s1.jpg')
                                                }
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <img
                                                alt='that wanaka tree'
                                                src='/s2.jpg'
                                                width='60px'
                                                height='50px'
                                                onClick={() =>
                                                    handleImageClick('/s2.jpg')
                                                }
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <img
                                                alt='that wanaka tree'
                                                src='/s3.jpg'
                                                width='60px'
                                                height='50px'
                                                onClick={() =>
                                                    handleImageClick('/s3.jpg')
                                                }
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                            <Box
                                pt={2}
                                px={2}
                                mt={2}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h5' component='h5'>
                                    <strong>{products && products.name}</strong>
                                </Typography>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <StarIcon color='secondary' />
                                        <span>
                                            <Box pl={1}>
                                                <Typography> |</Typography>
                                            </Box>
                                        </span>
                                        <span>
                                            <Box pl={1}>
                                                <Typography>
                                                    {' '}
                                                    8 Ratings & Reviews
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box py={3}>
                                    <Typography>
                                        <strong>Product Code:</strong>{' '}
                                        {products && products.code}
                                    </Typography>

                                    <Typography>
                                        <strong>Brand:</strong> {products && products.brand.brand_name}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant='h4' component='h4'>
                                        <strong>
                                            Tk. {products && products.price}
                                        </strong>
                                    </Typography>
                                </Box>
                                <Box pt={3}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems='center'
                                    >
                                        <Grid item xs={12} sm>
                                            <Size />
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                size='small'
                                            >
                                                <Box textAlign='center' px={2}>
                                                    Size Guide
                                                </Box>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box pt={2}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems='center'
                                    >
                                        <Grid item xs={12} sm>
                                            <Quantity />
                                        </Grid>
                                        <Grid item xs={12} sm>
                                            <Chip
                                                label='In Stock'
                                                color='secondary'
                                                size='small'
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box pt={3}>
                                    <Button variant='contained' color='primary'>
                                        <Box textAlign='center' px={4}>
                                            Add To Bag
                                        </Box>
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                            <Box
                                p={2}
                                mt={2}
                                height='100%'
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h5' component='h5'>
                                    <strong>You Will Get</strong>
                                </Typography>
                                <Box pt={2}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    1 Ti-Shirt
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    1 Galaxy A50
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <RedeemIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    2 Lottery
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box py={2}>
                                    <Divider variant='middle' />
                                </Box>
                                <Typography variant='h5' component='h5'>
                                    <strong>Information</strong>
                                </Typography>
                                <Box pt={2}>
                                    <Grid container alignItems='center'>
                                        <InfoIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    6 Months Warranty
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <PaymentIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    Cash On Delivery
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <AccountBalanceWalletIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    50 TK. Delivery
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                                <Box pt={1}>
                                    <Grid container alignItems='center'>
                                        <RestoreIcon color='secondary' />
                                        <span>
                                            <Box pl={2}>
                                                <Typography>
                                                    {' '}
                                                    7 Days Happy Return
                                                </Typography>
                                            </Box>
                                        </span>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <ProductDetails />
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForPaths = async () =>
    await axios
        .get('http://localhost:8000/products/')
        .then((res) => ({
            products: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));
const fetchDataForProps = async (params) =>
    await axios
        .get(`http://localhost:8000/products/${params.slug}/`)
        .then((res) => ({
            products: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));
// res data products must be same name for paths and props
export async function getStaticPaths() {
    const data = await fetchDataForPaths();

    const paths = data.products.map((product) => ({
        params: { slug: product.slug },
    }));

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const data = await fetchDataForProps(params);

    return { props: data, revalidate: 1 };
}
