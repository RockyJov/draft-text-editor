import React from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  ContentBlock,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

class SaveData2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      editorStatesContent: [],
    };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  getContentAsRawJson() {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw);
  }

  saveContent() {
    const raw = this.getContentAsRawJson();
    const savedData = localStorage.getItem("savedContent");
    const editorStatesContent = [...this.state.editorStatesContent];
    editorStatesContent.push(raw);
    this.setState({
      editorStatesContent: editorStatesContent,
      editorState: EditorState.createEmpty(),
    });
    localStorage.setItem("savedContent", editorStatesContent);
    console.log(editorStatesContent);
  }

  loadContent() {
    const savedData = localStorage.getItem("savedContent");
    return savedData ? JSON.parse(savedData) : null;
  }

  saveClick() {
    this.saveContent();
  }

  render() {
    return (
      <div>
        <h1>Savedata.js</h1>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        <button onClick={this.saveClick.bind(this)}>Save Content</button>
        <pre>{this.getContentAsRawJson()}</pre>
      </div>
    );
  }
}

export default SaveData2;
