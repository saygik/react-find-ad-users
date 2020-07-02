import React from 'react'

import SearchInput from "../input/SearchInput"



const Filter = (props) => {
    return (
        <SearchInput
            resettable={true}
            {...props}
        />
    )
}

export default Filter
