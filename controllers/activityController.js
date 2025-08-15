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
        res.status(500).send({message: "Server Error"});
    }
});

const createBookingIntent = asyncHandler( async (req, res, next) =>{
    try{
        const {
            payment_intent,
            booking_order,
            product_type,
        } = req.body;

        const oc_user_id = (req?.body?.oc_user_id || "welldugo-non-agent-booking");

        let bookingIntent = new BookingIntentLog({
            oc_user_id: oc_user_id,
            product_type: (product_type || ""),
            payment_status: payment_intent?.status,
            booking_status: "order_initiated",
            payment_intent: payment_intent,
            booking_order: booking_order,
        });

        bookingIntent.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                product_type: result.product_type,
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

const addIntentUpdate = asyncHandler( async (req, res, next) => {
    try{
        let intent = req?.body;
        let bi = await BookingIntentLog.findById(intent?._id);
        if(!bi){
            res.status(500).send({message: "booking intent not found"});
        }
        // Add latest update to intentUpdates    
        bi.payment_intent = intent?.payment_intent;
        bi.payment_status = intent?.payment_intent?.status;
        bi.booking_order = intent?.booking_order;
        const updated_bi = new BookingIntentLog(bi);
        updated_bi.save().then((result) => {
            res.status(201).send(result);
        }).catch((err) => {
            res.status(500).send({message: err.message});
        });
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
    addIntentUpdate,
}