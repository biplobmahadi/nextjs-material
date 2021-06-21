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
    mainProduct,
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

    let productWithQuantityExistInBag;
    if (myBag) {
        productWithQuantityExistInBag = myBag.product_with_quantity.filter(
            (productWithQuantity) =>
                productWithQuantity.product.id === product.id
        );
    }

    const [productWithQuantityInBag, setProductWithQuantityInBag] =
        useState(null);

    console.log("trial card", productWithQuantityInBag);

    useEffect(() => {
        setProductWithQuantityInBag(
            productWithQuantityExistInBag &&
                productWithQuantityExistInBag.length !== 0
                ? productWithQuantityExistInBag[0]
                : null
        );
    }, [mainProduct]);

    const handleAddToBag = () => {
        // create a loading
        setLoading(true);
        // others will disabled when add specific one
        setNeedDisabled(true);

        let addToProductWithQuantity = {
            product: product.id,
            quantity: 1,
            add_as_trial: true,
            my_bag: myBag.id,
        };

        // need to get the trial product of same category in myBag
        // because, if trial product of same category is 2 then, it will not add more
        // so 1st find all trial product of same category in myBag

        // console.log(
        //     'trialProductsWithQuantityOfSameCategoryInBag',
        //     trialProductsWithQuantityOfSameCategoryInBag
        // );

        // ######### Most Important, if anybody add multiple product of same category then also
        // 2 product can be added as trial of this category ######

        // 1st we need to get the available quantity for this product
        // if not available then nothing will perform
        // if available then check, is 2 product already added as trial for similar category
        // if 2 similar category product add already, then this one will not added as trial
        // when not 2 product added, then check is this product already added as trial
        // if already added this product then actions will close here
        // if not added then it will added successfully

        // ##### First of there have to have any product in bag

        if (lengthOfTrialProducts > 1) {
            // console.log(
            //     'you cant add more than 2 product of same category as trial'
            // );
            setLoading(false);
            setNeedDisabled(false);
            setOpenForTwoAlreadyAdded(true);
        } else {
            // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
            if (productWithQuantityInBag) {
                // console.log(
                //     'already product add in bag or add as trial'
                // );
                setLoading(false);
                setNeedDisabled(false);
                setOpenForAddAsTrial(true);
                // here in bag, user can't add more quantity to trial, only one product can trial
                // when user add this for buy then it can't be add as trial
            } else {
                setOpenForAdd(true);
                setLoading(false);
                setNeedDisabled(false);
                setLengthOfTrialProducts((prevState) => prevState + 1);
                axios
                    .post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/`,
                        addToProductWithQuantity,
                        config
                    )
                    .then((res) => {
                        console.log("trial e add", res.data);
                        setProductWithQuantityInBag(res.data);
                        // need only one set state in async then
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
