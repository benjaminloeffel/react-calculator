import React, { Component } from "react";
import "./App.css";
import Button from "../Button/Button";
import Display from "../Display/Display";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: {
        equals: "=",
        zero: "0",
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/",
        decimal: ".",
        clear: "C",
      },
      inputValue: null,
      currentOperator: null,
      outputValue: 0,
      history: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
    this.handleEqualsButton = this.handleEqualsButton.bind(this);
    this.handleDecimalButton = this.handleDecimalButton.bind(this);
  }

  handleClick = (e) => {
    console.log(e.target);

    // Determine which button has been clicked and handle it accordingly
    switch (e.target.id) {
      case "clear":
        this.handleClearButton();
        break;
      case "zero":
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        this.handleDigitButton(e.target.value);
        break;
      case "add":
      case "subtract":
      case "multiply":
      case "divide":
        this.handleOperatorButton(e.target.value);
        break;
      case "equals":
        this.handleEqualsButton();
        break;
      case "decimal":
        this.handleDecimalButton();
        break;
      default:
        console.warn("There is no functionality for button:", e.target.id);
    }
  };

  handleClearButton = () => {
    console.log("CLEAR input/output values! 💣");
    this.setState({
      inputValue: null,
      outputValue: 0,
      currentOperator: null,
    });
  };

  handleDigitButton = (value) => {
    console.log(value);
    this.state.inputValue != null
      ? this.setState({
          inputValue: parseInt(" " + this.state.inputValue + value),
        })
      : this.setState({
          inputValue: parseInt(value),
        });
  };

  handleOperatorButton = (operator) => {
    if(this.state.outputValue && this.state.currentOperator) {
      this.setState({outputValue: this.calculate(this.state.outputValue, this.state.inputValue, this.state.currentOperator)});
    } else {
      this.setState({outputValue: this.state.inputValue});
    }

    this.setState({currentOperator: operator});
    this.setState({inputValue: 0});
  };

  handleEqualsButton = () => {
    this.setState({outputValue: this.calculate(this.state.outputValue, this.state.inputValue, this.state.currentOperator)})
  }

  handleDecimalButton = () => {
    console.log("Decimal Button pressed");
  }

  calculate(value1, value2, operator) {
    let result = null;

    switch(operator) {
      case "+":
        result = value1 + value2;
        break;
      case "-":
        result = value1 - value2;
        break;
      case "*":
        result = value1 * value2;
        break;
      case "/":
        result = value1 / value2;
        break;
      default:
        console.error("Something went wrong trying to calculate!");
    }

    return result;
  }

  render() {
    return (
      <div className="App">
        <p>Input Value: {this.state.inputValue}</p>
        <p>Operator: {this.state.currentOperator}</p>
        <p>Result: {this.state.outputValue}</p>
        <button onClick={this.handleClick}>Test</button>
        {Object.entries(this.state.buttons).map(([key, value]) => {
          return (
            <Button key={key} id={key} value={value} event={this.handleClick} />
          );
        })}
      </div>
    );
  }
}

export default App;
