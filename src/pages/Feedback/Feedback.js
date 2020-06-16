import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Game/Header/Header';

class Feedback extends React.Component {

  render() {
    const { score, assertions } = this.props;
    let feedback;
    if (assertions < 3) {
      feedback = 'Podia ser melhor...';
    } else if (assertions >= 3) {
      feedback = 'Mandou bem!';
    }

    return (
      <div>
       <Header />
       <h3 data-testid="feedback-text">{feedback}</h3>
       <label htmlFor="score">Total de Pontos:
        <p
        name="score"
        data-testid="feedback-total-score"
        >{score}
        </p>
        </label>
       <label htmlFor="assertion"
       >Total de Pontos:
       <h5
        name="assertion"
        data-testid="feedback-total-question">
          {assertions}</h5>
        </label>
       <Link to="/ranking"><button data-testid="btn-ranking">Ver Ranking</button></Link>
       <Link to="/"> <button data-testid="btn-play-again">Jogar novamente</button></Link>
     </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.string.isRequired,
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  score: state.gameInfoReducer.score,
  assertions: state.gameInfoReducer.assertions,
});
export default connect(mapStateToProps)(Feedback);
