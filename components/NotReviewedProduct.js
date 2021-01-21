import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from './ButtonAppBar';
import Card from './Card';
import ProductCard from './ProductCard';
import Footer from './Footer';
import MainFooter from './MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountOptionList from './AccountOptionList';

import Divider from '@material-ui/core/Divider';
export default function NotReviewedProduct({ notReviewedProduct }) {
    return (
        <Box mt={2}>
            {/* <Typography>{value}</Typography> */}
            <Grid container spacing={2}>
                {notReviewedProduct &&
                    notReviewedProduct.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <ProductCard product={product && product} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}
