import React from "react"
import Page from '../components/Page'
import Header from '../components/Header'
import App from "next/app"
// import * as superagent from 'superagent'

class MyApp extends App {

  static async getInitialProps({ Component, ctx, req }) {

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    if (ctx.req && ctx.req.user) {
      // console.log('ctx.req.user', ctx.req.user)
      pageProps.user = ctx.req.user
    }
    // else {
    //   const user = await superagent.get('/user')
    //     .then(res => res.body)
    //   console.log('user', user)
    //   pageProps.user = user
    // }
    return { pageProps }
  }

  constructor(props) {
    super(props)
    this.state = {
      user: props.pageProps.user
    }
  }

  render() {
     const { Component, pageProps } = this.props
     const props = {
       ...pageProps,
       user: this.state.user,
     }

     return (
       <Page>
        <Header user={this.state.user} />
        <Component {...props} />
       </Page>
    )
  }
}

export default MyApp;
