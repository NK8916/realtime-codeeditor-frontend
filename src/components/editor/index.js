import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./editor.module.css";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/dracula.css");

require("codemirror/mode/javascript/javascript.js");
var socket;

class Editor extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    socket = openSocket("http://localhost:8000");
    this.state = { room: "", code: "", output: "" };

    this.run = this.run.bind(this);
  }
  componentDidMount() {
    console.log("editorprops", this.props.match.params.id);
    socket.on("code", (code) => {
      this.setState({ code });
    });
    socket.on("output", (output) => {
      this.setState({ output });
    });
  }
  editorOptions = {
    theme: "dracula",
    mode: "javascript",
    lineNumbers: true,
    smartIndent: true,
    lineWrapping: true,
    indentation: 4,
  };
  codeString = "";

  run() {
    const data = { room: this.state.room, code: this.state.code };
    console.log("datra", data);
    socket.emit("run", data);
  }

  render() {
    return (
      <div>
        <CodeMirror
          value={this.state.code}
          className="editor"
          options={this.editorOptions}
          editorDidMount={(editor) => {
            this.instance = editor;
          }}
          onBeforeChange={(editor, data, code) => {
            this.setState({ code });
            socket.emit("code", { code, room: this.state.room });
          }}
        />
        <button name="run" onClick={this.run}>
          Run
        </button>

        <div dangerouslySetInnerHTML={{ __html: this.state.output }}></div>
      </div>
    );
  }
}

export default Editor;
