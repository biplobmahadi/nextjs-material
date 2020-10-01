import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
});

export default function MainFooter() {
    const classes = useStyles();

    return (
        <div>
            <Box textAlign='center' py={3}>
                <Grid container>
                    <Grid item xs={12} sm>
                        <h1>Logo</h1>
                        <div>
                            <strong>Phone: 323423213</strong>
                            <br />
                            <strong>Email: biplob@gmail.com</strong>
                            <br />
                            <strong>Address: Dhaka, BD</strong>
                        </div>
                        <h3>Let's Connect</h3>
                        <div>
                            <span>
                                <strong>Facebook</strong>
                            </span>
                            <span>
                                <strong>Facebook</strong>
                            </span>
                            <span>
                                <strong>Facebook</strong>
                            </span>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm>
                        <h2>Special</h2>
                        <Link>Tranding</Link>
                        <br />
                        <Link>Offers</Link>
                        <br />
                        <Link>Melaa</Link>
                        <br />
                        <Link>Tranding</Link>
                    </Grid>
                    <Grid item xs={12} sm>
                        <h2>Help Center</h2>
                        <Link>How to Buy</Link>
                        <br />
                        <Link>Refund Policy</Link>
                        <br />
                        <Link>Happy Return</Link>
                        <br />
                        <Link>Privacy Policy</Link>
                        <br />
                        <Link>Terms & Conditions</Link>
                        <br />
                        <Link>FAQs</Link>
                    </Grid>
                    <Grid item xs={12} sm>
                        <h2>My Account</h2>
                        <Link>Account</Link>
                        <br />
                        <Link>My Orders</Link>
                        <br />
                        <Link>Lottery</Link>
                        <br />
                        <Link>Gift</Link>
                        <br />
                        <Link>My Bag</Link>
                    </Grid>
                    <Grid item xs={12} sm>
                        <h2>About</h2>
                        <Link>Contact Us</Link>
                        <br />
                        <Link>About Us</Link>
                        <br />
                        <Link>Career</Link>
                        <br />
                        <Link>Featured In</Link>
                        <br />
                        <Link>Our Brand</Link>
                    </Grid>

                    <Grid item xs={12} sm>
                        <h2>Like Us On Facebook</h2>
                    </Grid>
                </Grid>
            </Box>
            <Divider variant='middle' />
            <Box textAlign='center' py={3}>
                <Grid container>
                    <Grid item xs={12} sm></Grid>
                    <Grid item xs={12} sm></Grid>
                    <Grid item xs={12} sm>
                        {' '}
                        <Chip label='Bkash' color='secondary' />
                    </Grid>
                    <Grid item xs={12} sm>
                        {' '}
                        <Chip label='Rocket' color='secondary' />
                    </Grid>
                    <Grid item xs={12} sm>
                        {' '}
                        <Chip label='VISA' color='secondary' />
                    </Grid>
                    <Grid item xs={12} sm>
                        {' '}
                        <Chip label='Master Card' color='secondary' />
                    </Grid>
                    <Grid item xs={12} sm></Grid>
                    <Grid item xs={12} sm></Grid>
                </Grid>
            </Box>
            <Divider variant='middle' />
            <Box textAlign='center' py={3}>
                <p>Copyright &copy; Logo, 2020. All Right Reserved.</p>
            </Box>
        </div>
    );
}
