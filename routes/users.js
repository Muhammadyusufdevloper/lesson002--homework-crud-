const express = require("express");
const router = express.Router();

let { users } = require("../server");

router.post("/", (req, res) => {
    let isUsername = users.find((item) => item.username === req.body.username);
    if (isUsername) {
        return res.status(400).json({
            msg: "Siz kiritgan username allaqachon band qilingan",
            variant: "warning",
            payload: null
        });
    }
    let newUser = {
        id: new Date().getTime(),
        ...req.body
    };
    users.push(newUser);

    res.status(201).json({
        msg: "Yangi ma'lumot qo'shildi",
        variant: "success",
        payload: newUser
    });
});

router.get("/", (req, res) => {
    if (!users.length) {
        return res.status(400).json({
            msg: "Malumot topilmadi",
            variant: "error",
            payload: null
        });
    }
    res.status(200).json({
        msg: "Barcha ma'lumot topildi",
        variant: "success",
        payload: users,
        totalCount: users.length
    });
});

router.put("/:id", (req, res) => {
    let { id } = req.params;
    let index = users.findIndex(pro => pro.id === +id);
    if (index < 0) {
        return res.status(400).json({
            msg: "Bu foydalanuvchi mavjud emas",
            variant: "error",
            payload: null
        });
    }
    let editUser = {
        id: +id,
        ...req.body
    };
    users.splice(index, 1, editUser);

    res.status(201).json({
        msg: "Ma'lumot o'zgartirildi",
        variant: "success",
        payload: editUser
    });
});

router.delete("/:id", (req, res) => {
    let { id } = req.params;
    let index = users.findIndex(pro => pro.id === +id);
    if (index < 0) {
        return res.status(400).json({
            msg: "Bu foydalanuvchi mavjud emas",
            variant: "error",
            payload: null
        });
    }
    users.splice(index, 1);
    res.status(200).json({
        msg: "Ma'lumot o'chirildi",
        variant: "success",
        payload: null
    });
});

module.exports = router;
