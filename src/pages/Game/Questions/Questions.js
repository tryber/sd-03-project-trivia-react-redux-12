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

  componentDidMount() {
    const objLocalStore = {
       player: {
        name: this.props.name,
        assertions: 0,
        score: 0,
        gravatarEmail: 'sdfsdf@gmail.com',
      },
     };
    localStorage.setItem('state', JSON.stringify(objLocalStore));
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
    return dataTestId === 'correct-answer' ? this.sumScoreAndSaveInformations(this.state.timer, this.state.question.difficulty) : null;
  }

  sumScoreAndSaveInformations(timer, level) {
    let scoreQuestion = 0;
    const localstorageScore = JSON.parse(localStorage.getItem('state'));
    switch (level) {
      case 'hard':
        scoreQuestion += localstorageScore.player.score + 10 + (timer * 3);
        break;
      case 'medium':
        scoreQuestion += localstorageScore.player.score + 10 + (timer * 2);
        break;
      case 'easy':
        scoreQuestion += localstorageScore.player.score + 10 + (timer * 1);
        break;
      default:
        break;
    }
    const objLocalStore = {
      player: {
       name: this.props.name,
       assertions: 0,
       score: scoreQuestion,
       gravatarEmail: '',
     },
    };
    localStorage.setItem('state', JSON.stringify(objLocalStore));
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
          data-testid="btn-next"
          onClick={() => this.nextQuestion(index)}
        >
          Próxima
        </button> :
        <Link to="/feedback"><button data-testid="btn-next">Próxima</button></Link>;
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
        <section>
          <div data-testid="question-category">
            {category}
          </div>
          <div data-testid="question-text">
            {question}
          </div>
          <div>
            {timer >= 0 && timer}
          </div>
        </section>
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
  name: state.PIreducer.name,
});

Questions.propTypes = {
  name: PropTypes.string.isRequired,
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
