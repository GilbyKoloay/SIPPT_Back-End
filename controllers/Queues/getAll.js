const db = require('../../models/Queues');
const mongoose = require('mongoose');

// get all data in Queues collections
module.exports = async (req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(404).json({
                status: "error",
                msg: `Data antrian kosong`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil semua data antrian`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil semua data antrian`,
            desc: e.message,
            data: null,
        });
    }
};
