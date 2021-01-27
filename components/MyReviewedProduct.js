import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import MyReviewedProductCard from './MyReviewedProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountOptionList from '../components/AccountOptionList';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function MyReviewedProduct({ mainProductReviewed }) {
    return (
        <Box mt={2}>
            {mainProductReviewed.length !== 0 ? (
                <Grid container spacing={2}>
                    {mainProductReviewed.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <MyReviewedProductCard
                                product={product && product}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <Alert severity='error'>
                        <AlertTitle>Sorry Dear</AlertTitle>
                        You Have No Review Right Now —{' '}
                        <strong>Hope You Will Make A Review Very Soon!</strong>
                    </Alert>
                </Box>
            )}
        </Box>
    );
}
