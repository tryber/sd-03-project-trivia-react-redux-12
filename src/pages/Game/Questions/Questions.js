import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      time: '30',
      correctAnswer: '',
      incorrectAnswers: [],
      options: [],
      index: 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) {
      this.nextQuestion(0);
    }
  }

  nextQuestion(index) {
    const { questions } = this.props;
    const options = [questions[index].correct_answer, ...questions[index].incorrect_answers];
    this.setState({
      category: questions[index].category,
      question: questions[index],
      time: '30',
      correctAnswer: questions[index].correct_answer,
      incorrectAnswers: questions[index].incorrect_answers,
      options,
      index: index + 1,
    });
  }

  renderButton() {
    const { index } = this.state;
    return index !== 5 ?
      <button onClick={() => this.nextQuestion(index)}>PRÓXIMA</button> :
      <div>
        <button><Link to="/">Jogar novamente</Link></button>
        <button><Link to="/feedback">Finalizar</Link></button>
      </div>;
  }

  renderOptions() {
    let index = -1;
    const { options, correctAnswer } = this.state;
    return (
      <div>
        {options.map((option) => {
          if (option === correctAnswer) {
            return (
              <button data-testid="correct-answer" key={option}>{option}</button>
            );
          }
          index += 1;
          return (
            <button data-testid={`wrong-answer-${index}`} key={option}>{option}</button>
          );
        })}
      </div>
    );
  }

  render() {
    const { category, question: { question }, time } = this.state;
    return (
      <section className="Questions-Container">
        <section>
          <div data-testid="question-category">
            {category}
          </div>
          <div data-testid="question-text">
            {question}
          </div>
          <div>
            {time}
          </div>
        </section>
        <section>
          {this.renderOptions()}
          {this.renderButton()}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired),
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Questions);
