import Head from "next/head";
import ButtonAppBar from "./ButtonAppBar";
import ProductCard from "./ProductCard";
import FilterProductDialog from "./FilterProductDialog";
import MainFooter from "./MainFooter";
import FilterProduct from "./FilterProduct";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { boxSizing } from "@material-ui/system";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Rating from "@material-ui/lab/Rating";

import parseCookies from "../lib/parseCookies";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AllProducts({ products, myBag, config }) {
    const [needDisabled, setNeedDisabled] = React.useState(false);

    return (
        <Grid container spacing={2}>
            {products &&
                products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                        <ProductCard
                            product={product && product}
                            myBag={myBag}
                            config={config}
                            needDisabled={needDisabled}
                            setNeedDisabled={setNeedDisabled}
                        />
                    </Grid>
                ))}
        </Grid>
    );
}
