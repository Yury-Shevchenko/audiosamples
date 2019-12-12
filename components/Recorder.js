import React from 'react'
import styled from "styled-components"
import MicRecorder from 'mic-recorder-to-mp3'
import axios from 'axios'
import uniqid from 'uniqid'

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

const StyledRecorder = styled.div`
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    border: 1px solid black;
    margin-bottom: 10px;
    border-radius: 5px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  header {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
  button,
  input[type='submit'] {
    width: auto;
    background: #4ffaca30;
    border: 0;
    font-size: 3rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
    height: 100px;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;
  }
  audio {
    margin-top: 10px;
  }
`;

class Recorder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      buffer: '',
      file: null,
      isBlocked: false,
      formData: { title: '' },
      filename: '',
      author: ''
    };
  }

  start = () => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
     }
  };

   stop = () => {
     Mp3Recorder
       .stop()
       .getMp3()
       .then(([buffer, blob]) => {
         const blobURL = URL.createObjectURL(blob);
         const filename = uniqid();
         const file = new File(buffer, filename + '.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
         this.setState({ blobURL, buffer, file, isRecording: false, filename });
       }).catch((e) => console.log(e));
   };

   save = () => {
     const data = new FormData()
     data.append('file', this.state.file)
     data.append('title', this.state.formData.title)
     data.append('author', this.state.author)
     data.append('filename', this.state.filename)
     axios.post('/api/upload', data, { // receive two parameter endpoint url ,form data
      })
      .then(res => { // then print response status
        this.props.onUpload(res.data);
      })
   };

   setForm = (prop) => {
     return ev => {
       const state = this.state || {}
       const formData = state.formData || {}
       this.setState(Object.assign({}, state, {
         formData: Object.assign({}, formData, {
           [prop]: ev.target.value
         })
       }));
     }
   }

   isFormInvalid = () => {
     const state = this.state || {}
     const formData = state.formData || {}
     return !formData.title
   }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
    if (this.props.user && this.props.user.name){
      this.setState({ author: this.props.user.name })
    }
  }

  render() {
    const { formData } = this.state
    return (
        <StyledRecorder>
          <h1>
            Recorder
          </h1>
          <div id="input-book">
            <form>
              <input
                type="text"
                onChange={this.setForm('title')}
                value={formData.title}
                placeholder="Title" />
            </form>
          </div>
          <header>
            <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
            <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
            <button onClick={this.save} disabled={this.state.isRecording || !this.state.blobURL }>Save</button>
          </header>
          { this.state.blobURL && <audio src={this.state.blobURL} controls="controls" />}
        </StyledRecorder>
    )
  }

}

export default Recorder;
