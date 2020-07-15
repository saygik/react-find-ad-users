import React from 'react'

const OnePeople = (props) => {
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}
export default OnePeople
