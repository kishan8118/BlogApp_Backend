const mongoose = require("mongoose");

const settingSchema = mongoose.Schema(
    {
        logo: {
            type: String,
            trim: true,
        },
        dyanamicLinks: {
            type: [Object],
        }
    },
    { timestamps: true }
);

const SettingModel = mongoose.model("setting", settingSchema);

module.exports = { SettingModel };
