const constraints = {

      message: {
        length: {
            minimum:4,
        },
        presence: {
            allowEmpty: false
        },
        type: 'string'
    },
    templateName: {
        length: {
            minimum:2,
        },
        presence: {
            allowEmpty: false
        },
        type: 'string'
    },


};

export default constraints;
