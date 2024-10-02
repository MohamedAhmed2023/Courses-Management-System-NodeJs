module.exports = function (asyncfn) {
    return function (req, res, next) {
        asyncfn(req, res, next).catch((err) => {
            next(err)
        });
    }
}