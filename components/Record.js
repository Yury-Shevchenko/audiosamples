import styled from "styled-components";
import Moment from 'react-moment'

const StyledRecord = styled.div`
  margin: 15px;
  text-align: left;
  .remove {
    cursor: pointer;
    color: #ff257b;
    font-size: 1.5em;
  }
`;

export default class extends React.Component {

  render(){
    return (
      <StyledRecord>
        <div>
          <div>
            <span className="remove" onClick={this.props.onRemove(this.props.record._id)}>
              &times;
            </span>&nbsp;
            <i>{this.props.record.title}</i> by {this.props.record.author} at <Moment format="YYYY-MM-DD HH:mm:ss">{this.props.record.createdAt}</Moment>
          </div>
          <div>
            <span>
              <audio src={`/api/play/${this.props.record._id}`} controls="controls" />
            </span>
          </div>
        </div>
      </StyledRecord>
    )
  }
}

// export default function Record({ record, onRemove }) {
//
// }
