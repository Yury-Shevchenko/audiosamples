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

export default function Record({ record, onRemove }) {
  return (
    <StyledRecord>
      <div>
        <div>
          <span className="remove" onClick={onRemove(record._id)}>
            &times;
          </span>&nbsp;
          <i>{record.title}</i> by {record.author} at <Moment format="YYYY-MM-DD HH:mm:ss">{record.createdAt}</Moment>
        </div>
        <div>
          <span>
            <audio src={`/api/play/${record._id}`} controls="controls" />
          </span>
        </div>
      </div>
    </StyledRecord>
  );
}
