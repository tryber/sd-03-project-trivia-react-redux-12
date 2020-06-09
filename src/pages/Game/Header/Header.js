import React from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { points: '0', hash: '187735621/82b2e6594d426239a164b4d585e66480'};
  }
  render() {
    const exempleName = 'Lucas Cardoso';

    return (
      <header className="Game-Header">
        <div className="Personal-Info">
          <img data-testid="header-profile-picture" src={`https://pt.gravatar.com/userimage/${this.state.hash}`} />
          <p data-testid="header-player-name">Jogador {`${exempleName}`}</p>
        </div>
        <div>
          <p data-testid="header-score">Pontos: {`${this.state.points}`}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
})

export default connect(mapStateToProps)(Header);
