import useDarkMode from "@/lib/store/useDarkMode";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-beautify";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/ext-error_marker";
import "ace-builds/src-noconflict/ext-keybinding_menu";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-whitespace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-noconflict/snippets/json5";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/worker-javascript";
import { ReactNode, useRef } from "react";
import AceEditor from "react-ace";
import { RiSparklingLine } from "react-icons/ri";
interface props {
  label?: ReactNode;
  body: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  minHeight?: number;
  isRequired?: boolean;
  withBeautify?: boolean;
  rightAction?: ReactNode;
}
const TextEditor = ({ label, body, onChange, readOnly, minHeight, isRequired = true, rightAction, withBeautify = true }: props) => {
  const { enable } = useDarkMode();
  const aceEditorRef = useRef<AceEditor | null>(null);

  function handleBeautify() {
    if (aceEditorRef.current && aceEditorRef.current.editor) {
      const editor = aceEditorRef.current.editor;
      const beautify = require("ace-builds/src-noconflict/ext-beautify");
      beautify.beautify(editor.session);
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor="editor" className="text-sm inline-block w-full">
            {label} {isRequired && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="flex items-center gap-1">
          {rightAction}
          {withBeautify && (
            <button
              className="flex items-center gap-2 text-sm ml-auto w-fit h-fit text-default-500 hover:text-foreground duration-500"
              onClick={handleBeautify}
            >
              <span>Beautify</span>
              <RiSparklingLine size={18} />
            </button>
          )}
        </div>
      </div>
      <AceEditor
        ref={aceEditorRef}
        style={{
          width: "100%",
          borderRadius: "5px",
          padding: "16px",
          minHeight: `${minHeight ?? 40}rem`,
        }}
        value={body}
        mode={"json"}
        theme={enable ? "twilight" : "xcode"}
        onChange={onChange}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        setOptions={{
          theme: enable ? "twilight" : "xcode",
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextEditor;
