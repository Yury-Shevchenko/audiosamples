import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
import Header from '../components/Header';
// import * as superagent from 'superagent'

class MyApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (ctx.req && ctx.req.user) {
      pageProps.user = ctx.req.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: (props.pageProps && props.pageProps.user) || undefined,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const props = {
      ...pageProps,
      user: this.state.user,
    };

    return (
      <Page>
        <Header user={this.state.user} />
        <Component {...props} />
      </Page>
    );
  }
}

export default MyApp;
