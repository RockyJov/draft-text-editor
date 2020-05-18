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

class SaveData extends React.Component {
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
    return JSON.stringify(raw, null, 2);
  }

  loadContent() {
    const savedData = localStorage.getItem("savedContent");
    return savedData ? JSON.parse(savedData) : null;
  }
  saveContent() {
    const json = this.getContentAsRawJson();
    localStorage.setItem("savedContent", json);
  }
  getTextFromJson() {
    const parsedJson = this.loadContent();
    const textFromJson = parsedJson.blocks[0].text;
    return textFromJson;
  }
  getKeyFromJson() {
    const parsedJson = this.loadContent();
    const keyFromJson = parsedJson.blocks[0].key;
    return keyFromJson;
  }
  addNewItem() {
    const text = this.getTextFromJson();
    const key = this.getKeyFromJson();
    const newItem = {
      id: key,
      value: text,
    };
    const newItemString = JSON.stringify(newItem, null, 0);
    const editorStatesContent = [...this.state.editorStatesContent];
    editorStatesContent.push(newItem);
    this.setState({
      editorStatesContent,
      editorState: EditorState.createEmpty(),
    });
    localStorage.setItem(key, newItemString);
    console.log(editorStatesContent);
  }
  saveClick() {
    this.saveContent();
    this.addNewItem();
    this.getTextFromJson();
  }

  render() {
    const text = this.getTextFromJson();
    const key = this.getKeyFromJson();
    return (
      <div>
        <h1>Savedata.js</h1>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        <button onClick={this.saveClick.bind(this)}>Save Content</button>
        <pre>{this.getContentAsRawJson()}</pre>
        <ul>
          {this.state.editorStatesContent.map((item) => {
            return (
              <li key={item.id}>
                Text: {item.value}, Key: {item.id}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SaveData;
