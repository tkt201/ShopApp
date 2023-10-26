import React, { useState,useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authToken");

  //       if (token) {
  //         navigation.replace("Main");
  //       }
  //     } catch (err) {
  //       console.log("error message", err);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.1.5:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Lỗi đăng nhập", "Email không hợp lệ");
        console.log(error);
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center", }}
    >
      <View>
        <Image
          style={{ width: 120, height: 120 ,marginTop:120} }
          source={{
            uri: "https://th.bing.com/th/id/R.33679420f4d434339e77c1995a32d01f?rik=9Vmj%2f6F0LIorYA&pid=ImgRaw&r=0",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: "bold",
              marginTop: 43,
              color: "#041E42",
            }}
          >
            Đăng nhập tài khoản 
          </Text>
        </View>

        <View style={{ marginTop: 35 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Nhập Email của bạn"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Nhập mật khẩu của bạn"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          

          <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            
          </Text>
        </View>

        <View style={{ marginTop: 28 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </Pressable>

        <Pressable
          
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16, padding :40 }}onPress= {()=> navigation.navigate("Register")}>
            
          Bạn chưa có tài khoản? Đăng ký
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default LoginScreen;
const styles = StyleSheet.create({});
