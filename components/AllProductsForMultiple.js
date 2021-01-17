import Head from 'next/head';
import ButtonAppBar from './ButtonAppBar';
import ProductCardForMultiple from './ProductCardForMultiple';
import FilterProductDialog from './FilterProductDialog';
import MainFooter from './MainFooter';
import FilterProduct from './FilterProduct';
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

export default function AllProductsForMultiple({
    products,
    myBag,
    changeMyBag,
    changeForMultiple,
    urlForChangeCardForMultiple,
    config,
}) {
    const classes = useStyles();
    const [needDisabled, setNeedDisabled] = React.useState(false);

    return (
        <Grid container spacing={2}>
            {products &&
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                        <ProductCardForMultiple
                            product={product && product}
                            myBag={myBag}
                            config={config}
                            changeMyBag={changeMyBag}
                            changeCardForMultiple={changeForMultiple}
                            urlForChangeCardForMultiple={
                                urlForChangeCardForMultiple
                            }
                            needDisabled={needDisabled}
                            setNeedDisabled={setNeedDisabled}
                        />
                    </Grid>
                ))}
        </Grid>
    );
}
