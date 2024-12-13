const { Announcement } = require("../../Models")

const addAnnouncement = (req, res) => {
    try {
        const {title, description} = req.body
        const announcement = new Announcement({title: title, description: description})
        announcement.save().then(()=>{
            return res.json({
                success: true,
                message: "Announcement added"
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getAnnouncements = (req, res) => {
    try {
        Announcement.find().sort({createdAt: -1}).then(data => {
            return res.json({
                success: true,
                data
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteAnnouncement = (req, res) => {
    try {
        const {id} = req.body
        // console.log(id);
        Announcement.findByIdAndDelete(id).then(() => {
            return res.json({
                success: true,
                message: "Announcement deleted"
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {addAnnouncement, getAnnouncements, deleteAnnouncement}