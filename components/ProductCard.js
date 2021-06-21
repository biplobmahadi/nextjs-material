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

export default function ProductCard({
    product,
    myBag,
    config,
    needDisabled,
    setNeedDisabled,
}) {
    const classes = useStyles();
    // console.log('got product for card', product);

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

    // ####### Full feature of add productWithQuantity to bag
    // 1st check is product quantity available or not
    // if not available then show a msg that, product not available
    // it's important to check product available or not, because for 1st render it can show available
    // but in that time other user can add it and it can be not available
    // so check it 1st

    // ## Now, check productWithQuantity already in bag or not
    // if already in bag, then check is it in trial or not
    // if in trial then show a msg that, productWithQuantity already add as trial
    // because we can't add more than 1 productWithQuantity as trial
    // if not in trial then add 1 quantity extra with this existing productWithQuantity in bag
    // then also remove 1 quantity from original product available quantity
    // because we always track the quantity of product that available or not

    // ## if productWithQuantity not exist in bag
    // then create productWithQuantity
    // ### Now, check is there any productWithQuantity in Bag or not
    // if there have some other productWithQuantity in bag then update bag with newly created productWithQuantity
    // by following previous process
    // if there have no productWithQuantity, mean no productWithQuantity in bag
    // then create a bag with this productWithQuantity then follow the next steps
    // Done #########

    let productWithQuantityExistInBag;
    if (myBag) {
        productWithQuantityExistInBag = myBag.product_with_quantity.filter(
            (productWithQuantity) =>
                productWithQuantity.product.id === product.id
        );
    }

    const [productWithQuantityInBag, setProductWithQuantityInBag] =
        useState(null);

    // console.log("product card", productWithQuantityInBag);

    useEffect(() => {
        setProductWithQuantityInBag(
            productWithQuantityExistInBag &&
                productWithQuantityExistInBag.length !== 0
                ? productWithQuantityExistInBag[0]
                : null
        );
    }, [product]);

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

            // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
            // this is very important
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
                setNeedDisabled(false);
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
