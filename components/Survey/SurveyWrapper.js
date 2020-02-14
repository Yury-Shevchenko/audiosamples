import React, { Component } from 'react';
import styled from 'styled-components';
import Question from './Question';

const StyledSurvey = styled.div`
  position: 'relative';
  background: white;
  height: ${props => (props.open ? '100%' : '0')};
  top: 0;
  right: 0;
  min-width: 500px;
  bottom: 0;
  transform: translateX(-500%);
  transition: opacity 1s, transform 1s, height 1s;
  opacity: ${props => (props.open ? '1' : '0')};
  z-index: 5;
  ${props => props.open && `transform: translateX(0);`};
`;

class Survey extends Component {
  onChoice = (question, value) => {
    this.props.onInput(question, value);
    // const question = `question_${num}`;
    // this.setState({
    //   [question]: value,
    // });
  };

  render() {
    return (
      <div>
        <StyledSurvey open={this.props.open}>
          <h3>Bewertung pro Item auf einer Skala von 1 bis 7 wobei</h3>
          <h3>1 = trifft überhaupt nicht zu und</h3>
          <h3>7 = trifft sehr stark zu</h3>
          <Question
            question="Ich bin frustriert wegen dem Stottern"
            code="frustriert"
            num="1"
            onChoice={this.onChoice}
          />
          <Question
            question="Ich fürchte mich vor dem Sprechen wegen dem Stottern"
            code="fürchte"
            num="2"
            onChoice={this.onChoice}
          />
          <Question
            question="Ich ärgere mich, weil ich stottere"
            code="ärgere"
            num="3"
            onChoice={this.onChoice}
          />
          <Question
            question="Ich fühle mich hilflos wegen dem Stottern"
            code="hilflos"
            num="4"
            onChoice={this.onChoice}
          />
          <Question
            question="Ich schäme mich wegen dem Stottern"
            code="schäme"
            num="5"
            onChoice={this.onChoice}
          />
        </StyledSurvey>
      </div>
    );
  }
}

export default Survey;
