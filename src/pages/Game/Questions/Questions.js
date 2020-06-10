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
      index: 0,
      answered: false,
      disabledOption: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) {
      this.nextQuestion(0);
    }
  }

  static async getShuffledArr(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[rand]] = [newArray[rand], newArray[i]];
    }
    return newArray;
  }

  nextQuestion(index) {
    this.setState({ answered: false, disabledOption: false });
    const { questions } = this.props;
    const options = [questions[index].correct_answer, ...questions[index].incorrect_answers];
    Questions.getShuffledArr(options)
    .then((newArray) => (
      this.setState({
        category: questions[index].category,
        question: questions[index],
        time: '30',
        correctAnswer: questions[index].correct_answer,
        incorrectAnswers: questions[index].incorrect_answers,
        options: newArray,
        index: index + 1,
      })),
    );
  }

  optionsButtons(dataTestId, option) {
    const { disabledOption } = this.state;
    return (
      <button
        disabled={disabledOption}
        onClick={() => this.setState({ answered: true, disabledOption: true })}
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
        <button data-testid="btn-next" onClick={() => this.nextQuestion(index)}>Próxima</button> :
        <Link to="/feedback"><button data-testid="btn-next">Próxima</button></Link>;
    }
    return null;
  }

  renderOptions() {
    let index = -1;
    const { options, correctAnswer } = this.state;
    return (
      <div>
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
