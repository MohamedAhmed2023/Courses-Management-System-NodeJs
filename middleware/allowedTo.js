module.exports = (...roles) => {
    console.log("roles", roles)
    return (req, res, next) => {
        if (!roles.includes(req.currentuser.role)) {
            next(res.status(401).json({ status: "error", message: "you are not allowed to do this action" }))
        }
    }

}