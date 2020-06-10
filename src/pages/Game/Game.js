import React from 'react';
import { connect } from 'react-redux';
import { triviaAPI, fetchToken, URL_TOKEN } from '../../services/triviaAPI';
import Header from './Header/Header';
import Questions from './Questions/Questions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.setState({ token });
  }

  componentDidUpdate(_prevProps, prevState) {
    const { token } = this.state;
    const { triviaAPIs } = this.props;
    if(prevState.token !== token) {
      localStorage.setItem('token', token);
      triviaAPIs(token);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch)  => ({
  triviaAPIs: (token) => dispatch(triviaAPI(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
