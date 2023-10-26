import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
} from "react-native";
import React, { useCallback } from "react";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import { useContext } from "react";
import { useEffect } from "react";




const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    
    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.5:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };
      //refresh the addresses when the component comes to the focus ie basically when we navigate back
      useFocusEffect(
        useCallback(() => {
          fetchAddresses();
        }, [])
      );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
            <View
                style={{
                    backgroundColor: "#00CED1",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 7,
                        gap: 10,
                        backgroundColor: "white",
                        borderRadius: 3,
                        height: 38,
                        flex: 1,
                    }}
                >
                    <AntDesign
                        style={{ paddingLeft: 10 }}
                        name="search1"
                        size={22}
                        color="black"
                    />
                    <TextInput placeholder="Search Amazon.in" />
                </Pressable>

                <Feather name="mic" size={24} color="black" />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Địa chỉ của bạn</Text>

                <Pressable
                    onPress={() => navigation.navigate("Add")}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}
                >
                    <Text>Thêm địa chỉ mới</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>
                <Pressable>
                    {addresses?.map((item, index) => (
                        <Pressable style={{
                            borderWidth: 1,
                            borderColor: "#D0D0D0",
                            padding: 10,
                            flexDirection: "column",
                            gap: 5,
                            marginVertical: 10,
                        }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    {item?.name}</Text>
                                <Entypo name="location-pin" size={24} color="red" />
                            </View>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.city}
                            </Text>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.district}
                            </Text>
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                {item?.wards}
                            </Text>
                            
                            <Text style={{ fontSize: 15, color: "#181818" }}>
                                SDT : {item?.mobileNo}
                            </Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                marginTop: 7,
                            }}>
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Edit</Text>

                                </Pressable>
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Remove</Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        backgroundColor: "#F5F5F5",
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 5,
                                        borderWidth: 0.9,
                                        borderColor: "#D0D0D0",
                                    }}
                                >
                                    <Text>Set as Default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
