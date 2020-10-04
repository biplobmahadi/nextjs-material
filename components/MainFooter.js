import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
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

export default function MainFooter() {
    return (
        <Box>
            <Box textAlign='center' pb={8}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <Typography variant='h6' component='h6'>
                            Logo
                        </Typography>
                        <Box pt={2} pb={3}>
                            <div>
                                <Typography>
                                    <HeadsetMicIcon fontSize='small' />
                                    {'  '}
                                    Hotline: 16218 & 01753183119
                                </Typography>
                                <Typography>
                                    <EmailIcon fontSize='small' />
                                    {'  '}
                                    Email: biplob@gmail.com
                                </Typography>

                                <Typography>
                                    <LocationOnIcon fontSize='small' />
                                    {'  '}
                                    Office Address: Kazla,Rajshahi-6204,
                                    Bangladesh.
                                </Typography>
                            </div>
                        </Box>
                    </Grid>

                    <Grid container item xs={12} sm={12} md={12} lg={6} xl={8}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                            <Typography variant='h6' component='h6'>
                                Specail
                            </Typography>
                            <Box pt={2} pb={3}>
                                <Link href='/receiver'>
                                    <Typography>Tranding</Typography>
                                </Link>
                                <Link href='/payment'>
                                    <Typography>Tranding</Typography>
                                </Link>
                                <Link href='/login'>
                                    <Typography>Tranding</Typography>
                                </Link>
                                <Link href='/register'>
                                    <Typography>Tranding</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                            <Typography variant='h6' component='h6'>
                                Help Center
                            </Typography>
                            <Box pt={2} pb={3}>
                                <Link href='/receiver'>
                                    <Typography>How to Buy</Typography>
                                </Link>
                                <Link href='/payment'>
                                    <Typography>Refund Policy</Typography>
                                </Link>
                                <Link href='/login'>
                                    <Typography>Happy Return</Typography>
                                </Link>
                                <Link href='/register'>
                                    <Typography>Privacy Policy</Typography>
                                </Link>
                                <Link href='/payment'>
                                    <Typography>Terms & Conditions</Typography>
                                </Link>
                                <Link href='/login'>
                                    <Typography>FAQs</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                            <Typography variant='h6' component='h6'>
                                My Account
                            </Typography>
                            <Box pt={2} pb={3}>
                                <Link href='/receiver'>
                                    <Typography>Account Details</Typography>
                                </Link>
                                <Link href='/payment'>
                                    <Typography>My Orders</Typography>
                                </Link>
                                <Link href='/login'>
                                    <Typography>Lottery</Typography>
                                </Link>
                                <Link href='/register'>
                                    <Typography>Gift</Typography>
                                </Link>
                                <Link href='/receiver'>
                                    <Typography>My Bag</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                            <Typography variant='h6' component='h6'>
                                About
                            </Typography>
                            <Box pt={2} pb={3}>
                                <Link href='/receiver'>
                                    <Typography>Contact Us</Typography>
                                </Link>
                                <Link href='/payment'>
                                    <Typography>About Us</Typography>
                                </Link>
                                <Link href='/login'>
                                    <Typography>Career</Typography>
                                </Link>
                                <Link href='/register'>
                                    <Typography>Featured In</Typography>
                                </Link>
                                <Link href='/register'>
                                    <Typography>Our Brand</Typography>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
                        <Typography variant='h6' component='h6'>
                            Let's Connect
                        </Typography>
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
                <p>
                    Copyright &copy; Logo, {new Date().getFullYear()}. All Right
                    Reserved.
                </p>
            </Box>
        </Box>
    );
}
