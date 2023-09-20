"use client";

import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";

interface IProps {
  inputLength: number;
}

const CodeInput = () => {
  const array = [0, 1, 2, 3, 4, 5];
  const [code, setCode] = useState("");
  const [nextField, setNextField] = useState<HTMLElement | null>();
  // const [inputQuantity, setInputQuantity] = useState<string>("")
  useEffect(() => {
    if (nextField !== null) nextField?.focus();
  }, [nextField]);

  const changeHandler = (id: string, value: string) => {
    if (value) {
      setCode(code + value);
      if (value.length == 1 && Number(id) < array.length) {
        const nextField = document.getElementById(`${Number(id) + 1}`);
        setNextField(nextField);
      }
    } else {
      setCode(code.slice(0, code.length - 1));
      const currentField = document.getElementById(id);
      if (currentField) currentField.nodeValue = "";
    }
  };

  const backKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Backspace") {
      setCode(code.slice(0, code.length - 1));
      e.currentTarget.value = "";
      const nextField = document.getElementById(
        `${Number(e.currentTarget.id) - 1}`
      );
      setNextField(nextField);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {array.map((item) => (
        <input
          key={item}
          id={item.toString()}
          type="text"
          maxLength={1}
          onChange={(e) =>
            changeHandler(e.target.id, e.target.value.trim().replace(/\D/g, ""))
          }
          onKeyDown={backKeyDownHandler}
          disabled={item > code.length}
          className="w-10 h-10 text-sm p-2 rounded-xl border text-center focus:outline-none focus:shadow-lg transition duration-300"
        />
      ))}
    </div>
  );
};

export default CodeInput;
