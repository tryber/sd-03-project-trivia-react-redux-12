import React from 'react';
import { Link } from 'react-router-dom';
import './ranking.css'

class Ranking extends React.Component {
  renderRanking(array) {
    array.sort((a, b) => b.score - a.score)
    return(
      array.map((e, index) => <div key={e.name} className={((index+1)%2 == 0) ? 'rank-even' : 'rank-odd'}>
        <img src={e.picture} alt="avatar" />
        <p data-testid={`player-name-${index}`}>{e.name}</p>
        <p data-testid={`player-score-${index}`}>Score: {e.score}</p>
      </div>)
    )
  }

  render() {
    const mock = [
      {name: 'Thiago Aguiar', score: 10, picture: 'https://www.gravatar.com/avatar/1ac1132092083b6b253f323a65ff80dc'},
      {name: 'Lucas Soares', score: 32, picture: 'https://www.gravatar.com/avatar/80651d42c055aa99d151ab6f59649982'},
      {name: 'Clayton Pereira', score: 25, picture: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3'},
    ]
    return (
      <div className="ranking-container">
        <h1>Rankings</h1>
          {this.renderRanking(mock)}
        <Link to="/">
          <button data-testid="btn-go-home">Tela inicial</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
