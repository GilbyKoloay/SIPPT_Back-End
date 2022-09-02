const db = require('../../models/Employees');
const mongoose = require('mongoose');

// change data in Employees collections
module.exports = async (req, res) => {
    const { _id, username, password, role } = req.body;

    try {
        const result = await db.updateOne({
            _id,
        }, {
            username,
            password,
            role,
        });

        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengubah data Pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengubah data Pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
