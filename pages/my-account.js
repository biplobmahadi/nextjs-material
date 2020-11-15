import Head from 'next/head';
import ButtonAppBar from '../components/ButtonAppBar';
import Card from '../components/Card';
import ProductTable from '../components/ProductTable';
import ProfileCard from '../components/ProfileCard';
import UpdateAccount from '../components/forms/UpdateAccount';
import PasswordChange from '../components/forms/PasswordChange';
import Logout from '../components/forms/Logout';
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
import AccountOptionList from '../components/AccountOptionList';
import Cookies from 'js-cookie';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});

export default function MyAccount(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('0');
    console.log(props);
    let output;
    if (value === '0') {
        output = <ProfileCard />;
    } else if (value === '1') {
        output = <UpdateAccount />;
    } else if (value === '2') {
        output = <PasswordChange />;
    } else {
        output = <Logout />;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            {' '}
            <Head>
                <title>My Account</title>
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
            <Box pb={8} style={{ backgroundColor: '#E6E6FA' }}>
                <Box mt={8} pt={3} px={3}>
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
                            <Hidden lgDown>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={3}
                                >
                                    <Box
                                        p={1}
                                        boxShadow={1}
                                        borderRadius='borderRadius'
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <AccountOptionList />
                                    </Box>
                                </Grid>
                            </Hidden>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Box
                                    p={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <Typography variant='h5'>
                                        <strong>My Account</strong>
                                    </Typography>
                                </Box>
                                <Paper className={classes.root}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor='primary'
                                        textColor='primary'
                                        variant='fullWidth'
                                    >
                                        <Tab
                                            label='Account Details'
                                            value='0'
                                        />
                                        <Tab label='Update Account' value='1' />
                                        <Tab
                                            label='Change Password'
                                            value='2'
                                        />
                                        <Tab label='Logout' value='3' />
                                    </Tabs>
                                </Paper>

                                <Box
                                    mt={2}
                                    p={2}
                                    boxShadow={1}
                                    borderRadius='borderRadius'
                                    style={{ backgroundColor: 'white' }}
                                >
                                    {output}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Box mx={3} mt={6}>
                <MainFooter />
            </Box>
        </div>
    );
}

// const fetchData = async () => {
//     const config = {
//         headers: {
//             Authorization: 'Token ' + Cookies.get('haha_ecom_bangla_token'),
//         },
//     };
//     await axios
//         .get('http://localhost:8000/products/')
//         .then((res) => ({
//             users: res.data,
//         }))
//         .catch((err) => ({
//             error: err.response,
//         }));
// };
// const config = {
//     headers: {
//         Authorization: 'Token ' + Cookies.get('haha_ecom_bangla_token'),
//     },
// };
const fetchData = async (config) =>
    await axios
        .get('http://localhost:8000/rest-auth/user/')
        .then((res) => ({
            error: false,
            user: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
            user: null,
        }));

export async function getServerSideProps({ req }) {
    const cookies = parseCookies(req);
    const config = {
        headers: {
            Authorization: 'Token ' + cookies.haha_ecom_bangla_token,
        },
    };
    const data = await fetchData(config);
    return {
        props: { data, config, cookies: cookies.haha_ecom_bangla_token },
    };
    // return {
    //     props: {
    //         data: JSON.stringify(data),
    //         // error: JSON.parse(JSON.stringify(error)),
    //     },
    // };
}
