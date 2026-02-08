import { tutorServices } from "./tutor.service";
const createTutor = async (req, res) => {
    const user_id = req.user?.id;
    try {
        const result = await tutorServices.createTutor(req.body, user_id);
        console.log(result);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const getTutors = async (req, res) => {
    const { search } = req.query;
    const category = Number(req.query.category) || undefined;
    const rating = Number(req.query.rating) || undefined;
    const price = Number(req.query.price) || undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    try {
        const tutors = await tutorServices.getTutors({
            search: search,
            category,
            rating,
            price,
            limit,
            skip,
        });
        res.status(200).json({
            success: true,
            data: tutors,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const getSingleTutor = async (req, res) => {
    const tutorId = req.params.tutorId;
    try {
        const tutor = await tutorServices.getSingleTutor(tutorId);
        res.status(200).json({
            success: true,
            data: tutor,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
// ! update schedule service
const updateSchedule = async (req, res) => {
    const tutorId = req.params.tutorId;
    const scheduleData = req.body;
    try {
        const updatedSchedule = await tutorServices.updateSchedule(tutorId, scheduleData);
        res.status(200).json({
            success: true,
            data: updatedSchedule,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const updateTutor = async (req, res) => {
    const tutorId = req.params.tutorId;
    const updateData = req.body;
    try {
        const updateTutorData = await tutorServices.updateTutor(tutorId, updateData);
        res.status(200).json({
            success: true,
            data: updateTutorData,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const updateFeatured = async (req, res) => {
    const tutorId = req.params.tutorId;
    const { featured } = req.body;
    try {
        const updatedTutor = await tutorServices.updateFeatured(tutorId, featured);
        res.status(200).json({
            success: true,
            data: updatedTutor,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
const deleteTutor = async (req, res) => {
    const tutorId = req.params.tutorId;
    try {
        const deletedTutor = await tutorServices.deleteTutor(tutorId);
        res.status(200).json({
            success: true,
            data: deletedTutor,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
        console.log(err);
    }
};
export const tutorController = {
    createTutor,
    getTutors,
    deleteTutor,
    getSingleTutor,
    updateSchedule,
    updateTutor,
    updateFeatured,
};
//# sourceMappingURL=tutor.controller.js.map