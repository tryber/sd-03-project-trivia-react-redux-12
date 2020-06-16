import React from 'react';
import { Link } from 'react-router-dom';
import './ranking.css';

class Ranking extends React.Component {
  static renderRanking(array) {
    array.sort((a, b) => b.score - a.score);
    return (
      array.map((e, index) => <div key={e.name} className={((index + 1) % 2 === 0) ? 'rank-even' : 'rank-odd'}>
        <img src={e.picture} alt="avatar" />
        <p data-testid={`player-name-${index}`}>{e.name}</p>
        <p data-testid={`player-score-${index}`}>Score: {e.score}</p>
      </div>)
    );
  }

  render() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Rankings</h1>
        {Ranking.renderRanking(rankings)}
        <Link to="/">
          <button data-testid="btn-go-home">Tela inicial</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
