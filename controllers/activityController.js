const User = require('../models/user'); 
const asyncHandler = require("express-async-handler");

/**
 * @desc Logs user general activity
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Public
 */
const logActivity = asyncHandler( async (req, res, next) => {
    
});

/**
 * @desc Logs Warnings and Errors
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const logWarning = asyncHandler( async (req, res, next) => {
    
});

/**
 * @desc Logs Warnings and Errors
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const logFailedBookings = asyncHandler( async (req, res, next) => {
    
});

module.exports = {
    logActivity,
    logWarning,
    logFailedBookings,
}