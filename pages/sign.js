import * as superagent from 'superagent';
import Layout from '../components/MyLayout';
import SignComponent from '../components/Sign';

export default function Sign(props) {
  return (
    <Layout>
      <h1>Sign up {props.study && `for the study ${props.study.name}`}</h1>
      <SignComponent study={props.study && props.study._id} />
    </Layout>
  );
}

Sign.getInitialProps = async ({ query }) => {
  const { invitetoken } = query;
  if (invitetoken) {
    if (process.browser) {
      const study = await superagent
        .get(`/study/getname/${invitetoken}`)
        .then(res => res.body);
      return { study };
    }
    const mongoose = require('mongoose');
    const Project = mongoose.model('project');
    const [study] = await Project.find({ invitetoken }, { name: 1 });
    return { study };
  }
};
