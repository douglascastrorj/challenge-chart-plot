import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';


const CodeEditor = (props) => (
    <AceEditor
        style={{width: '100%'}}
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="blah2"
        onLoad={props.onLoad}
        onChange={props.onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={`function onLoad(editor) {
        console.log("i've loaded");
        }`}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        }}/>       
);

export default CodeEditor;