import Head from "next/head";
import ButtonAppBar from "../../components/ButtonAppBar";
import ProductCard from "../../components/ProductCard";
import AllProducts from "../../components/AllProducts";
import FilterProductDialog from "../../components/FilterProductDialog";
import MainFooter from "../../components/MainFooter";
import FilterProduct from "../../components/FilterProduct";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { boxSizing } from "@material-ui/system";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Rating from "@material-ui/lab/Rating";

import parseCookies from "../../lib/parseCookies";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up("xl")]: {
            marginRight: theme.spacing(5),
        },
    },
    boot: {
        [theme.breakpoints.up("xl")]: {
            marginLeft: theme.spacing(4),
        },
    },
}));

export default function Category({ category, myBag, config }) {
    const classes = useStyles();

    const [priceFilter100TK, setPriceFilter100TK] = React.useState(0);
    const [priceFilter500TK, setPriceFilter500TK] = React.useState(0);
    const [priceFilter1000TK, setPriceFilter1000TK] = React.useState(0);
    const [priceFilter2000TK, setPriceFilter2000TK] = React.useState(0);
    const [priceFilter5000TK, setPriceFilter5000TK] = React.useState(0);

    // useEffect(() => {

    // });

    // console.log('my bag 1st ', myBag);
    // console.log('my bag Re ', myBagRe);
    // console.log('category', category);

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

    let allProducts =
        category && category.product.length !== 0 ? category.product : [];
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
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 500 && product.price <= 1000)
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
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 1000 && product.price <= 2000)
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
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 100 && product.price <= 1000
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price >= 100 && product.price <= 500) ||
                (product.price >= 1000 && product.price <= 2000)
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price >= 100 && product.price <= 500) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 500 && product.price <= 2000
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price >= 500 && product.price <= 1000) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 1000 && product.price <= 5000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price > 0 && product.price <= 1000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 500) ||
                (product.price >= 1000 && product.price <= 2000)
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 500) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 500 && product.price <= 2000)
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 500 && product.price <= 1000) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 1000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 100 && product.price <= 2000
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price >= 100 && product.price <= 1000) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price >= 100 && product.price <= 500) ||
                (product.price >= 1000 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 500 && product.price <= 5000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        !priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price > 0 && product.price <= 2000
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        !priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 1000) ||
                (product.price >= 2000 && product.price <= 5000)
        );
    } else if (
        priceFilter100TK &&
        priceFilter500TK &&
        !priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 500) ||
                (product.price >= 1000 && product.price <= 5000)
        );
    } else if (
        priceFilter100TK &&
        !priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) =>
                (product.price > 0 && product.price <= 100) ||
                (product.price >= 500 && product.price <= 5000)
        );
    } else if (
        !priceFilter100TK &&
        priceFilter500TK &&
        priceFilter1000TK &&
        priceFilter2000TK &&
        priceFilter5000TK
    ) {
        products = allProducts.filter(
            (product) => product.price >= 100 && product.price <= 5000
        );
    } else {
        products = allProducts;
    }

    // console.log('products', products);

    return (
        <div>
            <Head>
                <title>
                    Category - {category ? category.category_name : "Not Valid"}
                </title>
                <link rel="icon" href="/a.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
            {!category ? (
                <Box
                    textAlign="center"
                    pt={18}
                    pb={12}
                    style={{ backgroundColor: "#E6E6FA" }}
                >
                    <Typography variant="h4">
                        <strong>Sorry - There have nothing !</strong>
                    </Typography>
                </Box>
            ) : (
                <Box pb={8} style={{ backgroundColor: "#E6E6FA" }}>
                    <Box pt={11} px={3}>
                        <Box
                            py={2}
                            borderRadius="borderRadius"
                            style={{ backgroundColor: "white" }}
                            textAlign="center"
                        >
                            <Typography variant="h5" component="h5">
                                <strong>
                                    {category && category.category_name}
                                </strong>
                            </Typography>
                        </Box>
                        <Hidden lgUp>
                            <Box mt={2}>
                                <FilterProductDialog
                                    setPriceFilter100TK={setPriceFilter100TK}
                                    setPriceFilter500TK={setPriceFilter500TK}
                                    setPriceFilter1000TK={setPriceFilter1000TK}
                                    setPriceFilter2000TK={setPriceFilter2000TK}
                                    setPriceFilter5000TK={setPriceFilter5000TK}
                                    handlePriceFilter100TK={
                                        handlePriceFilter100TK
                                    }
                                    handlePriceFilter500TK={
                                        handlePriceFilter500TK
                                    }
                                    handlePriceFilter1000TK={
                                        handlePriceFilter1000TK
                                    }
                                    handlePriceFilter2000TK={
                                        handlePriceFilter2000TK
                                    }
                                    handlePriceFilter5000TK={
                                        handlePriceFilter5000TK
                                    }
                                />
                            </Box>
                        </Hidden>

                        <Box mt={2}>
                            <Grid container spacing={3}>
                                <Hidden mdDown>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={3}
                                        md={4}
                                        lg={3}
                                        xl={3}
                                    >
                                        <Box
                                            style={{
                                                backgroundColor: "white",
                                            }}
                                            p={3}
                                            className={classes.root}
                                            borderRadius="borderRadius"
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="h6"
                                            >
                                                Filter by Price
                                            </Typography>
                                            <FormControl component="fieldset">
                                                <FormGroup
                                                    aria-label="position"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={100}
                                                                color="secondary"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handlePriceFilter100TK(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label="Tk. 0 - 100"
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    aria-label="position"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={500}
                                                                color="secondary"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handlePriceFilter500TK(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label="Tk. 100 - 500"
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    aria-label="position"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={1000}
                                                                color="secondary"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handlePriceFilter1000TK(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label="Tk. 500 - 1000"
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    aria-label="position"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={2000}
                                                                color="secondary"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handlePriceFilter2000TK(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label="Tk. 1000 - 2000"
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                                <FormGroup
                                                    aria-label="position"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={5000}
                                                                color="secondary"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    handlePriceFilter5000TK(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label="Tk. 2000 - 5000"
                                                        labelPlacement="end"
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Hidden>

                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={9}
                                    xl={9}
                                >
                                    <Box className={classes.boot}>
                                        <AllProducts
                                            products={products}
                                            myBag={myBag}
                                            config={config}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            )}

            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

const fetchDataForBags = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, config)
        .then((res) => ({
            bags: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForBagCreate = async (config) =>
    await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bags/`, {}, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForCategory = async (params) =>
    await axios
        .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/category/${params.categorySlug}/`
        )
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
            Authorization: "Token " + haha_ecom_bangla_token,
        },
    };

    const dataBags = await fetchDataForBags(config);

    // ###### Here for bag
    // always create bag first if this page has add to bag available
    // it's not good to create bag again again for visiting this page
    // if user already has an non order bag then find that, there have many in worst case, so find the 1st one
    // if user have no non order bag then create one bag for this user
    // if user not logged in then also they can view this page, so here we don't
    // get any bag and user, so myBag will null in this case -> no bug will occur
    let myBag = null;
    if (dataBags.bags && dataBags.bags.length !== 0) {
        let allMyBag = dataBags.bags;
        myBag = allMyBag[0];
    } else if (dataBags.bags && dataBags.bags.length === 0) {
        const dataBagCreate = await fetchDataForBagCreate(config);
        myBag = dataBagCreate.bag;
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
