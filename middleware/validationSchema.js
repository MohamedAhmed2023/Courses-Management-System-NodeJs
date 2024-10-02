const { body } = require('express-validator')

const validationSchema = () => {
    return [
        body('title').notEmpty().withMessage("Title Not Found").isLength({ min: 2 }).withMessage("min lenght is 2"), body('price').notEmpty().withMessage("Price Not Found")
    ]
}

module.exports = validationSchema;