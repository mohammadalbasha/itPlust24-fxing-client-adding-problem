import  { check } from 'express-validator' ;

const AddGeolocationValidatlor = [
    check('address')
        .not()
        .isEmpty()
        .withMessage('Please Enter address!'),
    check('sendEmail')
        .custom((value, { req }) => {
            if (value  && !req.body.email) {
            throw new Error('please enter you email!');
            }
            return true;
        }),
];

export default AddGeolocationValidatlor;