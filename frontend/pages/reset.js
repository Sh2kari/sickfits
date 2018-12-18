import ResetComponent from '../components/Reset';

const Reset = ({ query }) => (
  <div>
    <p>Reset Your Password {query.resetToken}</p>
    <ResetComponent resetToken={query.resetToken} />
  </div>
);

export default Reset;
