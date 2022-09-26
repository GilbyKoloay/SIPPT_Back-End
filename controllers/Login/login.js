const db = require('../../models/Employees');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '6h'});
};

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        // username checking
        const usernameResult = await db.findOne({ username });
        if(!usernameResult) {
            return res.status(404).json({
                status: `error`,
                msg: `Nama Pengguna tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        // password checking
        const passwordResult = await db.findOne({
            username,
            password, 
        }).select({ "password": 0 });
        if(!passwordResult) {
            return res.status(404).json({
                status: `error`,
                msg: `Kata Sandi salah`,
                desc: null,
                data: null,
            });
        }

        // create token
        const token = createToken(passwordResult._id);

        res.status(200).json({
            status: `success`,
            msg: `Berhasil melakukan login`,
            desc: null,
            data: {
                ...passwordResult._doc,
                token,
            },
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal melakukan login`,
            desc: e.message,
            data: null,
        });
    }
};
