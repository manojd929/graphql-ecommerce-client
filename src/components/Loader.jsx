import React from 'react'
import { Spinner } from 'reactstrap'

function Loader() {
    return (
        <div className="loader">
            <Spinner size="sm" color="primary" />
        </div>
    )
}

export default Loader
