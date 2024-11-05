"use client";

import React, { useState } from "react";

const BasicCalculator = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators: string[] = ["x", "/", "+", "-"];
  const actions: string[] = ["C", "←", "="];

  const handleNumberClick = (number: number | string) => {
    // Prevent multiple dots in the same number
    if (number === "." && input.includes(".")) return;

    setInput((prev) => prev + number.toString());
  };

  const handleOperatorClick = (operator: string) => {
    let lastCharacter = input[input.length - 1];
    // assign output
    if (output) {
      if (!isNaN(Number(lastCharacter))) {
        setInput(output + operator);
      }
      setOutput(""); //Clear output
    } else {
      // Only allow appending an operator if the last character is a number
      if (!isNaN(Number(lastCharacter))) {
        setInput((prev) => prev + operator);
      }
    }
  };

  const handleActionClick = (action: string) => {
    if (action === "C") {
      setInput("");
      setOutput("");
    }
    if (action === "←") {
      setInput((prev) => prev.slice(0, -1));
    }
    if (action === "=") {
      computation();
    }
  };

  const computation = () => {
    const expression = input;
    let result;

    try {
      if (!output) setInput((prev) => prev); // Clear before displaying result
      result = evaluateExpression(expression);
      setOutput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const evaluateExpression = (expr: string): number => {
    expr = expr.replace(/\s+/g, "");
    const tokens = expr.match(/(\d+\.?\d*|[+\-x/])/g); // Using * instead of x

    if (!tokens) throw new Error("Invalid Expression");

    const output: (number | string)[] = [];
    const operators: string[] = [];
    const precedence: { [key: string]: number } = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    tokens.forEach((token) => {
      if (!isNaN(Number(token))) {
        output.push(parseFloat(token));
      } else {
        while (
          operators.length &&
          precedence[operators[operators.length - 1]] >= precedence[token]
        ) {
          output.push(operators.pop()!);
        }
        operators.push(token);
      }
    });

    while (operators.length) {
      output.push(operators.pop()!);
    }

    const evalStack: number[] = [];

    output.forEach((token) => {
      if (typeof token === "number") {
        evalStack.push(token);
      } else {
        const b = evalStack.pop()!;
        const a = evalStack.pop()!;
        switch (token) {
          case "+":
            evalStack.push(a + b);
            break;
          case "-":
            evalStack.push(a - b);
            break;
          case "x":
            evalStack.push(a * b);
            break;
          case "/":
            if (b === 0) throw new Error("Division by zero");
            evalStack.push(a / b);
            break;
        }
      }
    });

    return evalStack.pop()!;
  };

  return (
    <div className="bg-[#E8E8E8] inline-grid gap-5 w-full p-5 h-[450px] sm:w-[450px] 
    font-semibold text-2xl">
      <div className="inline-grid">
        <input
          disabled={true}
          type="text"
          className="input_field"
          value={input}
        />
        <input
          disabled={true}
          type="text"
          className="input_field"
          value={output}
        />
      </div>
      <div className="flex gap-1">
        {/* numbers */}
        <div className="grid grid-cols-3 grid-flow-row gap-1 w-full">
          {numbers.map((element, index) => (
            <button
              id="number_button"
              key={element}
              onClick={() => handleNumberClick(element)}
              className={`bg-white calculator_button
                        ${index === numbers.length - 1 ? "col-span-2" : ""}
                     `}
            >
              {element}
            </button>
          ))}

          {/* dot */}
          <button
            className="bg-white calculator_button"
            onClick={() => handleNumberClick(".")}
          >
            .
          </button>
        </div>

        {/* operators */}
        <div className="inline-grid gap-1 w-1/3">
          {operators.map((element) => (
            <button
              key={element}
              onClick={() => handleOperatorClick(element)}
              className="bg-[#F7C602] calculator_button"
            >
              {element}
            </button>
          ))}
        </div>

        {/* actions */}
        <div className="inline-grid gap-1 w-1/3">
          {actions.map((element) => (
            <button
              key={element}
              onClick={() => handleActionClick(element)}
              className="bg-[#D1D1D1] calculator_button"
            >
              {element}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
