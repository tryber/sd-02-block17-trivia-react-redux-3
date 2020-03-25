import React from 'react';
import PropTypes from 'prop-types';


class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: {} };
    this.answers = this.answers.bind(this);
  }

  answers(element) {
    const { correct_answer: correct, incorrect_answers: incorrect } = element;
    const arr = [correct, ...incorrect];
    const arr2 = (arr.length > 2) ? ['', '', '', ''] : ['', ''];
    for (let i = 0; i < arr2.length; i += 1) {
      const aux = (arr.length > 1) ? Math.round((Math.random() * arr.length)) : 0;
      arr2[i] = arr.splice(aux - 1, 1)[0]
    }
    this.setState({ results: arr2 });
  }
  
  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question !== question) {
      this.answers(question);
    }
  }


  render() {
    const { results } = this.state;
    return (
      <div>
        {(Object.keys(results).length > 0) ? results.map((response) => <button key={response}><h3>{response}</h3></button>) : ''}
      </div>
    );
  }
}


export default Answers;

Answers.propTypes = {
  question: PropTypes.instanceOf(Object),
};
Answers.defaultPorps = {
  question: {},
};