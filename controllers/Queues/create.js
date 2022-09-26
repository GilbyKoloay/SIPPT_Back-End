const db = require('../../models/Queues');
const mongoose = require('mongoose');

// create new data in Queues collections
module.exports = async (req, res) => {
    const {
        where,
        _createdBy,
        _patient,
        _finishedBy,
        status,
    } = req.body;

    try {
        if(where !== 'poliUmum' && where !== 'poliGigi' && where !== 'poliKIA') {
            return res.status(400).json({
                status: "error",
                msg: `Gagal menambahkan antrian baru`,
                desc: `Tujuan antrian salah atau tidak ada`,
                data: null,
            });
        }

        const values = {
            _createdBy,
            _patient,
            _finishedBy,
            status,
        };

        // dev (use this to create doc in 'Queues' collection)
        // const result = await db.create({
        //     poliUmum: [],
        //     poliGigi: [],
        //     poliKIA: [],
        // });

        const result = await db.updateOne({ $push: { [where]: values } });

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan antrian baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan antrian baru`,
            desc: e.message,
            data: null,
        });
    }
};
