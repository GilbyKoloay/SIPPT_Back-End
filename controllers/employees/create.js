const db = require('../../models/Employees');
const mongoose = require('mongoose');

// create new data in Employees collections
module.exports = async (req, res) => {
    const { username, password, name, role } = req.body;

    try {
        const result = await db.create({
            username,
            password,
            name,
            role,
        });

        res.status(200).json({
            status: `success`,
            msg: `Berhasil menambahkan Pegawai baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan Pegawai baru`,
            desc: e.message,
            data: null,
        });
    }
};
