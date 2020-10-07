import Link from 'next/link';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import ProductTable from '../components/ProductTable';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountOptionList from '../components/AccountOptionList';

import Divider from '@material-ui/core/Divider';
export default function OrderCard() {
    return (
        <Box
            p={2}
            boxShadow={1}
            borderRadius='borderRadius'
            style={{
                backgroundColor: 'white',
            }}
        >
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Order ID</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {' '}
                        <Typography>6</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Date</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {' '}
                        <Typography>6 Feb, 2021</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>No. of Product</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        <Typography>03</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box>
                        <Typography>Status</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        <Chip
                            label={`Is Processing`}
                            color='secondary'
                            size='small'
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box py={1}>
                <Divider />
            </Box>
            <Box pt={2} textAlign='center'>
                <Link href='/my-order-details'>
                    <Button variant='contained' size='small' color='primary'>
                        <Box px={3}>See Details</Box>
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
