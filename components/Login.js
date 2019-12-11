import styled from "styled-components"
import Moment from 'react-moment'
import axios from 'axios'
import Router from 'next/router'

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

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
    }
  }
`;


class Login extends React.Component {

  state = {
    name: '',
    password: '',
    email: '',
  }

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  signin = (data) => {
    axios.post('/login', data, { // receive two parameter endpoint url ,form data
     })
     .then(res => { // then print response status
       window.location.href = '/record';
     })
  }

  render(){

    return(
            <Form
              method="post"
              onSubmit={ async e => {
                e.preventDefault()
                const res = await this.signin(this.state)
                this.setState({name: '', password: '', email: '',})
              }}>
              <fieldset>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}/>
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}/>
                </label>

                <button type="submit">Sign in</button>

              </fieldset>
            </Form>
          )

  }
}

export default Login
