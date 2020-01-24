import React from 'react'
import * as superagent from 'superagent'
import Layout from '../../components/MyLayout'
import ParticipantTab from '../../components/Study/ParticipantTab'

export default class extends React.Component {
  static async getInitialProps ({ req, query }) {
    if (process.browser) {
      const users = await superagent.get(`/study/getstudy/${query.id}`)
        .then(res => res.body)
      return { users }
    } else {
      if (req && req.user) {
        const mongoose = require('mongoose')
        const Project = mongoose.model('project')
        const users = await Project.getUsers({ _id: query.id, manager: req.user._id })
        return { users }
      }
    }
  }

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const users = this.state.users || this.props.users
    return (
      <Layout>
        {this.props.user ?
          <>
            { users && users.length ?
              <>
                <h1>Participants of {users[0].study}</h1>
                <div id="reading-list">
                  {
                    users.map(user => (
                      <ParticipantTab key={user.id} user={user} />
                    ))
                  }
                </div>
              </>
              :
              <h1>No participants</h1>
            }

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
