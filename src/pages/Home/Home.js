import React from 'react';
import * as CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchToken } from '../../services/triviaAPI';
import { setEmail, setName } from '../../redux/actions/piactions';
import './home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      token: '',
    };

    this.submitInfo = this.submitInfo.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState !== this.state) {
      const state = {
        player: {
          name: this.state.name,
          assertions: 0,
          score: 0,
          gravatarEmail: this.state.email,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  submitInfo() {
    const { name, email } = this.state;
    const { setEmailInfo, setNameInfo } = this.props;
    fetchToken()
      .then((tokenJSON) => {
        localStorage.setItem('token', tokenJSON.token);
        this.setState({ token: tokenJSON.token });
      });
    setNameInfo(name);
    const hash = CryptoJS.MD5(email.trim().toLowerCase());
    setEmailInfo(email, hash.toString(CryptoJS.enc.Hex));
  }

  render() {
    const { name, email, token } = this.state;
    if (token !== '') return <Redirect to="/game" />;
    return (
      <div className="form-container">
        <h1>Trivia</h1>
        <label htmlFor="name">Digite seu nome</label>
        <input
          id="name" type="text" data-testid="input-player-name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor="emal">Digite seu e-mail</label>
        <input
          id="emal" type="email" data-testid="input-gravatar-email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <button
          className="play-button"
          type="button" disabled={(!name || !email)}
          onClick={this.submitInfo} data-testid="btn-play"
        >
          Jogar
        </button>
        <Link to="/setting">
          <button className="set-btn" data-testid="btn-settings" type="button">
            <img src="https://img.icons8.com/ios-filled/50/000000/automatic.png" width="35px"/>
          </button>
        </Link>
      </div>
    );
  }
}

Home.propTypes = {
  setEmailInfo: PropTypes.func.isRequired,
  setNameInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmailInfo: (email, hash) => dispatch(setEmail(email, hash)),
  setNameInfo: (name) => dispatch(setName(name)),
});

export default connect(null, mapDispatchToProps)(Home);
