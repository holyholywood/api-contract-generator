import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/json5";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-whitespace";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-keybinding_menu";

interface props {
  label?: string;
}
const TextEditor = ({ label }: props) => {
  const [value, setValue] = useState<string>("");
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor="editor" className="text-sm">
          {label}
        </label>
      )}
      <AceEditor
        style={{
          width: "100%",
          borderRadius: "5px",
          padding: "16px",
        }}
        value={value}
        mode={"json"}
        theme="monokai"
        onChange={(val) => setValue(val)}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default TextEditor;
