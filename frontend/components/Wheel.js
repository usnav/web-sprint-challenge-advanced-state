import React, { useState } from 'react';
import reducer, { initialWheelState } from '../state/reducer'; 
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';
import { connect } from 'react-redux';

function Wheel(props) {
    const { wheel, moveClockwise, moveCounterClockwise } = props; 

  const [current, setCurrent] = useState({
        isCurrent: "cog active",
        isNotCurrent: "cog",
        isCurrentB: "B", 
        isNotCurrentB: ""  
  })

  

  const wheelCurrent = [0, 1, 2, 3, 4, 5].map(i => (
    <div className= {wheel === i ?`${current.isCurrent}`:`${current.isNotCurrent}`} 
         style={{ "--i": i }}
         key={i} 
         >{wheel === i ?`${current.isCurrentB}`:`${current.isNotCurrentB}`} 
         </div>
  ))


  return (
    <div id="wrapper">
      <div id="wheel"> {wheelCurrent}
      </div>
      <div id="keypad">
        <button onClick={moveCounterClockwise} id="counterClockwiseBtn" >Counter clockwise</button>
        <button onClick={moveClockwise} id="clockwiseBtn">Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel); 
