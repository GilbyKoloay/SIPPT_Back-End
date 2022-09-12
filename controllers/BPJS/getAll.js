const db = require('../../models/BPJS');
const mongoose = require('mongoose');

//  get all data in BPJS collections
module.exports = async (req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(200).json({
                status: `error`,
                msg: `Data BPJS kosong`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil semua data BPJS`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil semua data BPJS`,
            desc: e.message,
            data: null,
        });
    }
};
