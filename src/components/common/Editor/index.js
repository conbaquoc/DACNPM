import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import QuillEditorWrapper from './styles';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.isChangeState = false;
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: ' ' };
    
    this.quillModules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['clean'],
        ],
      },
    };
  }

  componentDidMount() {
    this.setState({
      value: '',
    })
  }

  handleChange(value) {
    this.isChangeState=true;
    this.setState({ value });
    this.props.onChange(value)
  }

  render() {
    const { label, placeholder, content } = this.props;
    let value;
    if(this.isChangeState) {
      value = this.state.value
    } 
    else if (content) {
        value = content
    } else {
      value = ''
    }
   
    const options = {
      theme: 'snow',
      formats: Editor.formats,
      placeholder,
      value,
      onChange: this.handleChange,
      modules: this.quillModules,
      
    };
    return (
      
      <QuillEditorWrapper>
        <label>{label}</label>
        <ReactQuill {...options} />
      </QuillEditorWrapper>
    );
  }
}
