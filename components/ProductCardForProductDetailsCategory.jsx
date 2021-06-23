import Link from "../src/Link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    boot: {
        maxWidth: "100%",
    },
    imgHover: {
        overflow: "hidden",
    },
    imgHoverZoom: {
        transition: "transform .5s ease",
        "&:hover": { transform: "scale(1.1)" },
    },
    root: {
        display: "flex",
        alignItems: "center",
    },
    wrapper: {
        margin: theme.spacing(1),
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

export default function ProductCardForProductDetailsCategory({
    product,
    myBag,
    config,
    needDisabled,
    setNeedDisabled,
    categoryProductsWithQuantityExistInBag,
    setCategoryProductsWithQuantityExistInBag,
}) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [openForLogin, setOpenForLogin] = useState(false);
    const [openForAdd, setOpenForAdd] = useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = useState(false);

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

    const handleCloseForAddAsTrial = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForAddAsTrial(false);
    };

    // we get all categoryProductsWithQuantityExistInBag
    // now check this productWithQuantity exist in bag or not
    // if exist then no need to add this as trial
    const productWithQuantityExist =
        categoryProductsWithQuantityExistInBag &&
        categoryProductsWithQuantityExistInBag.length !== 0 &&
        categoryProductsWithQuantityExistInBag.filter(
            (productWithQuantityInBag) =>
                productWithQuantityInBag.product.id === product.id ||
                productWithQuantityInBag.product === product.id
            // ######### VVI
            // here we need to add two type filter
            // 1st, when we get categoryProductsWithQuantityExistInBag,
            // here productWithQuantityInBag has product details object
            // but when we set categoryProductsWithQuantityExistInBag after adding new productWithQuantity,
            // then the post method only give productId as product with productWithQuantity
        );
    const productWithQuantityInBag =
        productWithQuantityExist && productWithQuantityExist.length !== 0
            ? productWithQuantityExist[0]
            : null;

    // console.log("productWithQuantityInBag", productWithQuantityInBag);

    const handleAddToBag = () => {
        // start loading
        setLoading(true);
        // others will disabled when add specific one
        setNeedDisabled(true);

        // above 2 remain for network speed
        // when net speed is low then it will give better user experience
        // now check user login or not
        // if not login then an alert will show

        if (Cookies.get("haha_ecom_bangla_token")) {
            let addToProductWithQuantity = {
                product: product.id,
                quantity: 1,
                my_bag: myBag.id,
            };

            // ############ Adding in bag for product
            //
            // ################ this product also depends on trial products,
            // so create a common state for this and trial and after post or patch update the common state
            //
            // we mainly just add productWithQuantity with bag id, we implement it in backend
            // if productWithQuantityInBag then need to patch it, obvoisly check is it add_as_trial
            // if already add_as_trial then no need to add this quantity with that productWithQuantity's quantity
            // if there have no productWithQuantityInBag, then just post it
            if (productWithQuantityInBag) {
                if (productWithQuantityInBag.add_as_trial) {
                    setLoading(false);
                    setNeedDisabled(false);
                    setOpenForAddAsTrial(true);
                } else {
                    setOpenForAdd(true);
                    setLoading(false);
                    setNeedDisabled(false);
                    axios
                        .patch(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantityInBag.id}/`,
                            {
                                quantity: productWithQuantityInBag.quantity + 1,
                                // everytime quantity will add by 1, here user can't set quantity
                            },
                            config
                        )
                        .then((res) => {
                            console.log("patched product", res.data);
                            const newCategoryProductsWithQuantityExistInBag =
                                categoryProductsWithQuantityExistInBag.map(
                                    (productWithQuantity) => {
                                        if (
                                            productWithQuantity.id ===
                                            res.data.id
                                        ) {
                                            productWithQuantity = res.data;
                                        }
                                        return productWithQuantity;
                                    }
                                );
                            setCategoryProductsWithQuantityExistInBag(
                                newCategoryProductsWithQuantityExistInBag
                            );
                            // when patch it, then just change this object using mapping all
                            // finally return new array and set it as state
                        })
                        .catch((err) => console.log(err.response));
                }
            } else {
                setOpenForAdd(true);
                setLoading(false);
                setNeedDisabled(false);
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                        addToProductWithQuantity,
                        config
                    )
                    .then((res) => {
                        console.log("bag nai - pwq", res.data);
                        setCategoryProductsWithQuantityExistInBag((prevState) =>
                            prevState.concat(res.data)
                        );
                        // just when post new, then concat it with previous all
                    })
                    .catch((err) => console.log(err.response));
            }
        } else {
            setLoading(false);
            setNeedDisabled(false);
            setOpenForLogin(true);
        }
    };

    return (
        <Card className={classes.boot}>
            <Link
                href={`/product/${product && product.slug}`}
                color="inherit"
                underline="none"
            >
                <CardActionArea>
                    <Box className={classes.imgHover} p={2}>
                        <CardMedia
                            className={classes.imgHoverZoom}
                            component="img"
                            alt="Product"
                            height="180"
                            // image={product.product_image[0].image}
                            image="/s2.jpg"
                            title="Product"
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom>
                            <Box textAlign="center">
                                {product && product.name}
                            </Box>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h6">
                            <Box textAlign="center">
                                Tk. {product && product.price}
                            </Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <Box pb={1}>
                <CardActions style={{ justifyContent: "center" }}>
                    <div className={classes.root}>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={handleAddToBag}
                                disabled={
                                    needDisabled ||
                                    loading ||
                                    !product.is_available
                                }
                            >
                                <Box textAlign="center" px={4}>
                                    {product.is_available
                                        ? "Add To Bag"
                                        : "No Stock"}
                                </Box>
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
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
                        <Alert severity="success" variant="filled">
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
                            Already Add as Trial, Can't Add More!
                        </Alert>
                    </Snackbar>
                </CardActions>
            </Box>
        </Card>
    );
}
