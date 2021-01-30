import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.between('xs', 'md')]: {
            textAlign: 'center',
        },
    },
}));
export default function MainFooter() {
    const classes = useStyles();
    return (
        <Box>
            <Box pb={8}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                        <Box className={classes.root}>
                            <Typography variant='h6' component='h6'>
                                Logo
                            </Typography>

                            <Box pt={2} pb={3}>
                                <Typography>
                                    <strong>Hotline:</strong> 16218 &
                                    01753183119
                                </Typography>
                                <Typography>
                                    <strong>Email:</strong> biplob@gmail.com
                                </Typography>

                                <Typography>
                                    <strong>Office Address:</strong>{' '}
                                    Kazla,Rajshahi-6204, Bangladesh.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid container item xs={12} sm={12} md={12} lg={7} xl={7}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box textAlign='center'>
                                <Typography variant='h6' component='h6'>
                                    Specail
                                </Typography>
                                <Box pt={2} pb={3}>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>
                                            Tranding Outfits
                                        </Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Offers</Typography>
                                    </Link>

                                    <Typography>
                                        <Link
                                            href='javascript:void(0);'
                                            color='inherit'
                                        >
                                            Logo Melaa
                                        </Link>
                                    </Typography>

                                    <Typography>
                                        <Link
                                            href='javascript:void(0);'
                                            color='inherit'
                                        >
                                            Music Show
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box textAlign='center'>
                                <Typography variant='h6' component='h6'>
                                    Help Center
                                </Typography>
                                <Box pt={2} pb={3}>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Happy Return</Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Refund Policy</Typography>
                                    </Link>

                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Privacy Policy</Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>
                                            Terms & Conditions
                                        </Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>FAQs</Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box textAlign='center'>
                                <Typography variant='h6' component='h6'>
                                    About
                                </Typography>
                                <Box pt={2} pb={3}>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Contact Us</Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>About Us</Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Career</Typography>
                                    </Link>
                                    <Link
                                        href='javascript:void(0);'
                                        color='inherit'
                                    >
                                        <Typography>Our Brands</Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                        <Box textAlign='center'>
                            <Typography variant='h6' component='h6'>
                                Let's Connect
                            </Typography>
                        </Box>
                        <Box pt={2} pb={3}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item>
                                    <FacebookIcon
                                        style={{
                                            fontSize: 40,
                                            color: '#3B5998',
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <InstagramIcon
                                        style={{
                                            fontSize: 40,
                                            color: '#e4405f',
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <YouTubeIcon
                                        style={{
                                            fontSize: 40,
                                            color: '#ff0000',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider variant='middle' />
            <Box py={2} px={5} textAlign='center'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p1.png'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p2.jpeg'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p3.png'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p4.png'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p5.png'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                        <img
                            src='/p1.png'
                            alt=''
                            srcset=''
                            height='50'
                            width='120'
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider variant='middle' />
            <Box textAlign='center' py={3}>
                <Typography>
                    Copyright &copy; Logo, {new Date().getFullYear()}. All Right
                    Reserved.
                </Typography>
            </Box>
        </Box>
    );
}
