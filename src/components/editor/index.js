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
    this.handleRoom = this.handleRoom.bind(this);
    this.submit = this.submit.bind(this);
    this.run = this.run.bind(this);
  }
  componentDidMount() {
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
  handleRoom(event) {
    this.setState({ room: event.target.value });
  }
  run() {
    const data = { room: this.state.room, code: this.state.code };
    console.log("datra", data);
    socket.emit("run", data);
  }
  submit() {
    console.log(this.state);
    socket.emit("join", this.state.room);
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
        <input
          name="room"
          value={this.state.value}
          onChange={(event) => {
            console.log(event.target.value);
            this.setState({ room: event.target.value });
          }}
        ></input>
        <button name="join" onClick={this.submit}></button>
        <div dangerouslySetInnerHTML={{ __html: this.state.output }}></div>
      </div>
    );
  }
}

export default Editor;
