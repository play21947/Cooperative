import axios from 'axios'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { LoginAction } from './actions/AuthenticationActions'
import { useDispatch } from 'react-redux'

const SignUp = ({ navigation }) => {

    let dispatch = useDispatch()

    let [phone_number, setPhoneNumber] = useState('')
    let [password, setPassword] = useState('')
    let [first_name, setFirstName] = useState('')
    let [last_name, setLastName] = useState('')


    const RegisterMethod = (phone, password, first_name, last_name) => {
        if (!phone || !password || !first_name || !last_name) {
            Alert.alert("โปรดใส่ข้อมูลให้ครบถ้วน")
        } else {
            axios.post("http://play2api.ddns.net:3001/register", {
                phone_number: phone_number,
                password: password,
                first_name: first_name,
                last_name: last_name
            }).then((res) => {
                if (!res.data.already_id) {
                    Alert.alert("สมัครบัญชีสำเร็จ")
                    setTimeout(() => {
                        dispatch(LoginAction(phone_number, password))
                    }, 1200)
                } else {
                    Alert.alert("เบอร์โทรนี้ได้ใช้ไปเเล้ว")
                }
            })
        }
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', padding: 20, flex: 1 }}>
            <Text style={{ fontSize: 22, fontFamily: "Kanit-Regular", color: 'black' }}>สมัครสมาชิก</Text>
            <Text style={{ color: 'gray', fontFamily: "Kanit-Regular", marginBottom: 10 }}>Content</Text>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontFamily: 'Kanit-Regular' }}>เบอร์โทรศัพท์</Text>
                <TextInput onChangeText={(text) => {
                    setPhoneNumber(text)
                }} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4 }}></TextInput>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'gray', fontFamily: 'Kanit-Regular' }}>รหัสผ่าน</Text>
                <TextInput onChangeText={(text) => {
                    setPassword(text)
                }} secureTextEntry={true} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4 }}></TextInput>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 }}>

                <View style={{ width: '46%' }}>
                    <Text style={{ fontFamily: "Kanit-Regular", color: 'gray' }}>ชื่อ</Text>
                    <TextInput onChangeText={(text) => {
                        setFirstName(text)
                    }} style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray', width: '100%' }}></TextInput>
                </View>

                <View style={{ width: '46%' }}>
                    <Text style={{ fontFamily: "Kanit-Regular", color: 'gray' }}>นามสกุล</Text>
                    <TextInput onChangeText={(text) => {
                        setLastName(text)
                    }} style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray', width: '100%' }}></TextInput>
                </View>
            </View>

            <TouchableOpacity onPress={() => {
                RegisterMethod(phone_number, password, first_name, last_name)
            }} style={{ backgroundColor: 'lightblue', padding: 13, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>สมัครสมาชิก</Text>
            </TouchableOpacity>


            <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 10, zIndex: -1 }}>
                <Text style={{ fontFamily: 'Kanit-Regular', color: 'black', fontSize: 16 }}>มีบัญชีเเล้ว?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("SIGN_IN")
                }}>
                    <Text style={{ marginLeft: 10, fontFamily: 'Kanit-Regular', color: 'lightblue', fontSize: 16 }}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignUp