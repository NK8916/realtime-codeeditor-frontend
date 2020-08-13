import React, { Component } from "react";
import openSocket from "socket.io-client";
import { v5 } from "uuid";
import db from "../../config/fbConfig";
import { UUID } from "../../config/uuid-config";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./editor.module.css";
import { Button } from "react-bootstrap";
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
    const room = this.props.match.params.id.split("-")[0];
    this.getCode();
    this.setState({ room });
    socket.emit("join", room);
    socket.on("code", (code) => {
      this.setState({ code });
    });
    socket.on("output", (output) => {
      if (output.stderr) {
        this.setState({ output: JSON.stringify(output) });
      } else {
        this.setState({ output });
      }
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

  async getCode() {
    const userRef = db.collection("code").doc(this.props.match.params.id);
    const user = await userRef.get();
    this.setState({ code: user.data().code });
  }
  async onEditorChange(editor, data, code) {
    this.setState({ code });
    console.log(this.props);
    socket.emit("code", { code, room: this.state.room });
    await db
      .collection("code")
      .doc(this.props.match.params.id)
      .set({ code: this.state.code });
  }

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
            this.onEditorChange(editor, data, code);
          }}
        />
        <Button
          variant="outline-success"
          className="float-right m-1"
          size="lg"
          name="run"
          onClick={this.run}
        >
          Run
        </Button>

        <div dangerouslySetInnerHTML={{ __html: this.state.output }}></div>
      </div>
    );
  }
}

export default Editor;
