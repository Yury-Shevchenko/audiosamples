import styled from 'styled-components';
import Moment from 'react-moment';
import axios from 'axios';
import Router from 'next/router';
// import { withRouter } from 'next/router'

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
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
  }
`;

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      invitetoken: '',
    };
  }

  componentDidMount() {
    const invitetoken = Router.query.invitetoken || '';
    this.setState({
      invitetoken,
    });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  signin = data => {
    // console.log('signing in with', data);
    // data.invitetoken = Router.query.invitetoken;
    axios
      .post('/sign', data, {
        // receive two parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        window.location.href = '/record';
      });
  };

  render() {
    return (
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          const res = await this.signin(this.state);
          this.setState({
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
          });
        }}
      >
        <fieldset>
          <h1>
            {this.state.invitetoken &&
              `You are invited to participate in a study`}
          </h1>
          <label htmlFor="name">
            Name or participant ID
            <input
              type="name"
              name="name"
              placeholder="Name or participant ID"
              value={this.state.name}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={this.state.confirmPassword}
              onChange={this.saveToState}
            />
          </label>

          <button type="submit">Sign in</button>
        </fieldset>
      </Form>
    );
  }
}

export default Sign;
