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

export default function OrderCard({ myOrder }) {
    console.log('myOrder', myOrder);
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
                        <Typography>{myOrder.id}</Typography>
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
                        <Typography>{myOrder.created_at}</Typography>
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
                        <Typography>
                            {myOrder.my_bag.product_with_quantity.length}
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
                    <Box>
                        <Typography>Status</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {myOrder.is_processing ? (
                            myOrder.is_processing && myOrder.is_placed ? (
                                myOrder.is_processing &&
                                myOrder.is_placed &&
                                myOrder.is_on_road ? (
                                    myOrder.is_processing &&
                                    myOrder.is_placed &&
                                    myOrder.is_on_road &&
                                    myOrder.is_completed ? (
                                        <Chip
                                            label={`Completed`}
                                            color='primary'
                                            size='small'
                                        />
                                    ) : (
                                        <Chip
                                            label={`In Road`}
                                            color='primary'
                                            size='small'
                                        />
                                    )
                                ) : (
                                    <Chip
                                        label={`Is Placed`}
                                        color='primary'
                                        size='small'
                                    />
                                )
                            ) : (
                                <Chip
                                    label={`Is Processing`}
                                    color='primary'
                                    size='small'
                                />
                            )
                        ) : (
                            <Chip
                                label={`On Obsevation`}
                                color='primary'
                                size='small'
                            />
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
                    <Box>
                        <Typography>Order</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box>
                        {myOrder.is_confirm && myOrder.is_payment_confirm ? (
                            <Chip
                                label={`Confirmed`}
                                color='primary'
                                size='small'
                            />
                        ) : (
                            <>
                                {!myOrder.is_confirm && (
                                    <Link
                                        href={`/receiver/${myOrder.order_code}`}
                                    >
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            size='small'
                                        >
                                            {' '}
                                            Confirm Now{' '}
                                        </Button>
                                    </Link>
                                )}
                                {myOrder.is_confirm && (
                                    <Link
                                        href={`/payment/${myOrder.order_code}`}
                                    >
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            size='small'
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
            <Box pt={2} textAlign='center'>
                <Link href={`/my-order-details/${myOrder.order_code}`}>
                    <Button variant='contained' size='small' color='primary'>
                        <Box px={3}>See Details</Box>
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
