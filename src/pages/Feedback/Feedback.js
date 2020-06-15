import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        ? <h3 data-testid="feedback-text"> Podia ser melhor...</h3>
        : <h3 data-testid="feedback-text">Mandou bem!</h3>}
        <h3 data-testid="feedback-total-score">Total de Pontos</h3>
        <h3 data-testid="feedback-total-question">Total de questões certas</h3>
        <Link to="/ranking"><button data-testid="btn-ranking">Ver Ranking</button></Link>
        <Link to="/"> <button data-testid="btn-play-again">Jogar novamente</button></Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired),
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});
export default connect(mapStateToProps)(Feedback);
