import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductCard from '../components/ProductCard';
import MyReviewedProduct from '../components/MyReviewedProduct';
import NotReviewedProduct from '../components/NotReviewedProduct';
import AccountOptionList from '../components/AccountOptionList';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});
export default function MyReview({
    mainProductReviewed,
    allProductReviewed,
    notReviewedProduct,
}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('0');
    let output;
    if (value === '0') {
        output = (
            <MyReviewedProduct
                mainProductReviewed={mainProductReviewed && mainProductReviewed}
            />
        );
    } else {
        output = (
            <NotReviewedProduct
                notReviewedProduct={notReviewedProduct && notReviewedProduct}
            />
        );
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(allProductReviewed);
    console.log('main', mainProductReviewed);

    console.log('not', notReviewedProduct);
    return (
        <div>
            {' '}
            <Head>
                <title>My Review</title>
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
                                    <Typography variant='h5'>
                                        <strong>My Reviews & Ratings</strong>
                                    </Typography>
                                </Box>
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor='primary'
                                        textColor='primary'
                                        variant='fullWidth'
                                    >
                                        <Tab
                                            label='Reviewed Product'
                                            value='0'
                                        />
                                        <Tab
                                            label='Not Reviewed Product'
                                            value='1'
                                        />
                                    </Tabs>
                                </Paper>

                                {output}
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

const fetchDataForReview = async (config) =>
    await axios
        .get(`http://localhost:8000/reviews-read/`, config)
        .then((res) => ({
            reviews: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForProducts = async () =>
    await axios
        .get(`http://localhost:8000/products/`)
        .then((res) => ({
            products: res.data,
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
    const dataReview = await fetchDataForReview(config);
    const dataProduct = await fetchDataForProducts();

    let reviews = dataReview.reviews;
    let products = dataProduct.products;

    let allProductReviewed = [];
    let mainProductReviewed = [];

    reviews &&
        reviews.forEach((review) => {
            allProductReviewed.push(review.product);
        });
    // console.log(allProductReviewed);

    mainProductReviewed =
        allProductReviewed.length !== 0
            ? mainProductReviewed.concat(allProductReviewed[0])
            : [];

    allProductReviewed &&
        allProductReviewed.forEach((product) => {
            let mainProductReviewedId = [];
            mainProductReviewed.forEach((product) => {
                mainProductReviewedId = mainProductReviewedId.concat(
                    product.id
                );
            });

            if (!mainProductReviewedId.includes(product.id)) {
                mainProductReviewed = mainProductReviewed.concat(product);
            }
        });

    // console.log(mainProductReviewed);

    let allProduct = [];
    products &&
        products.forEach((product) => {
            allProduct.push(product);
        });
    let notReviewedProduct = [];
    allProduct &&
        allProduct.forEach((product) => {
            let mainProductReviewedId = [];
            mainProductReviewed.forEach((product) => {
                mainProductReviewedId = mainProductReviewedId.concat(
                    product.id
                );
            });
            if (!mainProductReviewedId.includes(product.id)) {
                notReviewedProduct = notReviewedProduct.concat(product);
            }
        });

    return {
        props: { mainProductReviewed, allProductReviewed, notReviewedProduct },
    };
}
