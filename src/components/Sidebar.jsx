import React, { useState } from "react";


const note = {
    title: String,
    body: String
}

function Sidebar() {
    const [notes, setNotes] = useState()

    return(
        <div>
            <h1>Hello from app</h1>
        </div>
    )
}

export default Sidebar;