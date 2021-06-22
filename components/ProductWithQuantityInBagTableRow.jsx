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
    setTotalCost,
    setSubTotal
) => {
    setQuantity((prevState) => prevState + 1);
    setTotalCost((prevState) => prevState + productWithQuantity.product.price);
    setSubTotal((prevState) => prevState + productWithQuantity.product.price);
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
    setTotalCost,
    setSubTotal
) => {
    setQuantity((prevState) => prevState - 1);
    setTotalCost((prevState) => prevState - productWithQuantity.product.price);
    setSubTotal((prevState) => prevState - productWithQuantity.product.price);
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
    myBag,
    setMyBag,
    productWithQuantity,
    setOpen,
    totalCost
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
        const newAllProductWithQuantityWithoutDeletedOne =
            myBag.product_with_quantity.filter(
                (singleProductWithQuantity) =>
                    singleProductWithQuantity.id !== productWithQuantity.id
            );
        const newMyBag = {
            ...myBag,
            sub_total: myBag.sub_total - totalCost,
            product_with_quantity: newAllProductWithQuantityWithoutDeletedOne,
        };
        setMyBag(newMyBag);
        axios
            .delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                config
            )
            .then((res) => {
                console.log("only trial deleted");
            })
            .catch((err) => console.log(err));
    } else {
        // ##### if productWithQuantity not add as trial
        // check is there other same category productWithQuantity available
        // if available then just delete this one
        const sameCategoryProductWithQuantityNotAddAsTrial =
            myBag.product_with_quantity.filter(
                (singleProductWithQuantity) =>
                    singleProductWithQuantity.product.category.id ===
                        productWithQuantity.product.category.id &&
                    singleProductWithQuantity.add_as_trial === false
            );
        if (sameCategoryProductWithQuantityNotAddAsTrial.length > 1) {
            const newAllProductWithQuantityWithoutDeletedOne =
                myBag.product_with_quantity.filter(
                    (singleProductWithQuantity) =>
                        singleProductWithQuantity.id !== productWithQuantity.id
                );
            const newMyBag = {
                ...myBag,
                sub_total: myBag.sub_total - totalCost,
                product_with_quantity:
                    newAllProductWithQuantityWithoutDeletedOne,
            };
            setMyBag(newMyBag);
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
            // ###### if there is only this same category productWithQuantity available in bag
            // then delete this one, and also delete others same category trial
            const sameCategoryProductWithQuantityAddAsTrial =
                myBag.product_with_quantity.filter(
                    (singleProductWithQuantity) =>
                        singleProductWithQuantity.product.category.id ===
                            productWithQuantity.product.category.id &&
                        singleProductWithQuantity.add_as_trial === true
                );

            let newAllProductWithQuantityWithoutDeletedOneAndTrials =
                myBag.product_with_quantity.filter(
                    (singleProductWithQuantity) =>
                        singleProductWithQuantity.id !== productWithQuantity.id
                );

            if (sameCategoryProductWithQuantityAddAsTrial.length !== 0) {
                sameCategoryProductWithQuantityAddAsTrial.map(
                    (singleSameCategoryProductWithQuantityAddAsTrial) => {
                        newAllProductWithQuantityWithoutDeletedOneAndTrials =
                            newAllProductWithQuantityWithoutDeletedOneAndTrials.filter(
                                (singleProductWithQuantity) =>
                                    singleProductWithQuantity.id !==
                                    singleSameCategoryProductWithQuantityAddAsTrial.id
                            );
                    }
                );
            }

            const newMyBag = {
                ...myBag,
                sub_total: myBag.sub_total - totalCost,
                product_with_quantity:
                    newAllProductWithQuantityWithoutDeletedOneAndTrials,
            };
            setMyBag(newMyBag);
            setOpen(true);
            console.log("last");
            axios
                .delete(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${productWithQuantity.id}/`,
                    config
                )
                .then((res) => {
                    console.log("main deleted");
                })
                .catch((err) => console.log(err));
            // finally delete trial

            sameCategoryProductWithQuantityAddAsTrial.forEach(
                (singleSameCategoryProductsWithQuantityAddAsTrial) => {
                    axios
                        .delete(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/product-with-quantity/${singleSameCategoryProductsWithQuantityAddAsTrial.id}/`,
                            config
                        )
                        .then((res) => {
                            console.log("trial deleted");
                        })
                        .catch((err) => console.log(err));
                }
            );
        }
    }
};

export default function ProductWithQuantityInBagTableRow({
    myBag,
    setMyBag,
    productWithQuantity,
    setSubTotal,
}) {
    const [quantity, setQuantity] = useState(productWithQuantity.quantity);
    const [totalCost, setTotalCost] = useState(productWithQuantity.total_cost);
    const [open, setOpen] = useState(false);

    // this is for alert close
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

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
                                    setTotalCost,
                                    setSubTotal
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
                            disabled={!productWithQuantity.product.is_available}
                            onClick={() =>
                                handleAdd(
                                    productWithQuantity,
                                    quantity,
                                    setQuantity,
                                    setTotalCost,
                                    setSubTotal
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
                                myBag,
                                setMyBag,
                                productWithQuantity,
                                setOpen,
                                totalCost
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
                    You Need At Least 1 Similar Product to Trail Max 2 Similar
                    Products.
                </Alert>
            </Snackbar>
        </>
    );
}
