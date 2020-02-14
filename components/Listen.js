import React, { Component } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

const StyledRecord = styled.div`
  margin: 15px;
  text-align: left;
  font-size: 2rem;
  .remove {
    cursor: pointer;
    color: #ff257b;
    font-size: 3rem;
  }
`;

export default class Listen extends React.Component {
  render() {
    const { record } = this.props;
    const survey = (record.survey && JSON.parse(record.survey)) || {};

    return (
      <StyledRecord>
        <div>
          <div>
            <i>{record.title}</i> by {record.author} at{' '}
            <Moment format="YYYY-MM-DD HH:mm:ss">{record.createdAt}</Moment>
          </div>
          <div>
            <span>
              <audio src={`/api/play/${record._id}`} controls="controls" />
            </span>
          </div>
          <div>
            {Object.keys(survey).map(k => (
              <p key={k}>
                {k} : {survey[k]}
              </p>
            ))}
          </div>
        </div>
      </StyledRecord>
    );
  }
}
