const express = require("express");
const router = express.Router();

let { products } = require("../server");

router.post("/", (req, res) => {
    let isTitle = products.find((item) => item.title === req.body.title);
    if (isTitle) {
        return res.status(400).json({
            msg: "Siz kiritgan nomdagi mahsulot mavjud!",
            variant: "warning",
            payload: null
        });
    }
    let newProduct = {
        id: new Date().getTime(),
        ...req.body
    };
    products.push(newProduct);

    res.status(201).json({
        msg: "Yangi mahsulot qo'shildi",
        variant: "success",
        payload: newProduct
    });
});

router.get("/", (req, res) => {
    if (!products.length) {
        return res.status(400).json({
            msg: "Malumot topilmadi",
            variant: "error",
            payload: null
        });
    }
    res.status(200).json({
        msg: "Barcha ma'lumot topildi",
        variant: "success",
        payload: products,
        totalCount: products.length
    });
});

router.put("/:id", (req, res) => {
    let { id } = req.params;
    let index = products.findIndex(pro => pro.id === +id);
    if (index < 0) {
        return res.status(400).json({
            msg: "Bu mahsulot mavjud emas",
            variant: "error",
            payload: null
        });
    }
    let editProduct = {
        id: +id,
        ...req.body
    };
    products.splice(index, 1, editProduct);

    res.status(201).json({
        msg: "Ma'lumot o'zgartirildi",
        variant: "success",
        payload: editProduct
    });
});

router.delete("/:id", (req, res) => {
    let { id } = req.params;
    let index = products.findIndex(pro => pro.id === +id);
    if (index < 0) {
        return res.status(400).json({
            msg: "Bu mahsulot mavjud emas",
            variant: "error",
            payload: null
        });
    }
    products.splice(index, 1);
    res.status(200).json({
        msg: "Ma'lumot o'chirildi",
        variant: "success",
        payload: null
    });
});

module.exports = router;
