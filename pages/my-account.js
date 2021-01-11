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
import { useRouter } from 'next/router';
import parseCookies from '../lib/parseCookies';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop: '16px',
    },
});

let userRe;

export default function MyAccount(props) {
    const router = useRouter();
    const classes = useStyles();
    const [reRender, setReRender] = React.useState(false);

    // need this type of upgrade
    // because when user update account then need to show the result instant
    let user = userRe ? userRe : props.user;
    let myBag = props.myBag;

    const changeUser = (value) => {
        userRe = value;
        console.log('user change', userRe);
        setReRender(!reRender);
    };

    console.log('user Re', userRe);
    // here no need to set userRe undefined
    // because only one user can see any customer
    useEffect(() => {
        if (!Cookies.get('haha_ecom_bangla_token')) {
            router.push('/login');
        }
    });

    const [value, setValue] = React.useState('0');

    let output;
    if (value === '0') {
        output = <ProfileCard user={user && user} />;
    } else if (value === '1') {
        output = <UpdateAccount changeUser={changeUser} />;
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
            <Head>
                <title>My Account</title>
                <link rel='icon' href='/a.ico' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                ></meta>
            </Head>
            <ButtonAppBar
                totalProductInBag={myBag && myBag.product_with_quantity.length}
            />
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
                            <strong>
                                {user &&
                                    user.first_name.toUpperCase() +
                                        ' ' +
                                        user.last_name.toUpperCase()}
                            </strong>
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

const fetchDataForBag = async (config) =>
    await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bag/`, config)
        .then((res) => ({
            bag: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

const fetchDataForUser = async (config) =>
    await axios
        .get('http://localhost:8000/rest-auth/user/', config)
        .then((res) => ({
            user: res.data,
        }))
        .catch((err) => ({
            error: err.response.data,
        }));

export async function getServerSideProps({ req }) {
    const cookies = parseCookies(req);
    const haha_ecom_bangla_token = cookies.haha_ecom_bangla_token
        ? cookies.haha_ecom_bangla_token
        : null;
    // when there have no cookies in browser it will return undefined that is not serializable, thats why set it as null

    const config = {
        headers: {
            Authorization: 'Token ' + haha_ecom_bangla_token,
        },
    };

    const dataBag = await fetchDataForBag(config);

    let myBag = null;
    if (dataBag.bag) {
        let allMyBag = dataBag.bag;
        let myBagNotSendToMyOrder = allMyBag.filter(
            (myBag) => myBag.is_send_to_my_order === false
        );
        // console.log(myBagNotSendToMyOrder[0])
        if (myBagNotSendToMyOrder[0]) {
            myBag = myBagNotSendToMyOrder[0];
            // We got exact bag for user
            // 1st we filter out the bags whose not send to my order
            // then there have many bags for that user because of backend, hacker can do anything!!
            // the 1st created one is selected as myBag
        }
    }

    const dataUser = await fetchDataForUser(config);
    const user = dataUser.user ? dataUser.user : null;
    return {
        props: { user, myBag },
    };
}
