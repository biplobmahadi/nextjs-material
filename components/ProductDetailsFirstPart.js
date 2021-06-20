import Head from "next/head";

import Size from "./forms/Size";
import Quantity from "./forms/Quantity";

import AddForTrialDialog from "./AddForTrialDialog";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PaymentIcon from "@material-ui/icons/Payment";
import RestoreIcon from "@material-ui/icons/Restore";
import InfoIcon from "@material-ui/icons/Info";
import RedeemIcon from "@material-ui/icons/Redeem";
import Zoom from "react-medium-image-zoom";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },
    wrapper: {
        position: "relative",
    },
    buttonProgress: {
        color: "#3f50b5",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function ProductDetailsFirstPart(props) {
    const { product, config, avgRating, categoryProducts, myBag } = props;
    const classes = useStyles();
    // const [myBag, setMyBag] = React.useState(props.myBag);
    const [quantity, setQuantity] = React.useState(1);
    const [value, setValue] = React.useState("/s1.jpg");
    // need for product image
    // const [value, setValue] = React.useState(product.product_image[0].image);
    const [loading, setLoading] = React.useState(false);
    const [openForLogin, setOpenForLogin] = React.useState(false);
    const [openForAdd, setOpenForAdd] = React.useState(false);
    const [openForNotInStock, setOpenForNotInStock] = React.useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = React.useState(false);

    const handleImageClick = (value) => {
        setValue(value);
    };

    // this is for alert close
    const handleCloseForLogin = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForLogin(false);
    };
    const handleCloseForAdd = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForAdd(false);
    };
    const handleCloseForNotInStock = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForNotInStock(false);
    };
    const handleCloseForAddAsTrial = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForAddAsTrial(false);
    };

    // productWithQuantityExistInBag made here, because if not exist then trial add not shown
    let productWithQuantityExistInBag;
    if (myBag) {
        productWithQuantityExistInBag = myBag.product_with_quantity.filter(
            (productWithQuantity) =>
                productWithQuantity.product.id === product.id
        );
    }

    const [productWithQuantityInBag, setProductWithQuantityInBag] =
        React.useState(
            productWithQuantityExistInBag &&
                productWithQuantityExistInBag.length !== 0
                ? productWithQuantityExistInBag[0]
                : null
        );

    const handleAddToBag = () => {
        // create a loading
        setLoading(true);

        // above 1 remain for network speed
        // when net speed is low then it will give better user experience
        // now check user login or not
        // if not login then an alert will show

        if (Cookies.get("haha_ecom_bangla_token")) {
            let addToProductWithQuantity = {
                product: product.id,
                quantity: quantity,
                my_bag: myBag.id,
            };

            // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
            // this is very important
            if (productWithQuantityInBag) {
                if (productWithQuantityInBag.add_as_trial) {
                    setLoading(false);
                    setOpenForAddAsTrial(true);
                } else {
                    setOpenForAdd(true);
                    setLoading(false);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantityInBag.id}/`,
                            {
                                quantity:
                                    productWithQuantityInBag.quantity +
                                    quantity, // here state quantity used
                            },
                            config
                        )
                        .then((res) => {
                            console.log("patched product", res.data);
                            setProductWithQuantityInBag(res.data);
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setOpenForAdd(true);
                setLoading(false);
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                        addToProductWithQuantity,
                        config
                    )
                    .then((res) => {
                        console.log("bag nai - pwq", res.data);
                        setProductWithQuantityInBag(res.data);
                    })
                    .catch((err) => console.log(err.response));
            }
        } else {
            // console.log('login first');
            setLoading(false);
            setOpenForLogin(true);
        }
    };

    return (
        <Box mx={3} mt={5} pt={4}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box
                        px={2}
                        pt={2}
                        mt={2}
                        height="100%"
                        borderRadius="borderRadius"
                        style={{ backgroundColor: "white" }}
                    >
                        <Zoom>
                            <img
                                alt="product image"
                                src={value}
                                width="100%"
                                height="320px"
                            />
                        </Zoom>
                        <Box pt={2}>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <img
                                        alt="product image"
                                        src="/s1.jpg"
                                        width="60px"
                                        height="50px"
                                        onClick={() =>
                                            handleImageClick("/s1.jpg")
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        alt="product image"
                                        src="/s2.jpg"
                                        width="60px"
                                        height="50px"
                                        onClick={() =>
                                            handleImageClick("/s2.jpg")
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <img
                                        alt="product image"
                                        src="/s3.jpg"
                                        width="60px"
                                        height="50px"
                                        onClick={() =>
                                            handleImageClick("/s3.jpg")
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </Grid>
                                {/* {product &&
                                    product.product_image &&
                                    product.product_image.map(
                                        (product_image) => (
                                            <Grid item>
                                                <img
                                                    alt='product image'
                                                    src={product_image.image}
                                                    width='60px'
                                                    height='50px'
                                                    onClick={() =>
                                                        handleImageClick(
                                                            product_image.image
                                                        )
                                                    }
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            </Grid>
                                        )
                                    )} */}
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
                    <Box
                        pt={2}
                        px={2}
                        mt={2}
                        height="100%"
                        borderRadius="borderRadius"
                        style={{ backgroundColor: "white" }}
                    >
                        <Typography variant="h5" component="h5">
                            <strong>{product && product.name}</strong>
                        </Typography>
                        <Box pt={1}>
                            <Grid container alignItems="center">
                                <Rating
                                    name="read-only"
                                    value={avgRating !== 0 ? avgRating : null}
                                    readOnly
                                />
                                <span>
                                    <Box pl={1}>
                                        <Typography> |</Typography>
                                    </Box>
                                </span>
                                <span>
                                    <Box pl={1}>
                                        <Typography>
                                            {" "}
                                            {product &&
                                                product.review.length}{" "}
                                            Review
                                        </Typography>
                                    </Box>
                                </span>
                                <span>
                                    <Box pl={1}>
                                        <Typography> |</Typography>
                                    </Box>
                                </span>
                                <span>
                                    <Box pl={1}>
                                        <Typography>
                                            {" "}
                                            {product &&
                                                product.video_review
                                                    .length}{" "}
                                            Video Review
                                        </Typography>
                                    </Box>
                                </span>
                            </Grid>
                        </Box>
                        <Box py={3}>
                            <Typography>
                                <strong>Brand:</strong>{" "}
                                {product && product.brand.brand_name}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" component="h4">
                                <strong>Tk. {product && product.price}</strong>
                            </Typography>
                        </Box>
                        <Box pt={3}>
                            {/* {product && product.has_size && (
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm>
                                        <Size />
                                    </Grid>
                                    <Grid item xs={12} sm>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >
                                            <Box textAlign="center" px={2}>
                                                Size Guide
                                            </Box>
                                        </Button>
                                    </Grid>
                                </Grid>
                            )} */}
                        </Box>
                        <Box pt={2}>
                            <Grid container spacing={2} alignItems="center">
                                {/* <Grid item xs={12} sm>
                                    <Quantity setQuantity={setQuantity} />
                                </Grid> */}
                                <Grid item xs={12} sm>
                                    {product && product.is_available ? (
                                        <Chip
                                            label="In Stock"
                                            color="primary"
                                            size="small"
                                        />
                                    ) : (
                                        <Chip
                                            label="Not In Stock"
                                            color="secondary"
                                            size="small"
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                        <Box pt={6}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <div className={classes.root}>
                                        <div className={classes.wrapper}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleAddToBag}
                                                disabled={
                                                    loading ||
                                                    (product &&
                                                        !product.is_available)
                                                }
                                            >
                                                <Box textAlign="center" px={4}>
                                                    Add To Bag
                                                </Box>
                                            </Button>
                                            {loading && (
                                                <CircularProgress
                                                    size={24}
                                                    className={
                                                        classes.buttonProgress
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        open={openForLogin}
                                        autoHideDuration={2000}
                                        onClose={handleCloseForLogin}
                                    >
                                        <Alert severity="info" variant="filled">
                                            Please Login First!
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        open={openForAdd}
                                        autoHideDuration={2000}
                                        onClose={handleCloseForAdd}
                                    >
                                        <Alert
                                            severity="success"
                                            variant="filled"
                                        >
                                            Successfully Product Added To Bag!
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        open={openForAddAsTrial}
                                        autoHideDuration={2000}
                                        onClose={handleCloseForAddAsTrial}
                                    >
                                        <Alert severity="info" variant="filled">
                                            Already Add as Trial, Can't Add
                                            More!
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        open={openForNotInStock}
                                        autoHideDuration={2000}
                                        onClose={handleCloseForNotInStock}
                                    >
                                        <Alert severity="info" variant="filled">
                                            Sorry, Product Not In Stock Now!
                                        </Alert>
                                    </Snackbar>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {product &&
                                        product.has_trial &&
                                        productWithQuantityInBag && (
                                            <AddForTrialDialog
                                                categoryProducts={
                                                    categoryProducts
                                                }
                                                config={config}
                                                myBag={myBag}
                                            />
                                        )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <Box height="100%">
                        <Box
                            p={2}
                            mt={2}
                            borderRadius="borderRadius"
                            style={{ backgroundColor: "white" }}
                        >
                            <Box pb={1}>
                                <Typography variant="h5" component="h5">
                                    <strong>Gift With This</strong>
                                </Typography>
                            </Box>
                            {product &&
                                product.you_will_get.map((youWillGet) => (
                                    <Box pt={1}>
                                        <Grid container alignItems="center">
                                            <RedeemIcon color="secondary" />
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
                                                        {youWillGet.gift}
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                ))}

                            {product && product.you_will_get.length === 0 && (
                                <Box pt={1}>
                                    <Alert severity="error">
                                        <AlertTitle>Sorry Dear</AlertTitle>
                                        No Gift Included With This Product Yet —{" "}
                                        <strong>
                                            Hope Gift Will Include Soon!
                                        </strong>
                                    </Alert>
                                </Box>
                            )}
                        </Box>

                        <Box
                            p={2}
                            mt={2}
                            borderRadius="borderRadius"
                            style={{ backgroundColor: "white" }}
                        >
                            <Box pb={1}>
                                <Typography variant="h5" component="h5">
                                    <strong>Information</strong>
                                </Typography>
                            </Box>
                            {product &&
                                product.product_info.map((productInfo) => (
                                    <Box pt={1}>
                                        <Grid container alignItems="center">
                                            <InfoIcon color="secondary" />
                                            <span>
                                                <Box pl={2}>
                                                    <Typography>
                                                        {" "}
                                                        {productInfo.info}
                                                    </Typography>
                                                </Box>
                                            </span>
                                        </Grid>
                                    </Box>
                                ))}

                            <Box pt={1}>
                                <Grid container alignItems="center">
                                    <PaymentIcon color="secondary" />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {" "}
                                                Cash On Delivery
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                            <Box pt={1}>
                                <Grid container alignItems="center">
                                    <AccountBalanceWalletIcon color="secondary" />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {" "}
                                                50 TK. Delivery
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                            <Box pt={1}>
                                <Grid container alignItems="center">
                                    <RestoreIcon color="secondary" />
                                    <span>
                                        <Box pl={2}>
                                            <Typography>
                                                {" "}
                                                7 Days Happy Return
                                            </Typography>
                                        </Box>
                                    </span>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
