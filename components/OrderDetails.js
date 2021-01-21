import Link from '../src/Link';
import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
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
export default function OrderDetailsCard({ order }) {
    return (
        <Box
            mt={2}
            p={2}
            boxShadow={1}
            borderRadius='borderRadius'
            style={{ backgroundColor: 'white' }}
        >
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='center'
            >
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Box px={3} py={1}>
                        <Typography>
                            <Box fontWeight='fontWeightBold'>
                                No. of Products
                            </Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        {' '}
                        <Typography>
                            {order && order.my_bag.product_with_quantity.length}
                        </Typography>
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
                    <Box px={3} py={1}>
                        <Typography>
                            <Box fontWeight='fontWeightBold'>Total Cost</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        {' '}
                        <Typography>{order && order.total}</Typography>
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
                    <Box px={3} py={1}>
                        <Typography>
                            <Box fontWeight='fontWeightBold'>
                                Total Cost With Delivery
                            </Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        {' '}
                        <Typography>{order && order.total_payable}</Typography>
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
                    <Box px={3} py={1}>
                        <Typography>
                            <Box fontWeight='fontWeightBold'>Payment</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        {order.is_confirm && order.is_payment_confirm ? (
                            <Typography>{order && order.payment}</Typography>
                        ) : (
                            <>
                                {!order.is_confirm && (
                                    <Link href={`/receiver/${order.order_code}`}>
                                        <Button
                                            color='primary'
                                            size='small'
                                            variant='contained'
                                        >
                                            {' '}
                                            Confirm Now{' '}
                                        </Button>
                                    </Link>
                                )}
                                {order.is_confirm && !order.is_payment_confirm && (
                                    <Link href={`/payment/${order.order_code}`}>
                                        <Button
                                            color='primary'
                                            size='small'
                                            variant='contained'
                                        >
                                            {' '}
                                            Confirm Now{' '}
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}
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
                    <Box px={3} py={1}>
                        <Typography>
                            <Box fontWeight='fontWeightBold'>Date</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>{order && order.created_at}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
