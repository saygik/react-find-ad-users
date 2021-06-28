import * as React from 'react';
import ResettableTextField from './ResettableTextField'

const TextInput = ({ ...rest}) => {
    return (
        <ResettableTextField
            {...rest}
        />
    );
};


TextInput.defaultProps = {
    options: {},
};

export default TextInput;
