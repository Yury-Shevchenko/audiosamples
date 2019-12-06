import Layout from '../components/MyLayout';
import Recorder from '../components/Recorder';
import React from 'react';
import * as superagent from 'superagent';
import Moment from 'react-moment';

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    if (req) {
      const { db } = req
      const list = await db.collection('Book').find().sort({ createdAt: -1 })
        .toArray()
      return { list }
    }
    const { list } = await superagent.get('https://samply.tk/api')
      .then(res => res.body)
    return { list }
  }

  constructor () {
    super();
    this.state = {};
    this.onUpload = this.onUpload.bind(this);
  }

  onUpload (data) {
    console.log('upload happened', data);
    const state = this.state || {};
    const list = this.state.list || this.props.list || []
    this.setState(Object.assign({}, state, {
      list: [data].concat(list)
    }))
  }

  remove (_id) {
    return ev => {
      superagent.del(`https://samply.tk/api/${_id}`)
        .then(() => {
          const state = this.state || {}
          const list = this.state.list || this.props.list || []
          this.setState(Object.assign({}, state, {
            list: list.filter(book => book._id !== _id)
          }))
        })
        .catch(error => console.error(error.stack))
    }
  }

  // add () {
  //   return ev => {
  //     ev.preventDefault()
  //     const state = this.state || {}
  //     const formData = state.formData || {}
  //     this.setState(Object.assign({}, this.state, {
  //       formData: { author: '', title: '' }
  //     }))
  //
  //     superagent.post('https://samply.tk/api', formData)
  //       .then(res => {
  //         const state = this.state || {}
  //         const list = this.state.list || this.props.list || []
  //         this.setState(Object.assign({}, state, {
  //           list: [res.body.book].concat(list)
  //         }))
  //       })
  //       .catch(error => console.error(error.stack))
  //   }
  // }

  render () {
    const list = this.state.list || this.props.list
    return (
      <Layout>
        <h1>
          Recorder
        </h1>
        <Recorder onUpload={this.onUpload} />
        <h1>
          Records list
        </h1>
        <div id="reading-list">
          <ul>
            {
              list && list.map(book => (
                <div key={book._id}>
                  <span className="remove" onClick={this.remove(book._id)}>
                    &times;
                  </span>&nbsp;
                  <span className="description">
                    <i>{book.title}</i> by {book.author} at <Moment format="YYYY-MM-DD HH:mm:ss">{book.createdAt}</Moment>
                  </span>
                </div>
              ))
            }
          </ul>
        </div>
        <style jsx>{`
          div {
            font-family: 'Helvetica', 'sans-serif';
          }
          #container {
            width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          h1 {
            color: #ccbc1d;
          }
          button {
            background-color: #ff257b;
            color: #ffffff;
            font-weight: bold;
            border: 0px;
            border-radius: 2px;
            padding: 5px;
            padding-left: 8px;
            padding-right: 8px;
            margin: 5px;
          }
          input {
            padding: 5px;
            border: 0px;
            background-color: #f0f0f0;
            margin: 5px;
          }
          .description {
            position: relative;
            top: -0.2em;
          }
          .remove {
            cursor: pointer;
            color: #ff257b;
            font-size: 1.5em;
          }
          .description {
            position: relative;
            top: -0.2em;
          }
          .remove {
            cursor: pointer;
            color: #ff257b;
            font-size: 1.5em;
          }
        `}</style>
      </Layout>
    )
  }
}

// import Layout from '../components/MyLayout'
// import Link from 'next/link'
// import fetch from 'isomorphic-unfetch'
//
// const Index = props => (
//   <Layout>
//     <h1>Batman TV Shows</h1>
//     <ul>
//       {props.shows.map(show => (
//         <li key={show.id}>
//           <Link href="/show/[id]" as={`/show/${show.id}`}>
//             <a>{show.name}</a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </Layout>
// )
//
// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
//   const data = await res.json()
//
//   console.log(`Show data fetched. Count: ${data.length}`)
//
//   return {
//     shows: data.map(entry => entry.show)
//   }
// }
//
// export default Index

//<button disabled={this.isFormInvalid()}>Add</button>
