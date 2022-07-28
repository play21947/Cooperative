import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Load, LoginAction } from './actions/AuthenticationActions'



const SignIn = ({ navigation }) => {

    let [phone_number, setPhone_number] = useState('')
    let [password, setPassword] = useState('')


    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(Load())
    })

    return (
        <View style={{ padding: 20, flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Kanit-Regular', color: 'black', fontSize: 23 }}>สหกรณ์ออมทรัพย์</Text>
            <Text style={{ fontFamily: 'Kanit-Regular', color: 'gray', marginBottom: 20 }}>created by Rattanon Boonmata</Text>
            <TextInput keyboardType='number-pad' onChangeText={(text) => {
                setPhone_number(text)
            }} style={{ fontFamily: 'Kanit-Regular', borderWidth: 1, borderColor: 'gray', borderRadius: 4, fontSize: 15, color: 'black' }} placeholder='0987654321' placeholderTextColor={'gray'}></TextInput>
            <TextInput style={{ borderColor: 'gray', borderWidth: 1, marginTop: 10, borderRadius: 4, marginBottom: 10, fontSize: 15, color: 'black' }} secureTextEntry={true} onChangeText={(text) => {
                setPassword(text)
            }} placeholder='******' placeholderTextColor={'gray'}></TextInput>
            <TouchableOpacity style={{ backgroundColor: 'lightblue', height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => {
                if (phone_number && password) {
                    dispatch(LoginAction(phone_number, password))
                } else {
                    Alert.alert("โปรดใส่เบอร์โทรศัพท์เเละรหัสผ่าน")
                }
            }}><Text style={{ fontSize: 23, fontFamily: 'Kanit-Regular', color: 'white' }}>เข้าสู่ระบบ</Text></TouchableOpacity>

            <View style={{ display: 'flex', flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                <Text style={{ fontFamily: 'Kanit-Regular', color: 'black', fontSize: 16 }}>ยังไม่มีบัญชี?</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("SIGN_UP")
                }}>
                    <Text style={{ fontFamily: 'Kanit-Regular', color: 'lightblue', marginLeft: 10, fontSize: 16 }}>สมัครสมาชิก</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignIn