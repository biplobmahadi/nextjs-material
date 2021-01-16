import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductCard from '../components/ProductCard';
import FilterProductDialog from '../components/FilterProductDialog';
import MainFooter from '../components/MainFooter';
import FilterProduct from '../components/FilterProduct';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { boxSizing } from '@material-ui/system';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Rating from '@material-ui/lab/Rating';

import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('xl')]: {
            marginRight: theme.spacing(5),
        },
    },
    boot: {
        [theme.breakpoints.up('xl')]: {
            marginLeft: theme.spacing(4),
        },
    },
}));

// 1. when anything change on state the component will re render
// 2. we use useEffect only if we need anything to do before component mount or willmount
// 3. these two are most important about react component
// 4. Don't depend on state for data, which related to backend. because state can be changed from devtools
//    if state change then in server everything will be changed which is too harmful..
// 5. we can't change component props. so this is secure
// 6. formik to get form value, here also no need to use state.

let myBagRe;
let categoryProductsRe;

export default function Category(props) {
    const classes = useStyles();
    const [priceFilter100TK, setPriceFilter100TK] = React.useState(0);
    const [priceFilter500TK, setPriceFilter500TK] = React.useState(0);
    const [priceFilter1000TK, setPriceFilter1000TK] = React.useState(0);
    const [priceFilter2000TK, setPriceFilter2000TK] = React.useState(0);
    const [priceFilter5000TK, setPriceFilter5000TK] = React.useState(0);
    const [reRender, setReRender] = React.useState(false);

    const { config } = props;
    let category = categoryProductsRe ? categoryProductsRe : props.category;

    let myBag = myBagRe ? myBagRe : props.myBag;

    const changeCategoryProducts = (value) => {
        categoryProductsRe = value;

        // setReRender(!reRender);
    };
    const changeMyBag = (value) => {
        myBagRe = value;
        console.log('my bag now', myBagRe);

        setReRender(!reRender);
    };

    // here useEffect -> when component mount and update myBagRe will undefined
    // because, when we change route then myBagRe again remain previous one which is not
    // updated one, that's why we make it undefined and bag will server rendered

    useEffect(() => {
        myBagRe = undefined;
        categoryProductsRe = undefined;
    });

    console.log('my bag 1st ', myBag);
    console.log('my bag Re ', myBagRe);
    console.log('category', category);

    const handlePriceFilter100TK = (event) => {
        setPriceFilter100TK(event.target.checked ? event.target.value : 0);
    };
    const handlePriceFilter500TK = (event) => {
        setPriceFilter500TK(event.target.checked ? event.target.value : 0);
    };
    const handlePriceFilter1000TK = (event) => {
        setPriceFilter1000TK(event.target.checked ? event.target.value : 0);
    };
    const handlePriceFilter2000TK = (event) => {
        setPriceFilter2000TK(event.target.checked ? event.target.value : 0);
    };
    const handlePriceFilter5000TK = (event) => {
        setPriceFilter5000TK(event.target.checked ? event.target.value : 0);
    };

    let allProducts = category ? category.product : [];
    let products;

    if (
        priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price > 0 && product.price <= 100
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 100 && product.price <= 500
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 500 && product.price <= 1000
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 1000 && product.price <= 2000
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 2000 && product.price <= 5000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price > 0 && product.price <= 500
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                product.price > 0 &&
                product.price <= 100 &&
                product.price >= 500 &&
                product.price <= 1000
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                product.price > 0 &&
                product.price <= 100 &&
                product.price >= 1000 &&
                product.price <= 2000
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                product.price > 0 &&
                product.price <= 100 &&
                product.price >= 2000 &&
                product.price <= 5000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 2000 && product.price <= 5000
        );
    } else if (priceFilter100TK && priceFilter500TK) {
        products = allProducts.filter(
            (product) => product.price > 0 && product.price <= 500
        );
    } else {
        products = allProducts;
    }

    console.log('products', products);
    console.log('priceFilter100TK', priceFilter100TK);
    console.log('priceFilter500TK', priceFilter500TK);
    return (
        <div>
            <Head>
                <title>
                    Catergories - {category && category.category_name}
                </title>
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
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={8} pt={3} px={3}>
                    <Box
                        py={2}
                        borderRadius='borderRadius'
                        style={{ backgroundColor: 'white' }}
                        textAlign='center'
                    >
                        <Typography variant='h4' component='h4'>
                            {category && category.category_name}
                        </Typography>
                    </Box>
                    <Hidden lgUp>
                        <Box mt={2}>
                            <FilterProductDialog />
                        </Box>
                    </Hidden>

                    <Box mt={2}>
                        <Grid container spacing={3}>
                            <Hidden mdDown>
                                <Grid item xs={12} sm={3} md={4} lg={3} xl={3}>
                                    <Box
                                        style={{ backgroundColor: 'white' }}
                                        p={3}
                                        className={classes.root}
                                        borderRadius='borderRadius'
                                    >
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h6'
                                        >
                                            Filter by Price
                                        </Typography>
                                        <FormControl component='fieldset'>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            value={100}
                                                            color='secondary'
                                                            onClick={(event) =>
                                                                handlePriceFilter100TK(
                                                                    event
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label='Tk. 0 - 100'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            value={500}
                                                            color='secondary'
                                                            onClick={(event) =>
                                                                handlePriceFilter500TK(
                                                                    event
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label='Tk. 100 - 500'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value={1000}
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 500 - 1000'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value={2000}
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 1000 - 2000'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value={5000}
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label='Tk. 2000 - 5000'
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>

                                    <Box
                                        style={{ backgroundColor: 'white' }}
                                        mt={3}
                                        p={3}
                                        className={classes.root}
                                        borderRadius='borderRadius'
                                    >
                                        <Typography
                                            gutterBottom
                                            variant='h6'
                                            component='h6'
                                        >
                                            Filter by Ratings
                                        </Typography>
                                        <FormControl component='fieldset'>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <Rating
                                                            name='read-only'
                                                            value={5}
                                                            readOnly
                                                        />
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <Rating
                                                            name='read-only'
                                                            value={4}
                                                            readOnly
                                                        />
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <Rating
                                                            name='read-only'
                                                            value={3}
                                                            readOnly
                                                        />
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <Rating
                                                            name='read-only'
                                                            value={2}
                                                            readOnly
                                                        />
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                            <FormGroup
                                                aria-label='position'
                                                row
                                            >
                                                <FormControlLabel
                                                    value='end'
                                                    control={
                                                        <Checkbox color='secondary' />
                                                    }
                                                    label={
                                                        <Rating
                                                            name='read-only'
                                                            value={1}
                                                            readOnly
                                                        />
                                                    }
                                                    labelPlacement='end'
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Hidden>

                            <AllProductsForCategorySlug
                                products={products}
                                myBag={myBag}
                                changeMyBag={changeMyBag}
                                changeCategoryProducts={changeCategoryProducts}
                                config={config}
                            />
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
        .get(`http://localhost:8000/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForCategory = async (params) =>
    await axios
        .get(`http://localhost:8000/category/${params.categorySlug}/`)
        .then((res) => ({
            category: res.data,
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

    const dataCategory = await fetchDataForCategory(params);
    const category = dataCategory.category ? dataCategory.category : null;

    return {
        props: {
            category,
            myBag,
            config,
        },
    };
}
