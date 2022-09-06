const db = require('../../models/Employees');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        // username checking
        const usernameResult = await db.findOne({
            username,
        });
        if(!usernameResult) {
            return res.status(404).json({
                status: `error`,
                msg: `Nama Pengguna tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        // password checking
        const passwordResult = await db.findOne({ password });
        if(!passwordResult) {
            return res.status(404).json({
                status: `error`,
                msg: `Kata Sandi salah`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: `success`,
            msg: `Berhasil melakukan login`,
            desc: null,
            data: passwordResult,
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
