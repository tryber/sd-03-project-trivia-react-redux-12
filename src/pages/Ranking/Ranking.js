import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 30,
      intervalId: 0,
    }
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }
  renderRanking(array) {
    array.sort((a, b) => b.score - a.score)
    return(
      array.map((e, index) => <div key={e.name}>
        <img src={e.picture} alt="avatar" />
        <p data-testid={`player-name-${index}`}>{e.name}</p>
        <span data-testid={`player-score-${index}`}>{e.score}</span>
      </div>)
    )
  }

  render() {
    const mock = [
      {name: 'Thiago Aguiar', score: 10, picture: 'https://www.gravatar.com/avatar/1ac1132092083b6b253f323a65ff80dc'},
      {name: 'Lucas Soares', score: 32, picture: 'https://www.gravatar.com/avatar/80651d42c055aa99d151ab6f59649982'},
      {name: 'Clayton Pereira', score: 25, picture: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3'},
    ]
    const { counter } = this.state;
    return (
      <div>
        <p>{counter}</p>
        <br />
        <Link to="/">
          <button data-testid="btn-go-home">Tela inicial</button>
        </Link>
          {this.renderRanking(mock)}
      </div>
    );
  }
}

export default Ranking;
