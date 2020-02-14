import React, { Component } from 'react';
import styled from 'styled-components';

const StyledQuestion = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(7, 1fr);
  align-items: baseline;
`;

class Question extends Component {
  chooseResponse = e => {
    const { value } = e.target;
    const { question, code } = this.props;
    document
      .querySelectorAll(`button[name=${code}]`)
      .forEach(button => (button.style.background = '#4ffaca30'));
    e.target.style.background = '#e1ff00';
    this.props.onChoice(question, value);
  };

  render() {
    const { question, code } = this.props;
    return (
      <StyledQuestion>
        <h4>{question}</h4>
        <button
          type="button"
          value="1"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          1
        </button>
        <button
          type="button"
          value="2"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          2
        </button>
        <button
          type="button"
          value="3"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          3
        </button>
        <button
          type="button"
          value="4"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          4
        </button>
        <button
          type="button"
          value="5"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          5
        </button>
        <button
          type="button"
          value="6"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          6
        </button>
        <button
          type="button"
          value="7"
          name={code}
          onClick={e => {
            this.chooseResponse(e);
          }}
        >
          7
        </button>
      </StyledQuestion>
    );
  }
}

export default Question;
