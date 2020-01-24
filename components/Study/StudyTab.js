import styled from "styled-components"
import Moment from 'react-moment'
import Link from 'next/link'

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

  render(){
    const {study} = this.props
    return (
      <StyledStudyTab>
        <div>
          <div>
            <span className="remove" onClick={ () => { if (window.confirm('Are you sure you want to delete this study? You will lose access to records, which cannot be recovered.')) this.props.onRemove(study._id) } }>
              &times;
            </span>&nbsp;
            <Link href="/s/[id]" as={`/s/${study._id}`}>
              <a>
                <i>{study.name}</i> at <Moment format="YYYY-MM-DD HH:mm:ss">{study.createdAt}</Moment>
                <div>
                  {study.users && study.users.length} participants
                </div>
              </a>
            </Link>
          </div>
          <div>
            <span>

            </span>
          </div>
        </div>
      </StyledStudyTab>
    )
  }
}
