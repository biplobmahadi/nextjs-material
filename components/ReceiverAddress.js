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
export default function ReceiverAddressCard({ order }) {
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
                            <Box fontWeight='fontWeightBold'>Name</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        {' '}
                        <Typography>{order && order.receiver_name}</Typography>
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
                            <Box fontWeight='fontWeightBold'>Phone</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>{order && order.receiver_phone}</Typography>
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
                            <Box fontWeight='fontWeightBold'>Other Phone</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>
                            {order && order.receiver_other_phone
                                ? order.receiver_other_phone
                                : 'N/A'}
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
                            <Box fontWeight='fontWeightBold'>Division</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>
                            {order && order.receiver_division}
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
                            <Box fontWeight='fontWeightBold'>City</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>{order && order.receiver_city}</Typography>
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
                            <Box fontWeight='fontWeightBold'>Area</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>{order && order.receiver_area}</Typography>
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
                            <Box fontWeight='fontWeightBold'>Address</Box>
                        </Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box px={3} py={1}>
                        <Typography>
                            {order && order.receiver_address}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
