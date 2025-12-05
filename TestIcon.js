import React from "react";
import { Image, View } from "react-native";

export default function TestIcon() {
  return (
    <View>
      <Image
        source={require("./assets/images/icon.png")} // path relative to TestIcon.js
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}
