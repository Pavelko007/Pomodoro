import { useEffect, useState } from "react";
import { View, Text, Button, Pressable } from "react-native";

export function Timer() {
  const [countdownTime, setCountdownTime] = useState({ min: 25, sec: 0 });
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev.min === 0 && prev.sec === 0) {
            clearInterval(interval);
            // todo: start break timer
            return prev;
          }

          const newSec = prev.sec === 0 ? 59 : prev.sec - 1;
          const newMin = prev.sec === 0 ? prev.min - 1 : prev.min;

          return { min: newMin, sec: newSec };
        });
      }, 1000);
    }

    return () => {
      console.log("clearing interval");
      clearInterval(interval);
    };
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
