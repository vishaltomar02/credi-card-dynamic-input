import React, { useState, useCallback, useRef, useEffect } from 'react';

function CreditCardInput(props) {
  const { noOfDigits: digits, noOfInputs: inputs } = props;
  const [inputArray, setInputArray] = useState([]);
  const [inputValues, setInputValues] = useState(new Array(inputs));

  const inputRefs = useRef([]);

  useEffect(() => {
    const newInputArray = [];
    for(let i = 0; i<inputs; i++)
    {
      newInputArray.push({id: i+1});
    }
    setInputArray(newInputArray);
  },[inputs, setInputArray]);

  function handleChange(e) {
    const newInputValues = [...inputValues];
    if (parseInt(e.target.id) === inputs && e.target.value.length >= digits) newInputValues[e.target.id - 1] = e.target.value.slice(0, digits);
    else { newInputValues[e.target.id - 1] = e.target.value; }
    setInputValues([...newInputValues]);
  };

  function handleKeyDown(e) {
    const index = Math.floor(inputValues.join('').length / digits - 1);
    const elemToFocus = inputRefs.current[index];
    if (e.keyCode === 8 && (index) >= 0 && inputRefs.current[index + 1]) {
      if (elemToFocus.value.length && !inputRefs.current[index + 1].value) {
        elemToFocus.focus();
        inputRefs.current[index + 1].blur();
      }
    }
  }

  const callBackRef = useCallback((index) => {
    const currentElem = inputRefs.current[index];
    if (currentElem && currentElem.value && currentElem.value.length > digits - 1) {
      currentElem.setAttribute("value", currentElem.value.slice(0, digits));
      inputRefs.current[index + 1] && inputRefs.current[index + 1].focus();
    }
  }, [digits]);


  useEffect(() => {
    inputValues.forEach((value, index) => {
      if (!inputValues[index - 1] && value && value.length > digits) {
        const newInputValues = inputValues.map((item, index) => {
          const slicedValue = value.slice(index * digits, (index + 1) * digits);
          if (slicedValue) {
            return slicedValue;
          }
          else return item;
        });
        setInputValues(newInputValues);
      }
    });
  }, [inputValues, digits]);

  useEffect(() => {
    const index = Math.floor(inputValues.join('').length / digits - 1);
    callBackRef(index);
  }, [callBackRef, inputValues, digits]);

  return (
    <div className="container">
      <button className="button" type="text" onClick={() => props.handleContentChange()}>Reset</button>
      <h2>Enter you Card Number</h2>
      <div className="card-input">
        <h3>Card Number:</h3>
        {/* <input id="hidden-input" ></input> */}
        <div>
          { inputArray && 
            inputArray.map((item, index) => {
              return (
                <input
                  key={index}
                  ref={(element => inputRefs.current[index] = element)}
                  id={item.id}
                  type="number"
                  disabled={index>0 && (!inputValues[index-1] || (inputValues[index-1] && inputValues[index-1].length<digits))}
                  value={inputValues[index]}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handleChange(e)}></input>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default CreditCardInput;