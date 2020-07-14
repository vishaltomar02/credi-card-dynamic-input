import React, { useState, useEffect } from 'react';
import './App.css';
import CreditCardInput from './CreditCardInput';

function App() {

  const [values, setValues] = useState({ no_of_inputs: '', no_of_digits: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};
    Object.keys(values).forEach((item) => {
      if (values[item] > 10) {
        errors[item] = 'Please enter a value less than 10';
      }
    });
    setErrors(errors);

  }, [values]);

  function handleSubmit(){
    setShow(!show);
  }

  function handleReset() {
    setShow(!show);
    setValues(() => ({no_of_digits: '', no_of_inputs: ''}))
  }

  return (
    <div className="app">
      {!show ?
        <div>
          <header >Choose the no. of inputs and no digits you want in each input</header>
          <div className="main-inputs">
            <section>
              <label htmlFor="no_of_inputs">Enter No of Inputs</label>
              <input id="no_of_inputs" type="number" name="no_of_inputs" onChange={(e) => setValues({ ...values, no_of_inputs: e.target.value })}></input>
              <div className="error">{errors.no_of_inputs && errors.no_of_inputs}</div>
            </section>
            <section>
              <label htmlFor="no_of_digits">Enter No of Digits</label>
              <input id="no_of_digits" type="number" name="no_of_digits" onChange={(e) => setValues({ ...values, no_of_digits: e.target.value })}></input>
              <div className="error">{errors.no_of_digits && errors.no_of_digits}</div>
            </section>
          </div>
          <button className="button" disabled={!values.no_of_inputs || !values.no_of_digits} type="text" onClick={() => handleSubmit()}>Show</button>
        </div> :
        <CreditCardInput
          noOfDigits={parseInt(values.no_of_digits)}
          noOfInputs={parseInt(values.no_of_inputs)}
          handleContentChange={handleReset}/>
        }
    </div>
  )
}

export default App;