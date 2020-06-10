import React from 'react';
import * as CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchToken } from '../../services/triviaAPI';
import { setEmail, setName } from '../../redux/actions/piactions';

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
      <div>
        <label htmlFor="name">Digite seu nome:</label>
        <input
          id="name" type="text" data-testid="input-gravatar-email"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor="emal">Digite seu email:</label>
        <input
          id="emal" type="email" data-testid="input-player-name"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <button
            type="button" disabled={(!name || !email)}
            onClick={this.submitInfo} data-testid="btn-play"
        >
          Jogar
        </button>
        <Link to="/setting">
          <button data-testid="btn-settings" type="button">Configurações</button>
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
