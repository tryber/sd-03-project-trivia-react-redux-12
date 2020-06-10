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
    const { hash, name } = this.props;
    return (
      <header className="Game-Header">
        <div className="Personal-Info">
          <img
            data-testid="header-profile-picture"
            src={`https://www.gravatar.com/avatar/${hash}`}
            alt="Imagem do jogador"
          />
          <p data-testid="header-player-name">Nome da pessoa: {`${name}`}</p>
        </div>
        <div>
          <p data-testid="header-score">Pontos: {`${this.state.points}`}</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.PIreducer.name,
  hash: state.PIreducer.hash,
});

export default connect(mapStateToProps)(Header);
