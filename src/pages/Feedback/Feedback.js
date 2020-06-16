import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Game/Header/Header';

class Feedback extends React.Component {

  render() {
   const { score, assertions } = this.props;
   let feedback;
   console.log(assertions);
   if(assertions < 3 ) {
   feedback = 'Podia ser melhor...';
   } else if (assertions >= 3) {
   feedback = 'Mandou bem!';
   }

   return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{feedback}</h3>
        <label>Total de Pontos: <p data-testid="feedback-total-score">{score}</p></label>
        <label>Total de Pontos:<h5 data-testid="feedback-total-question">{assertions}</h5></label>
        <Link to="/ranking"><button data-testid="btn-ranking">Ver Ranking</button></Link>
        <Link to="/"> <button data-testid="btn-play-again">Jogar novamente</button></Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  score: state.gameInfoReducer.score,
  assertions: state.gameInfoReducer.assertions,
});
export default connect(mapStateToProps)(Feedback);
