// import Link from '../src/Link';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Chip from '@material-ui/core/Chip';
// import Box from '@material-ui/core/Box';
// import axios from 'axios';

// const useStyles = makeStyles({
//     root: {
//         maxWidth: '100%',
//     },
//     imgHover: {
//         overflow: 'hidden',
//     },
//     imgHoverZoom: {
//         transition: 'transform .5s ease',
//         '&:hover': { transform: 'scale(1.1)' },
//     },
// });

// export default function ProductCard({
//     product,
//     myBag,
//     config,
//     changeMyBag,
//     changeCategoryProducts,
//     mainProduct,
// }) {
//     const classes = useStyles();
//     console.log('got product for card', product);

//     const handleAddToBag = () => {
//         let addToBag = {
//             product: product.id,
//             quantity: 1,
//             cost: product.price,
//         };

//         // if bag complete but order not complete then you can't create new bag
//         // that's why this filter
//         // if (!this.state.orderId){

//         let productExitsInBag;
//         if (myBag) {
//             productExitsInBag = myBag.product.filter(
//                 (filterProduct) => filterProduct.product.id === product.id
//             );
//         }
//         console.log('productExitsInBag', productExitsInBag);
//         // I use productExitsInBag.length !== 0, because [] == true.. if [] then loop will continue
//         if (productExitsInBag && productExitsInBag.length !== 0) {
//             axios
//                 .patch(
//                     `http://localhost:8000/product-with-quantity/${productExitsInBag[0].id}/`,
//                     {
//                         quantity: productExitsInBag[0].quantity + 1,
//                         cost: productExitsInBag[0].cost + product.price,
//                     },
//                     config
//                 )
//                 .then((res) => {
//                     // console.log(res.data);
//                     let pk = [];
//                     myBag.product.map(
//                         (product) => (pk = pk.concat(product.id))
//                     );
//                     console.log(pk);
//                     axios
//                         .patch(
//                             `http://localhost:8000/my-bag/${myBag.id}/`,
//                             {
//                                 product: pk,
//                                 sub_total: myBag.sub_total + product.price,
//                             },
//                             config
//                         )
//                         .then((res) => {
//                             axios
//                                 .patch(
//                                     `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
//                                     {
//                                         available_quantity:
//                                             product.productavailable
//                                                 .available_quantity - 1,
//                                     },
//                                     config
//                                 )
//                                 .then((res) => {
//                                     // console.log('updated quantity', res.data)
//                                     // final get will be after all post, patch done
//                                     axios
//                                         .get(
//                                             `http://localhost:8000/category/${mainProduct.category.slug}/`
//                                         )
//                                         .then((res) => {
//                                             let allCategoryProducts =
//                                                 res.data.product;
//                                             let filteredCategoryProducts = allCategoryProducts.filter(
//                                                 (categoryProduct) =>
//                                                     categoryProduct.id !==
//                                                     mainProduct.id
//                                             );
//                                             changeCategoryProducts(
//                                                 filteredCategoryProducts.slice(
//                                                     0,
//                                                     6
//                                                 )
//                                             );
//                                             axios
//                                                 .get(
//                                                     `http://localhost:8000/my-bag/${myBag.id}/`,
//                                                     config
//                                                 )
//                                                 .then((res) => {
//                                                     // new myBag need to add to state
//                                                     changeMyBag(res.data);
//                                                     // setTotalBagProduct(res.data.product.length);
//                                                 })
//                                                 .catch((err) =>
//                                                     console.log(err.response)
//                                                 );
//                                         })
//                                         .catch((err) => ({
//                                             error: err.response.data,
//                                         }));
//                                 })
//                                 .catch((err) => console.log(err.response));
//                         })
//                         .catch((err) => console.log(err.response));
//                 })
//                 .catch((err) => console.log(err.response));
//         } else {
//             axios
//                 .post(
//                     'http://localhost:8000/product-with-quantity/',
//                     addToBag,
//                     config
//                 )
//                 .then((res) => {
//                     // console.log('bag nai - pwq', res.data);
//                     if (myBag && myBag.length !== 0) {
//                         // console.log(res.data.id, myBag.product.id, myBag.product) .. middle is not correct
//                         let pk = [];
//                         myBag.product.map(
//                             (product) => (pk = pk.concat(product.id))
//                         );
//                         console.log('bag e onno product ase - pk', pk);
//                         axios
//                             .patch(
//                                 `http://localhost:8000/my-bag/${myBag.id}/`,
//                                 {
//                                     product: pk.concat(res.data.id),
//                                     sub_total: myBag.sub_total + res.data.cost,
//                                 },
//                                 config
//                             )
//                             .then((res) => {
//                                 console.log(
//                                     'bag e product ase - patch bag',
//                                     res.data
//                                 );

