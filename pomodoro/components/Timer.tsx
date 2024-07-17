import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export function Timer() {
  const [countdownTime, setCountdownTime] = useState({
    min: 25,
    sec: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev.min === 0 && prev.sec === 0) {
          clearInterval(interval);
          //todo start break timer
          return prev;
        }

        if (prev.sec === 0) {
          return { min: prev.min - 1, sec: 59 };
        }

        return { min: prev.min, sec: prev.sec - 1 };
      });
      return () => clearInterval(interval);
    }, 1000);
  }, []);
  
  return (
    <View>
      <Text>{countdownTime.min} : {countdownTime.sec}</Text>
    </View>
  );
}
