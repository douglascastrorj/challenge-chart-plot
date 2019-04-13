import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const CodeEditor = React.forwardRef((props, ref) => (
    <AceEditor
        ref={ref}
        style={{width: '100%', height: props.height}}
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="editor"
        onLoad={props.onLoad}
        onChange={props.onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={props.text}
        setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
        }}
    />       
));

export default CodeEditor;