import React from "react";
import MyEditor from "./MyEditor";
import MyEditorHTML from "./MyEditorHTML";
import DisplayEditor from "./DisplayEditor";
import SaveData from "./SaveData";
import SaveData2 from "./SaveData2";
import ToDo from "./Todo";
function App() {
  return (
    <div>
      <Todo />
    </div>
  );
}
// switch components to MyEditor or MyEditorHTML and DisplayEditor.
export default App;
