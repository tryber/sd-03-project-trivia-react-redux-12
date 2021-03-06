import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { points: '0' };
  }

  render() {
    const { hash, name, score } = this.props;
    return (
      <header className="Game-Header">
        <div className="Personal-Info">
          <img
            className="Player-Picture"
            data-testid="header-profile-picture"
            src={`https://www.gravatar.com/avatar/${hash}`}
            alt="Imagem do jogador"
          />
          <p
            className="Player"
            data-testid="header-player-name"
          >
            Nome da pessoa: {`${name}`}
          </p>
        </div>
        <div className="Personal-Info">
          <label htmlFor="score"> Pontos: </label>
          <p
            name="score"
            className="Player"
            data-testid="header-score"
          >
            {score}
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.PIreducer.name,
  hash: state.PIreducer.hash,
  score: state.gameInfoReducer.score,
});

export default connect(mapStateToProps)(Header);
