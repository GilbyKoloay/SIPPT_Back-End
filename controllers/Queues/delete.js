const db = require('../../models/Queues');
const mongoose = require('mongoose');

// delete data in Queues collections
module.exports = async (req, res) => {
    const { where, _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID antrian tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let data = await db.findOne();
        data[where] = data[where].filter(r => r._id.toString() !== _id);
        
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
