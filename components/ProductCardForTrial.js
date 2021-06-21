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

export default function ProductForTrialCard({
    product,
    myBag,
    config,
    needDisabled,
    setNeedDisabled,
    lengthOfTrialProducts,
    setLengthOfTrialProducts,
    categoryProductsWithQuantityExistInBag,
    setCategoryProductsWithQuantityExistInBag,
}) {
    const classes = useStyles();
    // console.log('got product for card in trial', product);

    const [loading, setLoading] = useState(false);
    const [openForAdd, setOpenForAdd] = useState(false);
    const [openForAddAsTrial, setOpenForAddAsTrial] = useState(false);
    const [openForTwoAlreadyAdded, setOpenForTwoAlreadyAdded] = useState(false);

    // this is for alert close
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
    const handleCloseForTwoAlreadyAdded = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenForTwoAlreadyAdded(false);
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

    const handleAddToBag = () => {
        // create a loading
        setLoading(true);
        // others will disabled when add specific one
        setNeedDisabled(true);

        let addToProductWithQuantity = {
            product: product.id,
            quantity: 1, // here in bag, user can't add more quantity to trial, only one product can trial
            add_as_trial: true,
            my_bag: myBag.id,
        };

        // ######### Most Important, if anybody add multiple product of same category then also
        // 2 product can be added as trial of this category ######

        // check the length, is it already two product added as trial for this similar category
        // is added then user can't add other
        if (lengthOfTrialProducts > 1) {
            setLoading(false);
            setNeedDisabled(false);
            setOpenForTwoAlreadyAdded(true);
        } else {
            // if productWithQuantityExist in bag as trial or direct added for buy then can't add more
            // I use productWithQuantityExist.length !== 0, because [] == true.. if [] then loop will continue
            if (productWithQuantityExist.length !== 0) {
                setLoading(false);
                setNeedDisabled(false);
                setOpenForAddAsTrial(true);
            } else {
                setOpenForAdd(true);
                setLoading(false);
                setNeedDisabled(false);
                setLengthOfTrialProducts((prevState) => prevState + 1);
                // if not productWithQuantityExist in bag then just post this with add_as_trial true
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                        addToProductWithQuantity,
                        config
                    )
                    .then((res) => {
                        // when we 1st post productWithQuantity as trial then need to set it in categoryProductsWithQuantityExistInBag
                        // because when we click add as trial button again then need to check productWithQuantityExist
                        // which will get from categoryProductsWithQuantityExistInBag, if we don't update it
                        // then we again can add this as trial, so need to update
                        console.log("trial e add", res.data);
                        setCategoryProductsWithQuantityExistInBag((prevState) =>
                            prevState.concat(res.data)
                        );
                        // after adding as trial need to update setCategoryProductsWithQuantityExistInBag
                        // with previous all and new one, so use concat
                        // here productId as product will get when post on productWithQuantity, no product object
                        // that's why need to use filter with two data,
                        // which is described in productWithQuantityExist filter section
                    })
                    .catch((err) => console.log(err.response));
            }
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
                                <Box textAlign="center" px={3}>
                                    {product.is_available
                                        ? "Add For Trial"
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
                        open={openForAdd}
                        autoHideDuration={2000}
                        onClose={handleCloseForAdd}
                    >
                        <Alert severity="success" variant="filled">
                            Successfully Product Added To Bag As Trial!
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
                            Already Add as Trial Or Add to Bag, Can't Add More!
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        open={openForTwoAlreadyAdded}
                        autoHideDuration={2000}
                        onClose={handleCloseForTwoAlreadyAdded}
                    >
                        <Alert severity="info" variant="filled">
                            Already Add 2 Similar Product as Trial, Can't Add
                            More!
                        </Alert>
                    </Snackbar>
                </CardActions>
            </Box>
        </Card>
    );
}
