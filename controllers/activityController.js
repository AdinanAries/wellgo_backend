const ActivityLog = require('../models/activityLog');
const ErrorLog = require('../models/errorLog');
const FailedBookingLog = require('../models/failedBookingLog');
const BookingIntentLog = require("../models/bookingIntentLog");

const asyncHandler = require("express-async-handler");

/**
 * @desc Logs user general activity
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Public
 */
const logActivity = asyncHandler( async (req, res, next) => {
    try {
        const { 
            resource_id,
            resource_type,
            client,
            title,
            body,
            type
        } = req.body;

        let activityLog = new ActivityLog({
            resource_id: resource_id,
            resource_type: resource_type,
            client: client,
            title: title,
            body: body,
            type: type
        });
        activityLog.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                resource_id: result.resource_id,
                resource_type: result.resource_type,
                client: result.client,
                title: result.title,
                body: result.body,
                type: result.type,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Activity not Logged - from server error'});
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"})
    }
});

/**
 * @desc Logs Warnings and Errors
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const logError = asyncHandler( async (req, res, next) => {
    try {
        const { 
            resource_id,
            resource_type,
            client,
            title,
            body,
            type
        } = req.body;

        let errorLog = new ErrorLog({
            resource_id: resource_id,
            resource_type: resource_type,
            client: client,
            title: title,
            body: body,
            type: type
        });
        errorLog.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                resource_id: result.resource_id,
                resource_type: result.resource_type,
                client: result.client,
                title: result.title,
                body: result.body,
                type: result.type,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Error not Logged - from server error'});
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"})
    }
});

/**
 * @desc Logs Warnings and Errors
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const logFailedBookings = asyncHandler( async (req, res, next) => {
    try {
        const { 
            resource_id,
            resource_type,
            client,
            title,
            body,
            type
        } = req.body;

        let failedBookingLog = new FailedBookingLog({
            resource_id: resource_id,
            resource_type: resource_type,
            client: client,
            title: title,
            body: body,
            type: type
        });
        failedBookingLog.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                resource_id: result.resource_id,
                resource_type: result.resource_type,
                client: result.client,
                title: result.title,
                body: result.body,
                type: result.type,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Error not Logged - from server error'});
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"})
    }
});

const createBookingIntent = asyncHandler( async (req, res, next) =>{
    try{
        const {
            payment_intent,
            booking_order
        } = req.body;

        let bookingIntent = new BookingIntentLog({
            payment_status: "",
            booking_status: "",
            payment_intent: payment_intent,
            booking_order: booking_order,
        });

        bookingIntent.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                payment_status: result.payment_status,
                booking_status: result.booking_status,
                payment_intent: result.payment_intent,
                booking_order: result.booking_order,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({
                message: "Could not create Booking Intent Log"
            });
        })

    }catch(e){
        console.log(e);
        res.status(500).send({message: "Server Error"});
    }

});

module.exports = {
    logActivity,
    logError,
    logFailedBookings,
    createBookingIntent,
}