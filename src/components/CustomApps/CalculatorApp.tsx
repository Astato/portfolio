import { useState, useEffect } from "react";
import { Backspace, History } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import "../../styles/calculator.scss";
import { evaluate } from "mathjs";
import tinycolor from "tinycolor2";

const Calculator = () => {
  const [value, setValue] = useState<string>("0");
  const [inputedValues, setInputedValues] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [operationFinished, setOperationFinished] = useState<boolean>(false);
  const [parenthesisInput, setParenthesisInput] = useState<boolean>(false);

  const theme = useTheme() as import("@mui/material").Theme;
  const mode = theme.palette.mode;
  const mainColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.primary.dark;
  const terciaryColor = theme.palette.primary.light;

  // const checkForDecimals = /\d+[..?]\d+$/;

  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", mainColor);
    // const buttonsColor = `${mainColor}${Math.round(0.2 * 255).toString(16)}`;
    const analizeMainColor = tinycolor(mainColor);
    const analizeSecondaryColor = tinycolor(secondaryColor);
    const analizeTerciaryColor = tinycolor(terciaryColor);
    // const terciary = analizeTerciaryColor.spin(200).toString();
    const buttonsColor = analizeMainColor.setAlpha(0.2).toString();
    const analizeButtonsColor = tinycolor(buttonsColor);

    document.documentElement.style.setProperty("--display-color", buttonsColor);
    document.documentElement.style.setProperty(
      "--num-buttons-color",
      buttonsColor
    );
    document.documentElement.style.setProperty(
      "--operators-color",
      secondaryColor
    );
    document.documentElement.style.setProperty(
      "--terciary-color",
      terciaryColor
    );

    const isMainDark = analizeMainColor.isDark() ? "white" : "black";
    const isButtonsDark =
      analizeButtonsColor.getLuminance() < 0.5 ? "white" : "black";
    const isSecondaryDark = analizeSecondaryColor.isDark() ? "white" : "black";
    const isTerciaryDark = analizeTerciaryColor.isDark() ? "white" : "white";

    document.documentElement.style.setProperty("--main-font-color", isMainDark);
    document.documentElement.style.setProperty(
      "--display-font-color",
      isButtonsDark
    );
    document.documentElement.style.setProperty(
      "--num-buttons-font-color",
      isButtonsDark
    );
    document.documentElement.style.setProperty(
      "--operators-font-color",
      isSecondaryDark
    );
    document.documentElement.style.setProperty(
      "--terciary-font-color",
      isTerciaryDark
    );
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (operationFinished) {
      setOperationFinished(false);
    }
    const el = e.target as HTMLButtonElement;
    const input = el.value;
    if (!isNaN(Number(input))) {
      value === "0" ? setValue(input) : setValue((prev) => prev + input);
    } else {
      if (input === "." && !value.includes(".")) {
        setValue((prev) => prev + ".");
      } else if (
        isNaN(Number(input)) &&
        (value.endsWith(")") || !isNaN(Number(value[value.length - 1])))
      ) {
        setValue((prev) => prev + input);
        return handleCalculus();
      } else if (input !== "(") {
        setValue((prev) => prev.slice(0, -1) + input);
      }
    }
    return;
  };

  const handleCalculus = () => {
    console.log(/[$/*-+]$/.test(value), value);
    if (/[$/*-+]$/.test(value)) {
      return;
    }
    const result = evaluate(value);
    setResult(result);
    return result;
  };

  const handleEqual = () => {
    const endResult = handleCalculus();
    setInputedValues((prev) => [...prev, value + " = " + endResult]);
    setValue(endResult.toString());
    setOperationFinished(true);
    setParenthesisInput(false);
    return;
  };

  const handleParenthesis = () => {
    if (!value.endsWith("(")) {
      if (value === "0") {
        return setValue("(");
      } else if (!parenthesisInput) {
        setParenthesisInput(true);
        return setValue((prev) => prev + "(");
      } else {
        setParenthesisInput(false);
        return setValue((prev) => prev + ")");
      }
    }
    return;
  };

  const handleErase = () => {
    setValue("0");
    setResult(0);
    setParenthesisInput(false);
  };
  const handleBackspace = () => {
    if (operationFinished) {
      setValue("0");
    } else {
      setValue((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div id="calculator-container">
      <div className="history">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto 1rem",
          }}
        >
          <p style={{ fontSize: "21px" }}>History</p>
          <History
            sx={{ ":hover": { cursor: "pointer" } }}
            onClick={() => setInputedValues([])}
          />
        </div>
        <p className="previous-input">
          {inputedValues.map((operation, index) => {
            return <p key={index}>{operation}</p>;
          })}
        </p>
      </div>
      <div className="display">
        <p
          className="current-input"
          style={{
            opacity: operationFinished ? "0" : result !== 0 ? "1" : "0",
          }}
        >
          {result}
        </p>
        <p className="current-result" style={{ margin: "0 1rem" }}>
          {value}
        </p>
      </div>
      <div id="buttons-container">
        <button className="button" id="erase" onClick={handleBackspace}>
          <Backspace
            style={{ fontSize: 30, fill: mode === "dark" ? "white" : "black" }}
          ></Backspace>
        </button>
        <button
          className="operators button"
          id="multiply"
          value="*"
          onClick={(e) => {
            handleClick(e);
            handleCalculus();
          }}
        >
          ×
        </button>

        <button
          className="operators button"
          id="percentage"
          value="%"
          onClick={(e) => {
            handleClick(e);
            handleCalculus();
          }}
        >
          %
        </button>
        <button
          className="operators button"
          id="divide"
          value="/"
          onClick={(e) => {
            handleClick(e);
            handleCalculus();
          }}
        >
          /
        </button>
        <button className="button" id="clear" onClick={handleErase}>
          AC
        </button>
        <button
          className="operators button"
          id="parenthesis"
          value="("
          onClick={handleParenthesis}
        >
          ( )
        </button>

        <button
          className="operators button"
          id="subtract"
          value="-"
          onClick={(e) => {
            handleClick(e);
            handleCalculus();
          }}
        >
          -
        </button>
        <button className="button" value="." id="decimal" onClick={handleClick}>
          .
        </button>
        <button
          className="operators button"
          id="add"
          value="+"
          onClick={(e) => {
            handleClick(e);
            handleCalculus();
          }}
        >
          +
        </button>
        <button
          className="button operators "
          id="equals"
          onClick={() => handleEqual()}
        >
          =
        </button>
        <button className="button" id="one" value={1} onClick={handleClick}>
          1
        </button>
        <button className="button" id="two" value={2} onClick={handleClick}>
          2
        </button>
        <button className="button" id="three" value={3} onClick={handleClick}>
          3
        </button>
        <button className="button" id="four" value={4} onClick={handleClick}>
          4
        </button>
        <button className="button" id="five" value={5} onClick={handleClick}>
          5
        </button>
        <button className="button" id="six" value={6} onClick={handleClick}>
          6
        </button>

        <button className="button" id="seven" value={7} onClick={handleClick}>
          7
        </button>
        <button className="button" id="eight" value={8} onClick={handleClick}>
          8
        </button>
        <button className="button" id="nine" value={9} onClick={handleClick}>
          9
        </button>
        <button className="button" id="zero" value={0} onClick={handleClick}>
          0
        </button>
      </div>
    </div>
  );
};

export default Calculator;
