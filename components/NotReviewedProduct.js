import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from './ButtonAppBar';
import Card from './Card';
import NotReviewedProductCard from './NotReviewedProductCard';
import Footer from './Footer';
import MainFooter from './MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountOptionList from './AccountOptionList';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function NotReviewedProduct({ notReviewedProduct }) {
    return (
        <Box mt={2}>
            {notReviewedProduct.length !== 0 ? (
                <Grid container spacing={2}>
                    {notReviewedProduct.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <NotReviewedProductCard
                                product={product && product}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <Alert severity='error'>
                        <AlertTitle>Sorry Dear</AlertTitle>
                        You Didn't Buy Any Product —{' '}
                        <strong>So No Product Available Here !</strong>
                    </Alert>
                </Box>
            )}
        </Box>
    );
}
