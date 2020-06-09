import React from 'react';
import { connect } from 'react-redux';
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
      index: 0,
    }
  }
  nextQuestion() {
    const { questions } = this.props;
    const { index } = this.state;
    this.setState({
      category: questions[index].category,
      question: questions[index],
      time: '30',
      correct_answer: questions[index].correct_answer,
      incorrect_answers: questions[index].incorrect_answers,
      index: index + 1,
    });
  }
  render() {
    return (
      <section className="Questions-Container">
        <section>
          <div>
            CATEGORIA
          </div>
          <div>
            PERGUNTA
          </div>
          <div>
            TEMPO
          </div>
        </section>
        <section>
          <div>
            OPÇOES
          </div>
          <button onClick={() => this.nextQuestion()}>PRÓXIMA</button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
})

export default connect(mapStateToProps)(Questions);
