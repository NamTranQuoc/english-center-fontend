import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = () => {
    return (
        <div>
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
                editor={ ClassicEditor }
                config={{cloudServices: {
                        tokenUrl: 'https://84898.cke-cs.com/token/dev/9b0051a3ba6a6855f05199dc5d2c804f49c4145e6b9c30c08c426df9e93e',
                        uploadUrl: 'https://84898.cke-cs.com/easyimage/upload/'
                    }}}
                onChange={ ( event, editor ) => {
                    console.log(editor.getData());
                }}
            />
        </div>
    );
};

export default Editor;
