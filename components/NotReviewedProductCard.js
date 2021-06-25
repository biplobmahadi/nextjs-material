import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },

    imgHover: {
        overflow: "hidden",
    },
    imgHoverZoom: {
        transition: "transform .5s ease",
        "&:hover": { transform: "scale(1.1)" },
    },
});

export default function NotReviewedProductCard({ product }) {
    const classes = useStyles();

    return (
        <Link href={`/product/${product.slug}`} color="inherit">
            <Card className={classes.root}>
                <CardActionArea>
                    <Box className={classes.imgHover} p={2}>
                        <CardMedia
                            className={classes.imgHoverZoom}
                            component="img"
                            alt="Tranding Product"
                            height="180"
                            image="/s2.jpg"
                            title="Tranding Product"
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom>
                            <Box textAlign="center">
                                {product && product.name}
                            </Box>
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h6">
                            <Box textAlign="center">
                                Tk. {product && product.price}
                            </Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Box pb={1}>
                    <CardActions style={{ justifyContent: "center" }}>
                        <Link href={`/product/${product.slug}`} color="inherit">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                            >
                                <Box textAlign="center" px={4}>
                                    Create Review
                                </Box>
                            </Button>
                        </Link>
                    </CardActions>
                </Box>
            </Card>
        </Link>
    );
}
