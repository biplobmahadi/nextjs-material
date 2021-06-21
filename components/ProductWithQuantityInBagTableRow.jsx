import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import TableHead from "@material-ui/core/TableHead";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const config = {
    headers: {
        Authorization: "Token " + Cookies.get("haha_ecom_bangla_token"),
    },
};

const handleAdd = (
    productWithQuantity,
    quantity,
    setQuantity,
    setTotalCost
) => {
    setQuantity((prevState) => prevState + 1);
    setTotalCost((prevState) => prevState + productWithQuantity.product.price);
    axios
        .patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
            {
                quantity: quantity + 1,
            },
            config
        )
        .then((res) => {
            console.log("just add", res.data);
        })
        .catch((err) => console.log(err.response));
};

const handleRemove = (
    productWithQuantity,
    quantity,
    setQuantity,
    setTotalCost
) => {
    setQuantity((prevState) => prevState - 1);
    setTotalCost((prevState) => prevState - productWithQuantity.product.price);
    axios
        .patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
            {
                quantity: quantity - 1,
            },
            config
        )
        .then((res) => {
            console.log("just remove", res.data);
        })
        .catch((err) => console.log(err.response));
};

const handleDelete = (
    productWithQuantity,
    setProductWithQuantity,
    setOpen,
    sameCategoryProductsWithQuantityNotAddAsTrialInState,
    setSameCategoryProductsWithQuantityNotAddAsTrialInState,
    sameCategoryProductsWithQuantityAddAsTrialInState,
    setSameCategoryProductsWithQuantityAddAsTrialInState
) => {
    // ###### Most Important
    // when the productWithQuantity select for delete is added as trial
    // then only delete this one
    // when selected productWithQuantity is not added as trial
    // then find the all productWithQuantity for same category
    // if productWithQuantity of same category have more than 1 as not trial
    // then only delete this selected one
    // if productWithQuantity of same category have only one 1 as not trial
    // then delete this one and also all trial product, which will max 2
    // but if here have only 1 productWithQuantity of same category, not have trial
    // then obviously delete this selected one
    // ##########

    if (productWithQuantity.add_as_trial) {
        setProductWithQuantity(null);
        let newSameCategoryProductsWithQuantityAddAsTrialInState =
            sameCategoryProductsWithQuantityAddAsTrialInState.filter(
                (hereProductWithQuantity) =>
                    hereProductWithQuantity.id !== productWithQuantity.id
            );
        setSameCategoryProductsWithQuantityAddAsTrialInState(
            newSameCategoryProductsWithQuantityAddAsTrialInState
        );
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                config
            )
            .then((res) => {
                console.log("only trial deleted");
            })
            .catch((err) => console.log(err));
    } else if (
        sameCategoryProductsWithQuantityNotAddAsTrialInState.length > 1
    ) {
        setProductWithQuantity(null);
        let newSameCategoryProductsWithQuantityNotAddAsTrialInState =
            sameCategoryProductsWithQuantityNotAddAsTrialInState.filter(
                (hereProductWithQuantity) =>
                    hereProductWithQuantity.id !== productWithQuantity.id
            );
        setSameCategoryProductsWithQuantityNotAddAsTrialInState(
            newSameCategoryProductsWithQuantityNotAddAsTrialInState
        );
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                config
            )
            .then((res) => {
                console.log("only main deleted");
            })
            .catch((err) => console.log(err));
    } else {
        setProductWithQuantity(null);
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                config
            )
            .then((res) => {
                console.log("main deleted");
            })
            .catch((err) => console.log(err));

        if (sameCategoryProductsWithQuantityAddAsTrialInState.length !== 0) {
            sameCategoryProductsWithQuantityAddAsTrialInState.forEach(
                (singleSameCategoryProductsWithQuantityAddAsTrial) => {
                    setProductWithQuantity(null);
                    axios
                        .delete(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${singleSameCategoryProductsWithQuantityAddAsTrial.id}/`,
                            config
                        )
                        .then((res) => {
                            console.log("trial deleted");
                            setOpen(true);
                        })
                        .catch((err) => console.log(err));
                }
            );
        }
    }
};

export default function ProductWithQuantityInBagTableRow({ row, myBag }) {
    const [productWithQuantity, setProductWithQuantity] = useState(row);
    const [quantity, setQuantity] = useState(row.quantity);
    const [totalCost, setTotalCost] = useState(row.total_cost);
    const [open, setOpen] = useState(false);

    let sameCategoryProductsWithQuantityNotAddAsTrial =
        myBag.product_with_quantity.filter(
            (productWithQuantityInBag) =>
                !productWithQuantityInBag.add_as_trial &&
                productWithQuantityInBag.product.category ===
                    (productWithQuantity &&
                        productWithQuantity.product.category)
        );

    let sameCategoryProductsWithQuantityAddAsTrial =
        myBag.product_with_quantity.filter(
            (productWithQuantityInBag) =>
                productWithQuantityInBag.add_as_trial &&
                productWithQuantityInBag.product.category ===
                    (productWithQuantity &&
                        productWithQuantity.product.category)
        );

    const [
        sameCategoryProductsWithQuantityNotAddAsTrialInState,
        setSameCategoryProductsWithQuantityNotAddAsTrialInState,
    ] = useState(sameCategoryProductsWithQuantityNotAddAsTrial);
    const [
        sameCategoryProductsWithQuantityAddAsTrialInState,
        setSameCategoryProductsWithQuantityAddAsTrialInState,
    ] = useState(sameCategoryProductsWithQuantityAddAsTrial);

    // this is for alert close
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    if (productWithQuantity) {
        return (
            <>
                <TableRow key={productWithQuantity.id} hover>
                    <TableCell component="th" scope="row" align="center">
                        {productWithQuantity.product.name}
                    </TableCell>
                    <TableCell
                        style={{
                            width: 160,
                        }}
                        align="center"
                    >
                        {productWithQuantity.product.price}
                    </TableCell>
                    <TableCell
                        style={{
                            width: 160,
                        }}
                        align="center"
                    >
                        {!productWithQuantity.add_as_trial && (
                            <IconButton
                                color="error"
                                disabled={quantity < 2}
                                onClick={() =>
                                    handleRemove(
                                        productWithQuantity,
                                        quantity,
                                        setQuantity,
                                        setTotalCost
                                    )
                                }
                            >
                                <RemoveCircleIcon />
                            </IconButton>
                        )}

                        {quantity}
                        {!productWithQuantity.add_as_trial && (
                            <IconButton
                                color="error"
                                disabled={
                                    !productWithQuantity.product.is_available
                                }
                                onClick={() =>
                                    handleAdd(
                                        productWithQuantity,
                                        quantity,
                                        setQuantity,
                                        setTotalCost
                                    )
                                }
                            >
                                <AddCircleIcon />
                            </IconButton>
                        )}
                    </TableCell>
                    <TableCell
                        style={{
                            width: 160,
                        }}
                        align="center"
                    >
                        {!productWithQuantity.add_as_trial ? (
                            totalCost
                        ) : (
                            <Chip
                                label="Free Trial"
                                color="secondary"
                                size="small"
                            />
                        )}
                    </TableCell>

                    <TableCell
                        style={{
                            width: 160,
                        }}
                        align="center"
                    >
                        <IconButton
                            color="error"
                            onClick={() =>
                                handleDelete(
                                    productWithQuantity,
                                    setProductWithQuantity,
                                    setOpen,
                                    sameCategoryProductsWithQuantityNotAddAsTrialInState,
                                    setSameCategoryProductsWithQuantityNotAddAsTrialInState,
                                    sameCategoryProductsWithQuantityAddAsTrialInState,
                                    setSameCategoryProductsWithQuantityAddAsTrialInState
                                )
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>

                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert severity="info" variant="filled">
                        <AlertTitle>
                            Trial Products of This Similar Product are Deleted!
                        </AlertTitle>
                        You Need At Least 1 Similar Product to Trail Max 2
                        Similar Products.
                    </Alert>
                </Snackbar>
            </>
        );
    } else {
        return <></>;
    }
}
