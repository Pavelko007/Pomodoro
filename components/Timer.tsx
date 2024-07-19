import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export function Timer() {
  const isBreakInit = false;
  const workDuration = { min: 25, sec: 0 };
  const breakDuration = { min: 5, sec: 0 };
  const isRunningInit = false;

  const [countdownTime, setCountdownTime] = useState({ min: 0, sec: 0 });
  const [isRunning, setIsRunning] = useState(isRunningInit);
  const [isBreak, setIsBreak] = useState(isBreakInit);

  function setDuration() {
    setCountdownTime(isBreak ? breakDuration : workDuration);
  }
  //reset timer when switching between work and break
  useEffect(() => {
    setDuration();
  }, [isBreak]);

  //update timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setCountdownTime((prev) => {
          if (prev.min === 0 && prev.sec === 0) {
            clearInterval(interval);
            toggleIsBreak();
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

  const handleSwipeDown = () => {
    setIsRunning(false);
    setDuration();
  };
  const handleSwipeLeftRight = () => {
    toggleIsBreak();
    setIsRunning(true);
  };

  const [allowPress, setAllowPress] = useState(true);
  const handlePan = Gesture.Pan()
    .onStart(() => setAllowPress(false))
    .onEnd((event: any) => {
      if (
        Math.abs(event.translationY) > Math.abs(event.translationX) &&
        event.translationY > 0
      ) {
        handleSwipeDown();
      }
      else if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        handleSwipeLeftRight();
      }
    });

  const handlePress = () => {
    if (allowPress) {
      setIsRunning((prev) => !prev);
    }
  };

  return (
    <View>
      <GestureHandlerRootView>
        <GestureDetector gesture={handlePan}>
          <Pressable
            onPressIn={() => setAllowPress(true)}
            onPress={handlePress}
          >
            <Text>
              {countdownTime.min} : {countdownTime.sec}
            </Text>
          </Pressable>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );

  function toggleIsBreak() {
    setIsBreak((prevIsBreak) => !prevIsBreak);
  }
}
