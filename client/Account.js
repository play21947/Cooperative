import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { Logout } from './actions/AuthenticationActions'
import { useDispatch } from 'react-redux'
import { socket } from './service/socket'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Account = ({ navigation }) => {


    let dispatch = useDispatch()

    // let phone_number = route.params.phone_number

    let [loaner, setLoaner] = useState([])
    let [user, setUser] = useState([])


    const GetLoaner = (phone_number) => {
        return new Promise((resolve, reject) => {
            axios.post('http://play2api.ddns.net:3001/loaner', {
                phone_number: phone_number
            }).then((res) => {
                resolve(res.data)
            })
        })
    }


    const GetNameLoaner = (phone_number) => {
        return new Promise((resolve, reject) => {
            axios.post("http://play2api.ddns.net:3001/user", {
                phone_number: phone_number
            }).then((res) => {
                resolve(res.data)
            })
        })
    }


    const GetAllApi = async () => {
        let phone = await AsyncStorage.getItem("phone_number")
        let loanerResult = await GetLoaner(phone)
        let NameLoaner = await GetNameLoaner(loanerResult[0].username)


        setLoaner(loanerResult)
        setUser(NameLoaner)


    }

    useEffect(() => {
        GetAllApi()
    }, [])


    return (
        <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}>

            <View style={{ backgroundColor: 'lightblue', width: 200, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22, color: 'white' }}>บัญชี</Text>
            </View>


            <View style={{ marginTop: 20, width: '100%', padding: 20 }}>
                {loaner.length > 0 && user.length > 0 ?
                    <View>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22, color: 'black', marginBottom: 20 }}>คุณ  {user[0].first_name} {user[0].last_name}</Text>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'black' }}>เงินที่กู้ : {loaner[0].total} บาท</Text>
                        <Text style={{ fontFamily: 'Kanit-Regular', color: 'gray', marginLeft: 90, marginBottom: 10 }}>ดอกเบี้ย 6% ต่อปี</Text>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'black' }}>ดอกเบี้ยเดือนละ : {((loaner[0].total * 6) / 100) / 12} บาท</Text>
                        <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: 'black' }}>ดอกเบี้ยต่อปี : {((loaner[0].total * 6) / 100)} บาท</Text>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View>
                                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22, color: 'green', marginTop: 10 }}>เงินที่ต้องคืน : {loaner[0].return_total} บาท</Text>
                                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 16, color: 'gray' }}>ควรจ่ายเดือนละ : {(loaner[0].return_total / 12).toFixed(2)} บาท</Text>
                            </View>
                            {(loaner[0].return_total / 12).toFixed(2) > 0 ? <TouchableOpacity onPress={()=>{
                                navigation.navigate("DEPOSIT")
                            }}><Text style={{ fontFamily: 'Kanit-Regular', color: 'green' }}>เริ่มฝากเงิน</Text></TouchableOpacity> : null}
                        </View>

                    </View> : <Text>กำลังโหลดข้อมูล...</Text>}
            </View>

            <TouchableOpacity onPress={() => {
                Alert.alert("ต้องการออกจากระบบ?", "", [{
                    text: "ออกจากระบบ", onPress: () => {
                        dispatch(Logout())
                        socket.disconnect()
                    }
                }, {
                    text: "ยกเลิก", onPress: () => {
                        console.log("cancel")
                    }
                }])
            }} style={{ backgroundColor: 'firebrick', borderRadius: 8, width: 200, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22, color: 'white' }}>ออกจากระบบ</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Account