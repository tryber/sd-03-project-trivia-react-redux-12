import React from 'react';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        Feedback
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
});
export default connect(mapStateToProps)(Feedback);
