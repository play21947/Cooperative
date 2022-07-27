import React, { useEffect, useState, useRef } from 'react'
import { Text, TouchableOpacity, View, Animated, Button, Alert, ScrollView } from 'react-native'
import { socket } from './service/socket'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Logout } from './actions/AuthenticationActions'
import { useDispatch } from 'react-redux'


const Home = ({ navigation }) => {

    let dispatch = useDispatch()

    let right = useRef(new Animated.Value(0)).current;

    let left = useRef(new Animated.Value(0)).current;

    let op = useRef(new Animated.Value(0)).current;

    let big_anim = useRef(new Animated.Value(0)).current;

    let top = useRef(new Animated.Value(0)).current;


    const Split = () => {
        Animated.spring(right, {
            toValue: 40,
            duration: 100,
            useNativeDriver: true
        }).start()

        Animated.spring(left, {
            toValue: -40,
            duration: 100,
            useNativeDriver: true
        }).start()

        Animated.spring(op, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(big_anim, {
            toValue: 50,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(top, {
            toValue: -90,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    const combine = () => {
        Animated.spring(right, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(left, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(op, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(big_anim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()

        Animated.spring(top, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    }





    let [status, setStatus] = useState(false)

    let [balance, setBalance] = useState(null)

    let [user, setUser] = useState([])

    let [log, setLog] = useState([])

    let phone_number = useSelector((state) => {
        return state.auth.user
    })

    // console.log(balance)


    const ApiUser = () => {
        return new Promise((resolve, reject) => {
            axios.post('http://play2api.ddns.net:3001/user', {
                phone_number: phone_number
            }).then((res) => {
                resolve(setUser(res.data))
            })
        })
    }


    const ApiLog = () => {
        return new Promise((resolve, reject) => {
            // axios.get("http://play2api.ddns.net:3001/log").then((res) => {
            //     resolve(setLog(res.data))
            // })

            socket.on('all_log', (all_log) => {
                resolve(setLog(all_log))
            })
        })
    }

    const AllApi = async () => {
        await ApiUser()
        await ApiLog()
    }

    useEffect(() => {

        socket.on("all_money", (money) => {
            setBalance(money[0].balance)
        })

        socket.on("message_deposit_rec", (user) => {
            console.log(user)
            Alert.alert(user.user + "ได้ทำการฝากเงินเข้ากองกลาง")
        })

        AllApi()

    }, [])

    return (

        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ backgroundColor: 'lightblue', width: 200, height: 70, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>Balance</Text>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 15, color: 'white' }}>{user && user.length > 0 ? user[0].first_name : null}</Text>
            </View>

            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>


                <Animated.View style={{ display: 'flex', flexDirection: 'row' }}>


                    <TouchableOpacity onPress={() => {
                        navigation.navigate("DEPOSIT", { phone_number: phone_number })
                        combine()
                        setStatus(false)
                    }} style={[{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: left }, { scale: op }, {translateY: -50}] }]}>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>ฝากเงิน</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        navigation.navigate("ACCOUNT", { phone_number: phone_number })
                        combine()
                        setStatus(false)
                    }} style={[{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: [{ translateY: top }, { scale: op }, {translateX: -3}] }]}>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>บัญชี</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        navigation.navigate("WITHDRAW", { phone_number: phone_number })
                        combine()
                        setStatus(false)
                    }} style={[{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: [{ translateX: right }, { scale: op }, {translateY: -50}] }]}>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'white' }}>ยืมเงิน</Text>
                    </TouchableOpacity>

                </Animated.View>

                {/* <Text>Home</Text> */}
                <TouchableOpacity onPress={() => {
                    if (!status) {
                        Split()
                        setStatus(true)
                    } else {
                        combine()
                        setStatus(false)
                    }
                    // setStatus(!status)
                }} style={[{ backgroundColor: 'lightblue', borderRadius: 200, width: 200, height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 120, transform: [{ translateY: big_anim }] }]}>
                    <Text style={{ fontSize: 25, color: 'white', fontFamily: 'Kanit-Regular' }}>{balance ? `${balance} ฿` : "กำลังโหลดข้อมูล...."}</Text>
                </TouchableOpacity>


                <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20, position: 'absolute', bottom: 0, backgroundColor: '#1a1a1a', padding: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    {log && log.length > 0 ? log.map((item, index) => {

                        let db_date = new Date(item.date)
                        let real_date = new Date()

                        let timeStamp = real_date.getTime() - db_date.getTime() // millsec
                        let sec = timeStamp / 1000
                        let min = sec / 60
                        let hrs = min / 60
                        let day = hrs / 24

                        // console.log(item.amount, hrs)
                        // console.log(hrs)

                        return (
                            <View key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontFamily: 'Kanit-Regular', color: item.type == 0 ? 'green' : 'firebrick', fontSize: 16 }}>{item.username}</Text>
                                    <Text style={{ fontFamily: 'Kanit-Regular', color: item.type == 0 ? 'green' : 'firebrick', fontSize: 16 }}>{item.type == 0 ? "ฝาก" : "กู้"}</Text>
                                    <Text style={{ fontFamily: 'Kanit-Regular', color: item.type == 0 ? 'green' : 'firebrick', fontSize: 16 }}>{item.amount}</Text>
                                    <Text style={{fontFamily: 'Kanit-Regular', color: item.type == 0 ? 'green' : 'firebrick', fontSize: 16}}>{day >= 1 ? `ผ่านมาเเล้ว ${parseInt(Math.trunc(day * 100) / 100)} วัน` : hrs >= 1 ? `ผ่านมาเเล้ว ${parseInt(Math.trunc(hrs * 100) / 100)} ชั่วโมง` : min >= 1 ? `ผ่านมาเเล้ว ${parseInt(Math.trunc(min * 100) / 100)} นาที` : `เมื่อสักครู่`}</Text>
                                </View>
                            </View>
                        )
                    }) : <Text style={{fontFamily: 'Kanit-Regular', color: 'white'}}>กำลังโหลดข้อมูล....</Text>}

                </View>


            </View>
        </View>
    )
}

export default Home