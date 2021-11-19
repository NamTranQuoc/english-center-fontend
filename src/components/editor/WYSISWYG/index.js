import React from "react";
import {convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function WYSISWYG(props) {

    function onEditorStateChange(editorState) {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }

    return (
        <Editor editorStyle={{
            width: '100%',
            minHeight: 270,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'lightgray',
            backgroundColor: "white",
        }}
                wrapperClassName="demo-wrapper"
                onEditorStateChange={onEditorStateChange}
        />
    );
}

export default WYSISWYG;
