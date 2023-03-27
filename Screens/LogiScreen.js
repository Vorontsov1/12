import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const initialUserState = { email: "", password: "" };

export default function LoginScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [inputOnFocus, setInputOnFocus] = useState('');
  const [user, setUser] = useState(initialUserState);

  const [fontsLoaded] = useFonts({
    Roboto_500Medium: require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
    Roboto_100Thin: require("./assets/Fonts/Roboto/Roboto-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const intutOnFocuseHendle = (inputName) => {
    setIsShowKeyBoard(true);
    setInputOnFocus(inputName);
  };

  const onSubmit=() => {
    console.log(user)
    setUser(initialUserState);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.backgroundIMG}
          source={require("./assets/images/bcg-ing.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formWrap,
                marginBottom: isShowKeyBoard ? -210 : 16,
              }}
            >
              <View style={styles.form}>
                <Text style={styles.text}>Войти</Text>
                <TextInput
                  value={user.email}
                  style={{...styles.input, borderColor: (inputOnFocus === 'email') ? "#FF6C00" : '#E8E8E8'}}
                  textAlign={"center"}
                  placeholder={"Адрес электронной почты"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    intutOnFocuseHendle('email');
                  }}
                  onChangeText={(value) => setUser((prevState) =>({...prevState, email: value}))}
                />
                <TextInput
                  value={user.password}
                  style={{...styles.input, borderColor: (inputOnFocus === 'password') ? "#FF6C00" : '#E8E8E8'}}
                  textAlign={"center"}
                  secureTextEntry={true}
                  placeholder={"Пароль"}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => {
                    intutOnFocuseHendle('password');
                  }}
                  onChangeText={(value) => setUser((prevState) =>({...prevState, password: value}))}
                />
                <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onSubmit}>
                  <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
            </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    textAlign: "left",
    paddingHorizontal: 16,
    height: 50,
    marginTop: 16,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 32,
    marginTop: 43,
  },
  btnText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    marginVertical: 16,
    color: "#fff",
    textAlign: "center",
  },
  link: {
    textAlign: "center",
    color: "#1B4371",
    marginBottom: 110,
  },
});
