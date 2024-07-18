import { Text, View } from "react-native";
import {Timer} from "@/components/Timer"; // Import the Timer component from the appropriate module

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Timer/>
    </View>
  );
}
