import React from 'react';
import * as superagent from 'superagent';
import Layout from '../components/MyLayout';
import Trainer from '../components/Trainer';

export default class extends React.Component {
  static async getInitialProps({ req }) {
    if (process.browser) {
      const list = await superagent.get('/api').then(res => res.body);
      return { list };
    }
    if (req && req.user) {
      const mongoose = require('mongoose');
      const Record = mongoose.model('record');
      const list = await Record.find({ user: req.user._id }).sort({
        createdAt: -1,
      });
      return { list };
    }
  }

  constructor() {
    super();
    this.state = {};
  }

  onUpload = data => {
    const state = this.state || {};
    const list = this.state.list || this.props.list || [];
    this.setState(
      Object.assign({}, state, {
        list: [data].concat(list),
      })
    );
  };

  render() {
    const list = this.state.list || this.props.list;
    return (
      <Layout>
        {this.props.user ? (
          <>
            <Trainer onUpload={this.onUpload} user={this.props.user} />
          </>
        ) : (
          <>
            <p>Please sign up or login first.</p>
          </>
        )}
      </Layout>
    );
  }
}
