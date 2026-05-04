const mongoose = require("mongoose");
const { Schema } = mongoose;

const iconSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    tags: {
        type: [String]
    },
    filename: {
        type: String
    },
    svgCode: {
        type: String
    },
    reactTaker: {
        type: String
    },
    fontTaker: {
        type: String
    },
    flutterTaker: {
        type: String
    }
});


const Icon = mongoose.model("Icon", iconSchema);

exports.Icon = Icon;
exports.iconSchema = iconSchema;