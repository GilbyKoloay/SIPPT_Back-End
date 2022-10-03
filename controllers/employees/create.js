const db = require('../../models/Employees');
const mongoose = require('mongoose');

// create new data in Employees collections
module.exports = async (req, res) => {
    const { _employee, username, password, name, role } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.create({
            username,
            password,
            name,
            role,
            changeLog: [{
                _changedBy: _employee,
                description: "Menambah pegawai baru",
            }],
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
