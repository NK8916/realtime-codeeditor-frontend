import React, { Component } from "react";
import openSocket from "socket.io-client";
import Cookies from "js-cookie";
import db from "../../config/fbConfig";
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
    this.state = {
      room: props.match.params.id.split("-")[0],
      code: "",
      output: "",
    };

    this.run = this.run.bind(this);
  }
  componentDidMount() {
    Cookies.set("room", this.state.room);
    this.getCode();
    socket.emit("join", this.state.room);
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
    const userRef = db.collection("code").doc(this.state.room);
    const user = await userRef.get();
    if (!user.data()) {
      this.setState({ code: "" });
    } else {
      this.setState({ code: user.data().code });
    }
  }
  async onEditorChange(editor, data, code) {
    this.setState({ code });
    console.log(this.props);
    socket.emit("code", { code, room: this.state.room });
    await db
      .collection("code")
      .doc(this.state.room)
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
