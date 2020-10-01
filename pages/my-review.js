import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import ProductCard from '../components/ProductCard';
import ProductTable from '../components/ProductTable';
import AccountOptionList from '../components/AccountOptionList';
import Footer from '../components/Footer';
import MainFooter from '../components/MainFooter';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});
export default function MyReview() {
    const classes = useStyles();
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            {' '}
            <Head>
                <title>My Review</title>
                <link rel='icon' href='/a.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar />
            <Box
                mx={3}
                mt={11}
                p={2}
                borderRadius='borderRadius'
                style={{ backgroundColor: '#E6E6FA' }}
            >
                <Box
                    p={2}
                    boxShadow={1}
                    textAlign='center'
                    borderRadius='borderRadius'
                    style={{ backgroundColor: 'white' }}
                >
                    <img
                        src='/aa.jpg'
                        alt=''
                        srcset=''
                        height='60'
                        width='60'
                        style={{ borderRadius: '50%' }}
                    />
                    <Typography variant='h5'>
                        <strong>BIPLOB MAHADI</strong>
                    </Typography>
                </Box>
                <Box mt={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Box
                                p={1}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <AccountOptionList />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Box
                                p={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                <Typography variant='h5'>
                                    <strong>My Reviews & Ratings</strong>
                                </Typography>
                            </Box>
                            <Paper className={classes.root}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor='primary'
                                    textColor='primary'
                                    centered
                                >
                                    <Tab label='Reviewed Product' value='0' />
                                    <Tab
                                        label='Not Reviewed Product'
                                        value='1'
                                    />
                                </Tabs>
                            </Paper>
                            <Box
                                mt={2}
                                p={2}
                                boxShadow={1}
                                borderRadius='borderRadius'
                                style={{ backgroundColor: 'white' }}
                            >
                                {/* <Typography>{value}</Typography> */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProductCard />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box style={{ backgroundColor: '#E6E6FA' }} mt={4}>
                <MainFooter />
            </Box>
        </div>
    );
}
