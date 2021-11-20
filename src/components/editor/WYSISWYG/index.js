import React, {useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState, convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

function WYSISWYG(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    useEffect(() => {
        if (props.value !== null) {
            const contentBlock = typeof window !== 'undefined' ? htmlToDraft(props.value) : null;
            const _contentState = ContentState.createFromBlockArray(contentBlock);
            const _editorState = EditorState.createWithContent(_contentState);
            setEditorState(_editorState);
        }
        // eslint-disable-next-line
    }, []);

    function onEditorStateChange(editorStateData) {
        setEditorState(editorStateData);
        props.setValue(draftToHtml(convertToRaw(editorStateData.getCurrentContent())));
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
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                onEditorStateChange={onEditorStateChange}
        />
    );
}

export default WYSISWYG;
