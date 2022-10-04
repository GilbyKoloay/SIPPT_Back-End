const db = require('../../models/Queues');
const mongoose = require('mongoose');

// delete data in Queues collections
module.exports = async (req, res) => {
    const { _id, _finishedBy, where } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID antrian tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let data = await db.findOne({}, { __v: 0 });
        if(!data[where].find(q => q._id.toString() === _id)) {
            return res.status(404).json({
                status: "error",
                msg: `Antrian tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        data[where].map(q => {
            if(q._id.toString() === _id) {
                q._finishedBy = _finishedBy;
                q.finishedAt = new Date();
                q.status = "SUDAH DILAYANI";
            }
        });
        
        const result = await db.updateOne(data);

        res.status(200).json({
            status: "success",
            msg: `Berhasil menghapus data antrian`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menghapus data antrian`,
            desc: e.message,
            data: null,
        });
    }
};
