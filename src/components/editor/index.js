import React from "react";
import WYSISWYG from "./WYSISWYG";

function MyEditor (props) {
    return (
        <WYSISWYG value={props.value} setValue={props.setValue}/>
    );
}

export default MyEditor;
