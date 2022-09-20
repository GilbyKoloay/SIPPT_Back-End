const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new data in Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        receiveTotal,
    } = req.body;
    
    try {
        const result = await db.updateOne({ _id }, { $push: {
            drug: {
                receiveTotal,
            },
        }});

        res.status(200).json({
            status: `success`,
            msg: `Berhasil menambahkan Obat baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan Obat baru`,
            desc: e.message,
            data: null,
        });
    }
};
