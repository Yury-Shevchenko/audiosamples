import React from 'react';
import styled from 'styled-components';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import uniqid from 'uniqid';
import tongueTwisters from '../lib/train/tongueTwisters';
import levenshteinDistance from '../lib/train/evaluate';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

let recognition;
let line;
let lineDelete;
let lineText;
let words;
let trainPhrase;

const StyledTrainer = styled.div`
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

class Trainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      buffer: '',
      file: null,
      isBlocked: false,
      filename: '',
    };
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia(
      { audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true });
      }
    );
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (window.SpeechRecognition) recognition = new SpeechRecognition();
    words = document.querySelector('.words');
  }

  start = () => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch(e => console.error(e));
    }
    this.transcribe();
  };

  stop = () => {
    recognition.removeEventListener('result', this.recordLine);
    recognition.stop();
    // evaluate the record
    this.evaluateResult();
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        const filename = uniqid();
        const file = new File(buffer, `${filename}.mp3`, {
          type: blob.type,
          lastModified: Date.now(),
        });
        this.setState({ blobURL, buffer, file, isRecording: false, filename });
      })
      .catch(e => console.log(e));
  };

  transcribe = () => {
    // https://stackoverflow.com/questions/14257598/what-are-language-codes-in-chromes-implementation-of-the-html5-speech-recogniti
    recognition.lang = 'de-DE';
    recognition.interimResults = true;
    this.makeNewLine();
    recognition.addEventListener('result', this.recordLine);
    recognition.start();
  };

  recordLine = e => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    lineDelete.textContent = `x `;
    lineText.textContent = transcript;
    if (e.results[0].isFinal) {
      this.stop();
    }
  };

  makeNewLine = () => {
    line = document.createElement('div');
    lineDelete = document.createElement('span');
    lineText = document.createElement('span');
    lineText.id = 'recordedPhrase';
    line.appendChild(lineDelete);
    line.appendChild(lineText);
    lineDelete.onclick = e => {
      e.target.parentNode.remove();
    };
    words.appendChild(line);
  };

  train = () => {
    words.innerText = '';
    trainPhrase =
      tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
    const phrase = document.createElement('h1');
    phrase.id = 'targetPhrase';
    phrase.textContent = trainPhrase;
    words.appendChild(phrase);
    this.start();
  };

  evaluateResult = () => {
    const targetPhrase = document.querySelector('#targetPhrase').textContent;
    const cleanedTargetPhrase = targetPhrase
      .replace(/[,.?!-:;]/g, '')
      .toLowerCase();
    const recordedPhrase = document.querySelector('#recordedPhrase')
      .textContent;
    const cleanedRecordedPhrase = recordedPhrase.toLowerCase();
    const score = levenshteinDistance(
      cleanedTargetPhrase,
      cleanedRecordedPhrase
    );
    const normalizedScore =
      100 - Math.round((score / cleanedTargetPhrase.length) * 100);
    console.log(
      'score',
      normalizedScore,
      cleanedTargetPhrase,
      cleanedRecordedPhrase
    );
    const scoreDiv = document.createElement('h3');
    scoreDiv.textContent = `Your score is ${normalizedScore} out of 100`;
    words.appendChild(scoreDiv);
  };

  render() {
    return (
      <StyledTrainer>
        {recognition ? (
          <>
            <h1>Trainer</h1>
            <header>
              <button
                type="button"
                onClick={this.stop}
                disabled={!this.state.isRecording}
              >
                Stop
              </button>
              <button
                type="button"
                onClick={this.train}
                disabled={this.state.isRecording}
              >
                Train
              </button>
            </header>
            {this.state.blobURL && (
              <audio src={this.state.blobURL} controls="controls" />
            )}
            <div className="words"></div>
          </>
        ) : (
          <p>Pleas change your browser to Chrome to use the trainer</p>
        )}
      </StyledTrainer>
    );
  }
}

export default Trainer;
