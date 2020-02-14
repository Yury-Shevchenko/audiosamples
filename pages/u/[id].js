import React from 'react';
import * as superagent from 'superagent';
import styled from 'styled-components';
import ListenComponent from '../../components/Listen';
import Layout from '../../components/MyLayout';

export default class ListenPage extends React.Component {
  static async getInitialProps({ req, query }) {
    if (process.browser) {
      const list = await superagent
        .get(`/api/user/${query.id}`)
        .then(res => res.body);
      return { list };
    }
    if (req && req.user) {
      const mongoose = require('mongoose');
      const Record = mongoose.model('record');
      const list = await Record.find({ user: query.id }).sort({
        createdAt: -1,
      });
      return { list };
    }
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const list = this.state.list || this.props.list;
    return (
      <Layout>
        {this.props.user ? (
          <>
            <h1>The records of the participant</h1>
            <div id="reading-list">
              <ul>
                {list &&
                  list.map(record => (
                    <ListenComponent record={record} key={record._id} />
                  ))}
              </ul>
            </div>
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
