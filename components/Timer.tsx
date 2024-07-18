import { useEffect, useState } from "react";
import { View, Text, Button, Pressable } from "react-native";

export function Timer() {
  const isBreakInit = false;
  const workDuration = { min: 25, sec: 0 };
  const breakDuration = { min: 5, sec: 0 };
  const isRunningInit = false;

  const [countdownTime, setCountdownTime] = useState({ min: 0, sec: 0 });
  const [isRunning, setIsRunning] = useState(isRunningInit);
  const [isBreak, setIsBreak] = useState(isBreakInit);

  //reset timer when switching between work and break
  useEffect(() => {
    setCountdownTime(isBreak ? breakDuration : workDuration);
  }, [isBreak]);

  //update timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev.min === 0 && prev.sec === 0) {
            clearInterval(interval);
            setIsBreak((prevIsBreak) => !prevIsBreak);
            setIsRunning(false);
            return prev;
          }

          const newSec = prev.sec === 0 ? 59 : prev.sec - 1;
          const newMin = prev.sec === 0 ? prev.min - 1 : prev.min;

          return { min: newMin, sec: newSec };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <View>
      <Pressable onPress={() => setIsRunning((prev) => !prev)}>
        <Text>
          {countdownTime.min} : {countdownTime.sec}
        </Text>
      </Pressable>
    </View>
  );
}
