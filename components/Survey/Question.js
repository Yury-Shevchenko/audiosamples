import React, { Component } from 'react';
import styled from 'styled-components';

const StyledQuestion = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0fef5;
`;

const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-column-gap: 5px;
  grid-row-gap: 5px;
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
        <StyledButtons>
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
        </StyledButtons>
      </StyledQuestion>
    );
  }
}

export default Question;
