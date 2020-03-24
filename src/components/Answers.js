import React from 'react';
import { connect } from 'react-redux';

function answers(element) {
  const { correct_answer: correct, incorrect_answers: incorrect } = element;
  const arr = [correct, ...incorrect];
  let arr2 = ['', '', '', ''];
  for (let i = 0; i < arr2.length; i++) {
    let aux = (arr.length > 1) ? Math.round((Math.random() * arr.length)) : 0;
    arr2[i] = arr[aux];
    arr.splice(aux, 1);
  }
  return arr2;
}

class Answers extends React.Component {
  constructor(props) {
    super(props);
    const { question } = this.props;
    this.state = { results: answers(question) }
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        {results.map((response) => <button key={response}><h3>{response}</h3></button>) || ''}
      </div>
    );
  }
}
const mapStateToProps = ({ getQuestions: { results } }) => ({ results });

export default connect(mapStateToProps)(Answers);

