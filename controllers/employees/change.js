const db = require('../../models/Employees');
const mongoose = require('mongoose');

// change data in Employees collections
module.exports = async (req, res) => {
    const { _id, username, password, role } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.updateOne({ _id, }, {
            username,
            password,
            role,
        });

        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
