const db = require('../../models/Employees');
const mongoose = require('mongoose');

// create new data in Employees collections
module.exports = async (req, res) => {
    const { username, password, name, role, /* _employee */ } = req.body;

    try {
        const result = await db.create({
            username,
            password,
            name,
            role,
            // changeLog: [{
            //     _changedBy: _employee,
            // }],
        });

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan pegawai baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan pegawai baru`,
            desc: e.message,
            data: null,
        });
    }
};
