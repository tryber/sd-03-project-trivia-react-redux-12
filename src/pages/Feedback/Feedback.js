import React from 'react';

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
        <img data-testid="header-profile-picture" alt="do jogador" />
        <h2 data-testid="header-player-name">Name</h2>
        <h2 data-testeid="header-score-">Placar</h2>
        {state.player.assertions < 3
        ? <h1 data-testid="feedback-text"> Podia ser melhor...</h1>
        : <h1 data-testid="feedback-text">Mandou bem!</h1>}
      </div>
    );
  }
}

export default Feedback;
