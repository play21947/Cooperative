import React, { useEffect, useState, useRef } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert, Animated } from 'react-native'
import axios from 'axios'


const Withdraw = ({ navigation, route }) => {

    let phone_number = route.params.phone_number

    let opc = useRef(new Animated.Value(0)).current;

    const Gesture=()=>{
        Animated.timing(opc, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    let [money, setMoney] = useState(0)

    let [balance, setBalance] = useState(0)

    let interest = 6

    let interest_per_month = ((money * 6) / 100) / 12

    let interest_per_year = interest_per_month * 12

    let should_return = Number(money) + interest_per_year


    useEffect(() => {


        Gesture()

        axios.get("http://play2api.ddns.net:3001/balance").then((res) => {
            console.log(res.data)
            setBalance(res.data[0].balance)
        })
    }, [])

    return (
        <Animated.View style={[{ flex: 1, display: 'flex', justifyContent: 'center', padding: 10, opacity: opc}]}>
            <Text style={{ fontSize: 25, color: 'black', fontFamily: 'Kanit-Medium' }}>Loan</Text>
            <Text style={{ marginBottom: 20, fontFamily: 'Kanit-Regular', color: 'gray' }}>การกู้ยืมเงินจะเสียอัตราดอกเบี้ยร้อยละ 6</Text>
            <View style={{marginBottom: 10}}>
                <Text style={{fontFamily: 'Kanit-Medium', color: 'black', fontSize: 20, marginBottom: 10}}>Balance : {balance} ฿</Text>
                <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>ดอกเบี้ยต่อเดือน : {interest_per_month.toFixed(2)} บาท</Text>
                <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>ดอกเบี้ยต่อปี : {interest_per_year.toFixed(2)} บาท</Text>
                <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>ดอกเบี้ยต่อปี + เงินต้น : {should_return.toFixed(2)} บาท</Text>
                <Text style={{fontFamily: 'Kanit-Regular', color: 'black'}}>ควรผ่อนเดือนละ : {(should_return / 12).toFixed(2)} บาท</Text>
                <Text style={{fontFamily: 'Kanit-Medium', color: 'black', fontSize: 20, marginTop: 10}}>เงินที่ต้องคืนทั้งสิ้น : {should_return.toFixed(2)} บาท</Text>
            </View>
            {money <= 0 ? null : balance < money ? <Text style={{fontFamily: 'Kanit-Regular', color: 'firebrick'}}>ไม่สามารถกู้เงินได้</Text> : <Text style={{fontFamily: 'Kanit-Regular', color: 'green'}}>สามารถกู้เงินได้</Text>}
            <TextInput onChangeText={(text) => {
                setMoney(text)
            }} style={{ fontFamily: 'Kanit-Regular', backgroundColor: '#cbd5e1', width: '100%', height: 70, borderRadius: 5, textAlign: 'center', fontSize: 20 }} placeholder='100 ฿'></TextInput>
            <TouchableOpacity onPress={() => {
                if(should_return == NaN || should_return == null || !should_return){
                    Alert.alert("โปรดระบุจำนวนเงิน")
                }else{
                    if (balance < money) {
                        Alert.alert("เงินกองกลางมีไม่พอ")
                    }else{
                        if(money < 100){
                            Alert.alert("เงินต้องมากกว่า 100 บาท")
                        }else{
                            Alert.alert('ต้องการกู้เงิน?','',[{text: 'แน่ใจว่าจะกู้', onPress:()=>{
                                axios.post('http://play2api.ddns.net:3001/withdraw', {
                                    phone_number: phone_number,
                                    money: money
                                }).then((res) => {
                                    if (!res.data.balance_less) {
                                        Alert.alert("กู้เงินสำเร็จ")
                                        navigation.navigate("HOME")
                                    } else {
                                        Alert.alert("เงินกองกลางมีไม่พอ")
                                    }
                                })
                            }}, {text: 'ยกเลิก', onPress:()=>{
                                console.log("cancel")
                            }}])
                        }
                    }
                }
            }} style={{ backgroundColor: 'lightblue', width: 200, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6, alignSelf: 'center', marginTop: 10 }}><Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>กู้ยืมเงิน</Text></TouchableOpacity>
        </Animated.View>
    )
}

export default Withdraw