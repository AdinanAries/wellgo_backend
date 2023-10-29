const addLog = (req, res, next) => {
    res.status(200).send("Logged Booking");
}

const getLog = (req, res, next) => {
    res.status(200).send("Getting single Booking Log");
}

const getLogs = (req, res, next) => {
    res.status(200).send("Getting All Booking Logs of current User")
}

module.exports = {
    addLog,
    getLog,
    getLogs
}