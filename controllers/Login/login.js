const db = require('../../models/Employees');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '12h'});
};

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        // const test = await db.find();
        // console.log(`test`, test);

        // const dbConnect = dbo.getDb();
        
        

        // username checking
        const usernameResult = await db.findOne({ username });
        if(!usernameResult) {
            return res.status(404).json({
                status: "error",
                msg: `Nama pengguna tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        // password checking
        const passwordResult = await db.findOne({
            username,
            password, 
        }).select({
            password: 0,
            __v: 0,
            changeLog: 0,
        });
        if(!passwordResult) {
            return res.status(404).json({
                status: "error",
                msg: `Kata sandi salah`,
                desc: null,
                data: null,
            });
        }

        // create token
        const token = createToken(passwordResult._id);

        res.status(200).json({
            status: "success",
            msg: `Berhasil melakukan login`,
            desc: null,
            data: {
                ...passwordResult._doc,
                __token: token,
            },
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal melakukan login`,
            desc: e.message,
            data: null,
        });
    }
};
