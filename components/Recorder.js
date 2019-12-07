import React from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import axios from 'axios';
import uniqid from 'uniqid';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const recorderStyle = {
  background: '#fffdfd'
};

class Recorder extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      buffer: '',
      file: null,
      isBlocked: false,
      formData: { author: '', title: ''},
      filename: ''
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
     data.append('author', this.state.formData.author)
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
     return !formData.author || !formData.title
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
  }

  render() {
    const { formData } = this.state
    return (
        <div id="container">
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
              <input
                type="text"
                onChange={this.setForm('author')}
                value={formData.author}
                placeholder="Author" />
            </form>
          </div>
          <header>
            <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
            <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
            <button onClick={this.save} disabled={this.state.isRecording || !this.state.blobURL || this.isFormInvalid()}>Save</button>
          </header>
          { this.state.blobURL && <audio src={this.state.blobURL} controls="controls" />}
        </div>
    )
  }

}

export default Recorder;
