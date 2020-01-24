import styled from "styled-components";
import Moment from 'react-moment'

const StyledRecord = styled.div`
  margin: 15px;
  text-align: left;
  font-size: 2rem;
  .remove {
    cursor: pointer;
    color: #ff257b;
    font-size: 3rem;
  }
`;

export default class extends React.Component {

  render(){
    return (
      <StyledRecord>
        <div>
          <div>
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
