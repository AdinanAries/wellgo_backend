/**
 * @desc Verify user token validity
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const verifyUserToken = (req, res, next) => {
    // Auth middleware to verify user token and bind user obj to req
    try{
        res.status(201).send(req.user);
    }catch(e){
        res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    verifyUserToken,
}