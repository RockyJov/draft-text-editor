import React from "react";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";

class DisplayEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
    };
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
        <h1> Displayedtor.js</h1>
        <div>
          <button onClick={this.setEditorContent.bind(this)}>
            Load Content
          </button>
        </div>
        <Editor editorState={this.state.editorState} readOnly={true} />
      </div>
    );
  }
}
export default DisplayEditor;
