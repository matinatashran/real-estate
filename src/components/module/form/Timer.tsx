"use client";

import { Dispatch, SetStateAction, useState, useEffect, FC } from "react";

interface IProps {
  time: number;
  setIsStartTimer: Dispatch<SetStateAction<boolean>>;
}

const Timer: FC<IProps> = ({ time, setIsStartTimer }) => {
  let min: number = Math.floor(time / 60);
  let sec: number = time % 60;
  const [timer, setTimer] = useState<string>(
    `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
  );

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(`${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`);
      sec--;
      if (sec < 0 && min > 0) {
        sec = 59;
        min--;
      } else if (sec < 0 && min === 0) {
        clearInterval(timerInterval);
        setIsStartTimer(false);
      }
    }, 1000);
  }, [time]);

  if (timer !== "00:00") return <div>{`(${timer})`}</div>;
};

export default Timer;
