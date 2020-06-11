import React from 'react';
import Header from '../Game/Header/Header';

class Feedback extends React.Component {

  render() {
    const state = {
      player: {
        name: 'clayton',
        assertions: 2,
        score: 200,
        gravatarEmail: 'fulano@gmail.com',
      },
    };
    return (
      <div>
        <Header />
        {state.player.assertions < 3
        ? <h1 data-testid="feedback-text"> Podia ser melhor...</h1>
        : <h1 data-testid="feedback-text">Mandou bem!</h1>}
        <button data-testid="btn-ranking">Ver Ranking</button>
        <button data-testid="btn-play-again">Jogar novamente</button>

      </div>
    );
  }
}

export default Feedback;
