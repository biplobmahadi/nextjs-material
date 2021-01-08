import Link from '../src/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    imgHover: {
        overflow: 'hidden',
    },
    imgHoverZoom: {
        transition: 'transform .5s ease',
        '&:hover': { transform: 'scale(1.1)' },
    },
});

export default function ProductCard({
    product,
    myBag,
    config,
    changeMyBag,
    changeCategoryProducts,
    mainProduct,
}) {
    const classes = useStyles();
    console.log('got product for card in trial', product);

    const handleAddToBag = () => {
        let addToBag = {
            product: product.id,
            quantity: 1,
            cost: 0,
            add_as_trial: true,
        };

        // here find, this product exist or not in bag. it will get only one product

        let productWithQuantityExistInBag;
        if (myBag) {
            productWithQuantityExistInBag = myBag.product_with_quantity.filter(
                (filterProduct) => filterProduct.product.id === product.id
            );
        }
        console.log(
            'productWithQuantityExistInBag',
            productWithQuantityExistInBag
        );

        // need to get the trial product of same category in myBag
        // because, if trial product of same category is 2 then, it will not add more
        // so 1st find all trial product of same category in myBag
        let trialProductsWithQuantityOfSameCategoryInBag;
        if (myBag) {
            trialProductsWithQuantityOfSameCategoryInBag = myBag.product_with_quantity.filter(
                (filterProduct) =>
                    filterProduct.product.category.id === product.category.id &&
                    filterProduct.add_as_trial
            );
        }
        console.log(
            'trialProductsWithQuantityOfSameCategoryInBag',
            trialProductsWithQuantityOfSameCategoryInBag
        );

        // ######### Most Important, if anybody add multiple product of same category then also
        // 2 product can be added as trial of this category ######

        // 1st we need to get the available quantity for this product
        // if not available then nothing will perform
        // if available then check, is 2 product already added as trial for similar category
        // if 2 similar category product add already, then this one will not added as trial
        // when not 2 product added, then check is this product already added as trial
        // if already added this product then actions will close here
        // if not added then it will added successfully
        axios
            .get(
                `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                config
            )
            .then((res) => {
                // if product available then this will run from below
                // add to bag process will start from here
                if (res.data.available_quantity > 0) {
                    if (
                        trialProductsWithQuantityOfSameCategoryInBag.length > 1
                    ) {
                        console.log(
                            'you cant add more than 2 product of same category as trial'
                        );
                    } else {
                        // I use productWithQuantityExistInBag.length !== 0, because [] == true.. if [] then loop will continue
                        if (
                            productWithQuantityExistInBag &&
                            productWithQuantityExistInBag.length !== 0
                        ) {
                            console.log(
                                'already product add in bag or add as trial'
                            );
                            // here in bag, user can't add more quantity to trial, only one product can trial
                            // when user add this for buy then it can't be add as trial
                        } else {
                            axios
                                .post(
                                    'http://localhost:8000/product-with-quantity/',
                                    addToBag,
                                    config
                                )
                                .then((res) => {
                                    // console.log('bag nai - pwq', res.data);
                                    if (myBag && myBag.length !== 0) {
                                        // console.log(res.data.id, myBag.product.id, myBag.product) .. middle is not correct
                                        let pk = [];
                                        myBag.product_with_quantity.map(
                                            (product_with_quantity) =>
                                                (pk = pk.concat(
                                                    product_with_quantity.id
                                                ))
                                        );
                                        console.log(
                                            'bag e onno product ase - pk',
                                            pk
                                        );
                                        axios
                                            .patch(
                                                `http://localhost:8000/my-bag/${myBag.id}/`,
                                                {
                                                    product_with_quantity: pk.concat(
                                                        res.data.id
                                                    ),
                                                    sub_total:
                                                        myBag.sub_total +
                                                        res.data.cost,
                                                },
                                                config
                                            )
                                            .then((res) => {
                                                console.log(
                                                    'bag e product ase - patch bag',
                                                    res.data
                                                );

                                                axios
                                                    .patch(
                                                        `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                                        {
                                                            available_quantity:
                                                                product
                                                                    .productavailable
                                                                    .available_quantity -
                                                                1,
                                                        },
                                                        config
                                                    )
                                                    .then((res) => {
                                                        // console.log('updated quantity', res.data)
                                                        // final get will be after all post, patch done
                                                        axios
                                                            .get(
                                                                `http://localhost:8000/category/${mainProduct.category.slug}/`
                                                            )
                                                            .then((res) => {
                                                                let allCategoryProducts =
                                                                    res.data
                                                                        .product;
                                                                let filteredCategoryProducts = allCategoryProducts.filter(
                                                                    (
                                                                        categoryProduct
                                                                    ) =>
                                                                        categoryProduct.id !==
                                                                        mainProduct.id
                                                                );
                                                                changeCategoryProducts(
                                                                    filteredCategoryProducts
                                                                );
                                                                axios
                                                                    .get(
                                                                        `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                        config
                                                                    )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            // new myBag need to add to state
                                                                            changeMyBag(
                                                                                res.data
                                                                            );
                                                                            console.log(
                                                                                'bag after updated quantity',
                                                                                res.data
                                                                            );
                                                                            // setTotalBagProduct(res.data.product.length);
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (err) =>
                                                                            console.log(
                                                                                err.response
                                                                            )
                                                                    );
                                                            })
                                                            .catch((err) =>
                                                                console.log(
                                                                    err.response
                                                                )
                                                            );
                                                    })
                                                    .catch((err) =>
                                                        console.log(
                                                            err.response
                                                        )
                                                    );
                                            })
                                            .catch((err) =>
                                                console.log(err.response)
                                            );
                                    } else {
                                        axios
                                            .post(
                                                'http://localhost:8000/my-bag/',
                                                {
                                                    product_with_quantity: [
                                                        res.data.id,
                                                    ],
                                                    sub_total: res.data.cost,
                                                },
                                                config
                                            )
                                            .then((res) => {
                                                // console.log(res.data);
                                                axios
                                                    .patch(
                                                        `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
                                                        {
                                                            available_quantity:
                                                                product
                                                                    .productavailable
                                                                    .available_quantity -
                                                                1,
                                                        },
                                                        config
                                                    )
                                                    .then((res) => {
                                                        // console.log('updated quantity', res.data)
                                                        // final get will be after all post, patch done
                                                        axios
                                                            .get(
                                                                `http://localhost:8000/category/${mainProduct.category.slug}/`
                                                            )
                                                            .then((res) => {
                                                                let allCategoryProducts =
                                                                    res.data
                                                                        .product;
                                                                let filteredCategoryProducts = allCategoryProducts.filter(
                                                                    (
                                                                        categoryProduct
                                                                    ) =>
                                                                        categoryProduct.id !==
                                                                        mainProduct.id
                                                                );
                                                                changeCategoryProducts(
                                                                    filteredCategoryProducts
                                                                );
                                                                axios
                                                                    .get(
                                                                        `http://localhost:8000/my-bag/${myBag.id}/`,
                                                                        config
                                                                    )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            // new myBag need to add to state
                                                                            changeMyBag(
                                                                                res.data
                                                                            );
                                                                            console.log(
                                                                                'bag after updated quantity',
                                                                                res.data
                                                                            );
                                                                            // setTotalBagProduct(res.data.product.length);
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (err) =>
                                                                            console.log(
                                                                                err.response
                                                                            )
                                                                    );
                                                            })
                                                            .catch((err) =>
                                                                console.log(
                                                                    err.response
                                                                )
                                                            );
                                                    })
                                                    .catch((err) =>
                                                        console.log(
                                                            err.response
                                                        )
                                                    );
                                            })
                                            .catch((err) =>
                                                console.log(err.response)
                                            );
                                    }
                                })
                                .catch((err) => console.log(err.response));
                        }
                    }
                } else {
                    console.log('product not available');
                }
            })
            .catch((err) => console.log(err.response));
    };

    return (
        <Card className={classes.root}>
            <Link href={`/product/${product && product.slug}`}>
                <CardActionArea>
                    <Box className={classes.imgHover} p={2}>
                        <CardMedia
                            className={classes.imgHoverZoom}
                            component='img'
                            alt='Product'
                            height='180'
                            image='/s2.jpg'
                            title='Product'
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom>
                            <Box textAlign='center'>
                                {product && product.name}
                            </Box>
                        </Typography>
                        <Typography gutterBottom variant='h6' component='h6'>
                            <Box textAlign='center' color='secondary.main'>
                                Tk. {product && product.price}
                            </Box>
                        </Typography>
                    </CardContent>
                    {product.productavailable.available_quantity === 0 && (
                        <Box textAlign='center'>
                            <Chip
                                label='Not In Stock'
                                color='secondary'
                                size='small'
                            />
                        </Box>
                    )}
                </CardActionArea>
            </Link>
            <Box pb={1}>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'
                        onClick={handleAddToBag}
                        disabled={
                            product.productavailable.available_quantity === 0
                        }
                    >
                        <Box textAlign='center' px={3}>
                            Add For Trial
                        </Box>
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}
