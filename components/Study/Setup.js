import styled from 'styled-components';
import Moment from 'react-moment';
import axios from 'axios';
import Router from 'next/router';
import React from 'react';

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
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
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: #4ffaca30;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    height: 100px;
  }
  fieldset {
    border: 0;
    padding: 0;
  }
`;

class Setup extends React.Component {
  state = {
    name: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setup = data => {
    axios
      .post('/study/create', data, {
        // receive two parameter endpoint url ,form data
      })
      .then(res => {
        this.props.onCreate(res.data);
      });
  };

  render() {
    return (
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          const res = await this.setup(this.state);
          this.setState({ name: '' });
        }}
      >
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.saveToState}
              required
            />
          </label>
          <button type="submit">Launch</button>
        </fieldset>
      </Form>
    );
  }
}

export default Setup;
