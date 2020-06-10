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
      correct_answer: '',
      incorrect_answers: [],
      options: [],
      index: 0,
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  nextQuestion(index) {
    const { questions } = this.props;
    console.log(questions);
    const options = [questions[index].correct_answer, ...questions[index].incorrect_answers];
    this.setState({
      category: questions[index].category,
      question: questions[index],
      time: '30',
      correct_answer: questions[index].correct_answer,
      incorrect_answers: questions[index].incorrect_answers,
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

  componentWillUpdate(prevProps) {
    if(prevProps.questions !== this.props.questions) {
      console.log('Props Atualizada:', this.props.questions);
    }
  }

  render() {
    let index = -1;
    const { options, category, question: { question }, time, correct_answer } = this.state;
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
          <div>
            {options.map((option) => (option === correct_answer) ?
            <button data-testid="correct-answer" key={option}>{option}</button> :
            <button data-testid={`wrong-answer-${index += 1}`} key={option}>{option}</button>
            )}
          </div>
          {this.renderButton()}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
})

Questions.propTypes = {
  question: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired),
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
}

export default connect(mapStateToProps)(Questions);
