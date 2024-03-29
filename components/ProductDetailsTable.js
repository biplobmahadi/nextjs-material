import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        backgroundColor: "white",
        borderRadius: "4px",
    },
});

export default function ProductDetailsTable({ product }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {product &&
                        product.product_detail.map((productDetail) => (
                            <TableRow hover key={productDetail.id}>
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {productDetail.title}
                                </TableCell>
                                <TableCell align="center">
                                    {productDetail.value}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
