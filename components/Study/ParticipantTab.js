import styled from 'styled-components';
import Moment from 'react-moment';
import Link from 'next/link';

const StyledStudyTab = styled.div`
  margin: 15px;
  text-align: left;
  font-size: 2rem;
  border: 1px solid brown;
  padding: 10px;
  .remove {
    cursor: pointer;
    color: #ff257b;
    font-size: 3rem;
  }
`;

export default class extends React.Component {
  render() {
    return (
      <StyledStudyTab>
        <div>
          <Link href="/u/[id]" as={`/u/${this.props.user.id}`}>
            <a>
              <i>{this.props.user.name}</i> registered at{' '}
              <Moment format="YYYY-MM-DD HH:mm:ss">
                {this.props.user.createdAt}
              </Moment>
            </a>
          </Link>
        </div>
      </StyledStudyTab>
    );
  }
}
