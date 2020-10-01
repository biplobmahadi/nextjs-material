import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
});

export default function ProductCard() {
    const classes = useStyles();

    return (
        <Link href='/product'>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        alt='Contemplative Reptile'
                        height='240'
                        image='/aa.jpg'
                        title='Contemplative Reptile'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h6'>
                            <Box textAlign='center'>Narrow Ti-Shirt</Box>
                        </Typography>
                        <Typography gutterBottom variant='h5'>
                            <Box textAlign='center' color='secondary.main'>
                                Tk. 220
                            </Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' size='small' color='primary'>
                        <Box textAlign='center' px={4}>
                            Add To Bag
                        </Box>
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}
