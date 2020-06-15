import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends React.Component {
  static async getShuffledArr(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
  }

  constructor(props) {
    super(props);
    this.state = {
      interval: 0,
      correct: '',
      wrong: '',
      category: '',
      question: '',
      timer: 30,
      correctAnswer: '',
      incorrectAnswers: [],
      options: [],
      index: 0,
      answered: false,
      disabledOption: false,
    };
    this.checkResponse = this.checkResponse.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) {
      this.nextQuestion(0);
      this.timer();
    }
  }

  timer() {
    const interval = setInterval(() => {
      this.setState((state) => ({ timer: state.timer - 1 }));
      const { timer } = this.state;
      return (timer === 0 && this.checkResponse('wrong-answer'));
    }, 1000);
    this.setState({ intervalId: interval });
  }

  checkResponse(dataTestId) {
    this.setState({
      answered: true,
      disabledOption: true,
      wrong: 'wrong',
      correct: 'correct',
    });
    return dataTestId === 'correct-answer' ? console.log('Somar pontos') : null;
  }

  nextQuestion(index) {
    clearInterval(this.state.interval);
    this.setState({
      answered: false,
      disabledOption: false,
      wrong: '',
      correct: '',
    });
    const { questions } = this.props;
    const options = [questions[index].correct_answer, ...questions[index].incorrect_answers];
    Questions.getShuffledArr(options)
    .then((newArray) => (
      this.setState({
        category: questions[index].category,
        question: questions[index],
        timer: 30,
        correctAnswer: questions[index].correct_answer,
        incorrectAnswers: questions[index].incorrect_answers,
        options: newArray,
        index: index + 1,
      })),
    );
  }

  optionsButtons(dataTestId, option) {
    const { disabledOption, correct, wrong } = this.state;
    const className = dataTestId === 'correct-answer' ? correct : wrong;
    return (
      <button
        className={`options ${className}`}
        disabled={disabledOption}
        onClick={() => this.checkResponse(dataTestId)}
        data-testid={dataTestId}
        key={option}
      >
        {option}
      </button>
    );
  }

  renderButtons() {
    const { index, answered } = this.state;
    if (answered) {
      return index < 5 ?
        <button
          className="next"
          data-testid="btn-next"
          onClick={() => this.nextQuestion(index)}
        >
          Próxima
        </button> :
        <Link to="/feedback">
          <button
            className="next"
            data-testid="btn-next"
          >
            Próxima
          </button>
        </Link>;
    }
    return null;
  }

  renderOptions() {
    let index = -1;
    const { options, correctAnswer } = this.state;
    return (
      <div className="options-container">
        {options.map((option) => {
          if (option === correctAnswer) {
            return (
              this.optionsButtons('correct-answer', option)
            );
          }
          index += 1;
          return (
            this.optionsButtons(`wrong-answer-${index}`, option)
          );
        })}
      </div>
    );
  }

  render() {
    const { category, question: { question }, timer } = this.state;
    return (
      <section className="Questions-Container">
        <section className="Question-box">
          <div className="Category" data-testid="question-category">
            {category}
          </div>
          <div className="Line" />
          <div data-testid="question-text">
            {question}
          </div>
        </section>
        <div>
          {timer >= 0 && `00:00:${timer.toFixed()}`}
        </div>
        <section className="buttons-container">
          {this.renderOptions()}
          {this.renderButtons()}
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
