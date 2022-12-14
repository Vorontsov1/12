import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium: require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        style={styles.backgroundIMG}
        source={require("./assets/images/bcg-ing.jpg")}
      >
        <View style={styles.formWrap}>
          <View style={styles.form}>
            <Text style={styles.text}>My first mobile App!</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundIMG: {
    flex: 1,
    resizeMode: "cover",
    ...Platform.select({
      ios: {
        justifyContent: "center",
      },
      android: {
        justifyContent: "flex-end",
      },
    }),
  },
  formWrap: {
    position: "absolute",
    left: 0,
    bottom: -40,
    paddingBottom: 40,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  form: {
    margin: 16,
  },
  text: {
    marginVertical: 16,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    textAlign: "center",
  },
});
