import React from "react";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

class MyEditor extends React.Component {
  editorStyles = {
    width: "200px",
    margin: "10px",
    border: "1px solid grey",
    backgroundColor: "white",
  };
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  getContentAsRawJson() {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw, null, 2);
  }

  saveContent() {
    const json = this.getContentAsRawJson();
    localStorage.setItem("draftEditorContentJson", json);
  }

  loadContent() {
    const savedData = localStorage.getItem("draftEditorContentJson");
    return savedData ? JSON.parse(savedData) : null;
  }

  setEditorContent() {
    const rawEditorData = this.loadContent();
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData);
      const newEditorState = EditorState.createWithContent(contentState);
      this.setState({ editorState: newEditorState });
    }
  }

  render() {
    return (
      <div>
        <h1>MyEditor.js</h1>
        <div style={{ margin: "10px" }}>
          <button onClick={() => this.handleKeyCommand("bold")}>Bold</button>
          <button onClick={() => this.handleKeyCommand("italic")}>
            Italic
          </button>
          <button onClick={() => this.handleKeyCommand("underline")}>
            UnderLine
          </button>
          <button onClick={() => this.handleKeyCommand("code")}>Code</button>
        </div>
        <div style={this.editorStyles}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <button onClick={this.saveContent.bind(this)}>Save Content</button>
          <button onClick={this.setEditorContent.bind(this)}>
            Load Content
          </button>
        </div>
        <div>
          <pre>{this.getContentAsRawJson()}</pre>
        </div>
      </div>
    );
  }
}

export default MyEditor;
