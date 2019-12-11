import Layout from '../components/MyLayout';
import Recorder from '../components/Recorder';
import RecordComponent from '../components/Record';
import React from 'react';
import * as superagent from 'superagent';
import styled from "styled-components";
const mongoose = require('mongoose')
const Record = mongoose.model('Record')

export default class extends React.Component {

  constructor () {
    super()
    this.state = {}
  }


  render () {
    return (
      <Layout>
        <h1>
          Records app
        </h1>
      </Layout>
    )
  }
}
