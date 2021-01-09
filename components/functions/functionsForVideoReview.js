import axios from 'axios';

export const handleSubmitForVideoReview = (
    values,
    setSubmitting,
    resetForm,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    config,
    setLoading
) => {
    // start loading
    setLoading(true);

    const videoReview = {
        link: values.link,
        product: product.id,
    };

    console.log('clicked myBag', myBag);
    console.log('clicked config', config);
    axios
        .post(
            'http://localhost:8000/video-reviews-create/',
            videoReview,
            config
        )
        .then((res) => {
            console.log(res.data);
            // final get will be after all post, patch done
            axios
                .get(`http://localhost:8000/products/${product.slug}/`)
                .then((res) => {
                    changeProduct(res.data);
                    axios
                        .get(
                            `http://localhost:8000/my-bag/${myBag.id}/`,
                            config
                        )
                        .then((res) => {
                            changeMyBag(res.data);
                            setSubmitting(false);
                            resetForm();
                            // need to clear form
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
};

export const handleAgreeForVideoReview = (
    stringifyReview,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    user,
    config,
    setLoading
) => {
    // start loading
    setLoading(true);

    const videoReview = JSON.parse(stringifyReview);

    // ####### Process of agreed
    // 1st check this user is equal to the videoReview made user or not
    // if same user, then user can't add agreed
    // if the user of this videoReview is not same requested user
    // then check, is this user already agreed or not
    // if user already agreed than also show a msg, you cant agreed
    // if user not same of creator and also not agreed yet then the process will start
    // update the agreed backed with this user,
    // ### if this user disagreed before then need to remove from disagreed
    // so remove this user from disagreed and finally get updated product and bag for re render
    // ## if user not disagreed before then just get updated product and bag for re render
    // Done #######

    // ######### All in all, User can not agreed and disagreed at a time

    // check user who own this videoReview,then user can't make agreed
    // also check, user already agreed or not
    // if already agreed then can not agreed now
    if (
        !videoReview.videoreviewcountforagree.user.includes(user.pk) &&
        videoReview.user.pk !== user.pk
    ) {
        const videoReviewCountForAgree = {
            agreed: videoReview.videoreviewcountforagree.agreed + 1,
            user: videoReview.videoreviewcountforagree.user.concat(user.pk),
        };

        axios
            .patch(
                `http://localhost:8000/video-reviews-count-for-agree-update/${videoReview.videoreviewcountforagree.id}/`,
                videoReviewCountForAgree,
                config
            )
            .then((res) => {
                // here, if user disagreed before then need to remove from disagreed
                // because User can not agreed and disagreed at a time
                if (
                    videoReview.videoreviewcountfordisagree.user.includes(
                        user.pk
                    )
                ) {
                    let arr = videoReview.videoreviewcountfordisagree.user;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === user.pk) {
                            arr.splice(i, 1);
                            i--;
                        }
                    }
                    const videoReviewCountForDisagree = {
                        disagreed:
                            videoReview.videoreviewcountfordisagree.disagreed -
                            1,
                        user: arr,
                    };

                    axios
                        .patch(
                            `http://localhost:8000/video-reviews-count-for-disagree-update/${videoReview.videoreviewcountfordisagree.id}/`,
                            videoReviewCountForDisagree,
                            config
                        )
                        .then((res) => {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `http://localhost:8000/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `http://localhost:8000/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    // final get will be after all post, patch done
                    axios
                        .get(`http://localhost:8000/products/${product.slug}/`)
                        .then((res) => {
                            changeProduct(res.data);
                            axios
                                .get(
                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                    config
                                )
                                .then((res) => {
                                    changeMyBag(res.data);
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                }
            })
            .catch((err) => console.log(err.response));
    } else {
        console.log('you cant agree with your own review or already done');
    }
};

export const handleDisagreeForVideoReview = (
    stringifyReview,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    user,
    config,
    setLoading
) => {
    // start loading
    setLoading(true);

    const videoReview = JSON.parse(stringifyReview);

    // ###########  Same process like agreed
    // ######### All in all, User can not agreed and disagreed at a time

    // check user who own this videoReview, then user can't make disagreed
    // also check, user already disagreed or not
    // if already disagreed then can not disagreed now
    if (
        !videoReview.videoreviewcountfordisagree.user.includes(user.pk) &&
        videoReview.user.pk !== user.pk
    ) {
        const videoReviewCountForDisagree = {
            disagreed: videoReview.videoreviewcountfordisagree.disagreed + 1,
            user: videoReview.videoreviewcountfordisagree.user.concat(user.pk),
        };

        axios
            .patch(
                `http://localhost:8000/video-reviews-count-for-disagree-update/${videoReview.videoreviewcountfordisagree.id}/`,
                videoReviewCountForDisagree,
                config
            )
            .then((res) => {
                // here, if user agreed before then need to remove from agreed
                // because User can not agreed and disagreed at a time

                if (
                    videoReview.videoreviewcountforagree.user.includes(user.pk)
                ) {
                    let arr = videoReview.videoreviewcountforagree.user;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === user.pk) {
                            arr.splice(i, 1);
                            i--;
                        }
                    }
                    const videoReviewCountForAgree = {
                        agreed: videoReview.videoreviewcountforagree.agreed - 1,
                        user: arr,
                    };

                    axios
                        .patch(
                            `http://localhost:8000/video-reviews-count-for-agree-update/${videoReview.videoreviewcountforagree.id}/`,
                            videoReviewCountForAgree,
                            config
                        )
                        .then((res) => {
                            // final get will be after all post, patch done
                            axios
                                .get(
                                    `http://localhost:8000/products/${product.slug}/`
                                )
                                .then((res) => {
                                    changeProduct(res.data);
                                    axios
                                        .get(
                                            `http://localhost:8000/my-bag/${myBag.id}/`,
                                            config
                                        )
                                        .then((res) => {
                                            changeMyBag(res.data);
                                        })
                                        .catch((err) =>
                                            console.log(err.response)
                                        );
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                } else {
                    // final get will be after all post, patch done
                    axios
                        .get(`http://localhost:8000/products/${product.slug}/`)
                        .then((res) => {
                            changeProduct(res.data);
                            axios
                                .get(
                                    `http://localhost:8000/my-bag/${myBag.id}/`,
                                    config
                                )
                                .then((res) => {
                                    changeMyBag(res.data);
                                })
                                .catch((err) => console.log(err.response));
                        })
                        .catch((err) => console.log(err.response));
                }
            })
            .catch((err) => console.log(err.response));
    } else {
        console.log('you cant disagree with your review or already done');
    }
};

export const handleUpdateForVideoReview = (
    values,
    setSubmitting,
    videoReviewId,
    setOpen,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    config,
    setLoading
) => {
    // start loading
    setLoading(true);

    const videoReviewUpdate = {
        link: values.link,
    };

    axios
        .patch(
            `http://localhost:8000/video-reviews/${videoReviewId}/`,
            videoReviewUpdate,
            config
        )
        .then((res) => {
            // final get will be after all post, patch done
            axios
                .get(`http://localhost:8000/products/${product.slug}/`)
                .then((res) => {
                    changeProduct(res.data);
                    axios
                        .get(
                            `http://localhost:8000/my-bag/${myBag.id}/`,
                            config
                        )
                        .then((res) => {
                            changeMyBag(res.data);
                            setSubmitting(false);
                            setOpen(false);
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
};

export const handleDeleteForVideoReview = (
    videoReviewId,
    setOpen,
    product,
    myBag,
    changeProduct,
    changeMyBag,
    config,
    setLoading
) => {
    // start loading
    setLoading(true);

    axios
        .delete(`http://localhost:8000/video-reviews/${videoReviewId}/`, config)
        .then((res) => {
            // final get will be after all post, patch done
            axios
                .get(`http://localhost:8000/products/${product.slug}/`)
                .then((res) => {
                    changeProduct(res.data);
                    axios
                        .get(
                            `http://localhost:8000/my-bag/${myBag.id}/`,
                            config
                        )
                        .then((res) => {
                            changeMyBag(res.data);
                            setOpen(false);
                        })
                        .catch((err) => console.log(err.response));
                })
                .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
};
