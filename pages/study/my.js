import React from 'react'
import * as superagent from 'superagent'
import Layout from '../../components/MyLayout'
import Setup from '../../components/Study/Setup'
import StudyTab from '../../components/Study/StudyTab'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    if (process.browser) {
      const studies = await superagent.get('/study/getmystudies')
        .then(res => res.body)
      return { studies }
    } else {
      if (req && req.user) {
        const mongoose = require('mongoose')
        const Project = mongoose.model('project')
        const studies = await Project.find({ manager: req.user._id }).sort({ createdAt: -1 })
        return { studies }
      }
    }
  }

  constructor () {
    super()
    this.state = {}
  }

  onCreate = (data) => {
    const state = this.state || {};
    const studies = this.state.studies || this.props.studies || []
    this.setState(Object.assign({}, state, {
      studies: studies.concat([data])
    }))
  }

  remove = (_id) => {
    superagent.del(`/study/del/${_id}`)
      .then(() => {
        const state = this.state || {}
        const studies = this.state.studies || this.props.studies || []
        this.setState(Object.assign({}, state, {
          studies: studies.filter(study => study._id !== _id)
        }))
      })
      .catch(error => console.error(error.stack))
  }

  render () {
    const studies = this.state.studies || this.props.studies
    return (
      <Layout>
        {this.props.user ?
          <>
            <Setup onCreate={this.onCreate} user={this.props.user} />
            <h1>
              Your studies
            </h1>
            <div id="reading-studies">
              <ul>
                {
                  studies && studies.map(study => (
                    <StudyTab study={study} onRemove={this.remove} key={study._id} />
                  ))
                }
              </ul>
            </div>
          </>
          :
          <>
            <p>Please sign up or login first.</p>
          </>
        }
      </Layout>
    )
  }
}
