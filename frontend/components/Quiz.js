import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import {
  selectAnswer,
  fetchQuiz,
  postAnswer, 
  setQuiz, 
  postQuiz
} from '../state/action-creators';



function Quiz(props) {
  const { quiz, selectedAnswer, selectAnswer, postAnswer, fetchQuiz } = props;


  useEffect(() => {
    if (quiz === null) {
      fetchQuiz();
    } 
  }, []);

  const answerResult = () => {
    if (props.selectedAnswer)
      if (props.selectedAnswer === props.quiz.answers[0].text) {
        return {
          quiz_id: props.quiz.quiz_id, 
          answer_id: props.quiz.answers[0].answer_id
        }
      } else return {
        quiz_id: props.quiz.quiz_id, 
        answer_id: props.quiz.answers[1].answer_id
      }
  }

  const onSubmit = () => {
      postAnswer(answerResult());
  }


  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${selectedAnswer === quiz.answers[0].text ? "selected" : ""}`}
              >
                {quiz.answers[0].text}

                <button
                  
                  onClick={() => {
                    selectAnswer(quiz.answers[0].text);
                  }}
                >
                  {selectedAnswer === quiz.answers[0].text ? "SELECTED" : "select"}
                </button>
              </div>

              <div className={`answer ${selectedAnswer === quiz.answers[1].text ? "selected" : ""}`}>
                {quiz.answers[1].text}
                <button
                  onClick= {() => selectAnswer(quiz.answers[1].text)}
                >
                  {selectedAnswer === quiz.answers[1].text ? "SELECTED" : "select"}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              onClick= {onSubmit}
              disabled={!selectedAnswer}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz, 
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, {
  selectAnswer, 
  postAnswer, 
  fetchQuiz,
  setQuiz, 
  postQuiz 
})(Quiz);