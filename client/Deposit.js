import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, Animated } from 'react-native'
import { socket } from './service/socket'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Deposit = ({ navigation, route }) => {


    // let phone_number = route.params.phone_number

    // console.log(phone_number)

    let oc = useRef(new Animated.Value(0)).current;

    const GestureAll = () => {
        Animated.timing(oc, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }



    let user = useSelector((state) => {
        return state.auth.user
    })

    // console.log("User : ", user[0].name)

    let [money, setMoney] = useState(0)


    const DepositMethod = () => {
        axios.post("http://play2api.ddns.net:3001/deposit", {
            phone_number: user,
            money: money
        }).then((res) => {
            if (res.data.deposit_success) {
                Alert.alert("นำเงินเข้าสู่กองกลางสำเร็จ")
                // socket.emit("message_deposit", { user: user[0].first_name })
                navigation.navigate("HOME")
            }
        })
    }

    let [balance, setBalance] = useState(0)


    useEffect(() => {

        // socket.on("message_deposit_rec", (user) => {
        //     Alert.alert(user.user + "ได้ทำการฝากเงินเข้ากองกลาง")
        // })

        GestureAll()


        axios.get("http://play2api.ddns.net:3001/balance").then((res) => {
            // console.log(res.data)
            setBalance(res.data[0].balance)
        })
    }, [])

    return (
        <Animated.View style={[{ flex: 1, display: 'flex', justifyContent: 'center', padding: 10, opacity: oc}]}>
            <Text style={{ fontSize: 25, color: 'black', fontFamily: 'Kanit-Medium' }}>Deposit</Text>
            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'gray' }}>เงินที่ฝากจะเข้ากองกลาง</Text>
            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 15, color: 'green', marginBottom: 30 }}>ขั้นต่ำ 100 บาท</Text>
            {money <= 0 ? null : <Text style={{ fontFamily: 'Kanit-Regular', color: 'green', marginBottom: 10 }}>{balance} => {balance + Number(money)}</Text>}
            <TextInput onChangeText={(text) => {
                setMoney(text)
            }} style={{ fontFamily: 'Kanit-Regular', backgroundColor: '#cbd5e1', width: '100%', height: 70, borderRadius: 5, textAlign: 'center', fontSize: 20 }} placeholder='100 ฿'></TextInput>
            <TouchableOpacity onPress={() => {
                if (money == null || !money) {
                    Alert.alert("โปรดระบุจำนวนเงิน")
                } else {
                    if (money >= 100) {
                        DepositMethod()
                    } else {
                        Alert.alert("โปรดใส่เงินให้มากกว่า 100 บาท")
                    }
                }
            }} style={{ backgroundColor: 'lightblue', width: 200, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6, alignSelf: 'center', marginTop: 10 }}><Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>ฝากเงิน</Text></TouchableOpacity>
        </Animated.View>
    )
}


export default Deposit