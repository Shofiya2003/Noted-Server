
const {body,query}=require('express-validator');
const validators={
    "/post":{
        "/create":[
            body('folder_name').exists().withMessage('folder name is missing')
        ],
        "/delete":[
            body('folder_name').exists().withMessage('folder name is missing'),
            query('deleted').isBoolean({loose:true}).withMessage('query must be true or false')
        ],
        "/editname":[
            body('new_folder_name').exists().withMessage('folder name is missing'),
            body('old_folder_name').exists().withMessage('folder name is missing'),
        ]
    }
}