//                                 axios
//                                     .patch(
//                                         `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
//                                         {
//                                             available_quantity:
//                                                 product.productavailable
//                                                     .available_quantity - 1,
//                                         },
//                                         config
//                                     )
//                                     .then((res) => {
//                                         // console.log('updated quantity', res.data)
//                                         // final get will be after all post, patch done
//                                         axios
//                                             .get(
//                                                 `http://localhost:8000/category/${mainProduct.category.slug}/`
//                                             )
//                                             .then((res) => {
//                                                 let allCategoryProducts =
//                                                     res.data.product;
//                                                 let filteredCategoryProducts = allCategoryProducts.filter(
//                                                     (categoryProduct) =>
//                                                         categoryProduct.id !==
//                                                         mainProduct.id
//                                                 );
//                                                 changeCategoryProducts(
//                                                     filteredCategoryProducts.slice(
//                                                         0,
//                                                         6
//                                                     )
//                                                 );
//                                                 axios
//                                                     .get(
//                                                         `http://localhost:8000/my-bag/${myBag.id}/`,
//                                                         config
//                                                     )
//                                                     .then((res) => {
//                                                         // new myBag need to add to state
//                                                         changeMyBag(res.data);
//                                                         // setTotalBagProduct(res.data.product.length);
//                                                     })
//                                                     .catch((err) =>
//                                                         console.log(
//                                                             err.response
//                                                         )
//                                                     );
//                                             })
//                                             .catch((err) => ({
//                                                 error: err.response.data,
//                                             }));
//                                     })
//                                     .catch((err) => console.log(err.response));
//                             })
//                             .catch((err) => console.log(err.response));
//                     } else {
//                         axios
//                             .post(
//                                 'http://localhost:8000/my-bag/',
//                                 {
//                                     product: [res.data.id],
//                                     sub_total: res.data.cost,
//                                 },
//                                 config
//                             )
//                             .then((res) => {
//                                 // console.log(res.data);
//                                 axios
//                                     .patch(
//                                         `http://localhost:8000/product-update-only-quantity/${product.productavailable.id}/`,
//                                         {
//                                             available_quantity:
//                                                 product.productavailable
//                                                     .available_quantity - 1,
//                                         },
//                                         config
//                                     )
//                                     .then((res) => {
//                                         // console.log('updated quantity', res.data)
//                                         // final get will be after all post, patch done
//                                         axios
//                                             .get(
//                                                 `http://localhost:8000/category/${mainProduct.category.slug}/`
//                                             )
//                                             .then((res) => {
//                                                 let allCategoryProducts =
//                                                     res.data.product;
//                                                 let filteredCategoryProducts = allCategoryProducts.filter(
//                                                     (categoryProduct) =>
//                                                         categoryProduct.id !==
//                                                         mainProduct.id
//                                                 );
//                                                 changeCategoryProducts(
//                                                     filteredCategoryProducts.slice(
//                                                         0,
//                                                         6
//                                                     )
//                                                 );
//                                                 axios
//                                                     .get(
//                                                         `http://localhost:8000/my-bag/${myBag.id}/`,
//                                                         config
//                                                     )
//                                                     .then((res) => {
//                                                         // new myBag need to add to state
//                                                         changeMyBag(res.data);
//                                                         // setTotalBagProduct(res.data.product.length);
//                                                     })
//                                                     .catch((err) =>
//                                                         console.log(
//                                                             err.response
//                                                         )
//                                                     );
//                                             })
//                                             .catch((err) => ({
//                                                 error: err.response.data,
//                                             }));
//                                     })
//                                     .catch((err) => console.log(err.response));
//                             })
//                             .catch((err) => console.log(err.response));
//                     }
//                 })
//                 .catch((err) => console.log(err.response));
//         }
//     };

//     return (
//         <Card className={classes.root}>
//             <Link href={`/product/${product && product.slug}`}>
//                 <CardActionArea>
//                     <Box className={classes.imgHover} p={2}>
//                         <CardMedia
//                             className={classes.imgHoverZoom}
//                             component='img'
//                             alt='Product'
//                             height='180'
//                             image='/s2.jpg'
//                             title='Product'
//                         />
//                     </Box>
//                     <CardContent>
//                         <Typography gutterBottom>
//                             <Box textAlign='center'>
//                                 {product && product.name}
//                             </Box>
//                         </Typography>
//                         <Typography gutterBottom variant='h6' component='h6'>
//                             <Box textAlign='center' color='secondary.main'>
//                                 Tk. {product && product.price}
//                             </Box>
//                         </Typography>
//                     </CardContent>
//                     {product.productavailable.available_quantity === 0 && (
//                         <Box textAlign='center'>
//                             <Chip
//                                 label='Not In Stock'
//                                 color='secondary'
//                                 size='small'
//                             />
//                         </Box>
//                     )}
//                 </CardActionArea>
//             </Link>
//             <Box pb={1}>
//                 <CardActions style={{ justifyContent: 'center' }}>
//                     <Button
//                         variant='contained'
//                         size='small'
//                         color='primary'
//                         onClick={handleAddToBag}
//                         disabled={
//                             product.productavailable.available_quantity === 0
//                         }
//                     >
//                         <Box textAlign='center' px={4}>
//                             Add To Bag
//                         </Box>
//                     </Button>
//                 </CardActions>
//             </Box>
//         </Card>
//     );
// }

// no need,
