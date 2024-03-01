const express = require("express");
const { SettingModel } = require("../model/settingModel");
const bcrypt = require("bcrypt");
const { authenticateToken } = require("../middleware/tokenMiddleware");
const settingRouter = express.Router();

// @hasim to add new object in db
// settingRouter.post('/logo', authenticateToken, async (req, res) => {
//     try {
//         let logo = req.body.logo;
//         let added = new SettingModel({ logo });
//         await added.save();

//         res.status(200).json({ issue: false })
//     } catch (error) {
//         res.status(400).json({ error: error.message, issue: true});
//     }
// })


// @hasim to update the logo
settingRouter.patch('/logo/update', authenticateToken, async (req, res) => {
    try {
        let logo = req.body.logo;
        let obj = await SettingModel.findOne();
        obj.logo = logo;
        await obj.save();
        res.status(200).json({ issue: false, logo: logo })
    } catch (error) {
        res.status(400).json({ error: error.message, issue: true });
    }
})
// @hasim to get dynamic links
settingRouter.get('/dynamiclinks/get', async (req, res) => {
    try {
        let obj = await SettingModel.findOne();
        res.status(200).json({ issue: false, data: obj })
    } catch (error) {
        res.status(400).json({ error: error.message, issue: true });
    }
})
// @hasim to update dynamic links
settingRouter.patch('/dynamiclinks/update', authenticateToken, async (req, res) => {
    try {
        let links = req.body;
        let obj = await SettingModel.findOne();
        obj.dyanamicLinks = links;
        await obj.save();
        res.status(200).json({ issue: false, data: obj })
    } catch (error) {
        res.status(400).json({ error: error.message, issue: true });
    }
})
module.exports = {
    settingRouter
}