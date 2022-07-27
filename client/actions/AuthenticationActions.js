import axios from "axios"
import { Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const LoginAction=(phone_number, password)=>{
    return((dispatch)=>{

        axios.post("http://play2api.ddns.net:3001/sign_in",{
            phone_number: phone_number,
            password: password
        }).then((res)=>{
            if(res.data.invalid){
                Alert.alert("บัญชีผู้ใช้ไม่ถูกต้อง")
            }else{
                // console.log(res.data.rs)
                AsyncStorage.setItem('phone_number', phone_number)
                dispatch({
                    type: "LOGIN",
                    payload: phone_number
                })
            }
        })
    })
}

export const Load=()=>{
    return((dispatch)=>{

        AsyncStorage.getItem("phone_number", (err, phone_number)=>{

            if(phone_number){
                dispatch({
                    type: "LOAD",
                    payload: phone_number
                })
            }else{
                dispatch({
                    type: "LOAD",
                    payload: ''
                })
            }

            console.log(phone_number)
        })
    })
}

export const Logout=()=>{
    return ((dispatch)=>{

        AsyncStorage.removeItem("phone_number").then(()=>{
            dispatch({
                type: "LOGOUT"
            })
        })
    })
}