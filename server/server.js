const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const mysql = require('mysql2')
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'share'
})


app.use(express.json())
app.use(cors())


io.on('connection', (socket) => {

    console.log(socket.id + " Connected")

    setInterval(() => {
        db.query("SELECT * FROM combine WHERE id = 1", (err, rs) => {
            if (err) throw err

            db.query("SELECT * FROM log ORDER BY id DESC LIMIT 5", (err, rs2) => {
                if (err) throw err

                socket.emit("all_money", rs)
                socket.emit("all_log", rs2)
            })
        })
    }, 2000)

    socket.on("message_deposit", (user) => {
        socket.broadcast.emit("message_deposit_rec", user)
    })

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnect")
    })
})



app.get("/test", (req, res) => {
    res.json({ description: 'hello' })
})


app.post('/user', (req, res) => {
    let phone_number = req.body.phone_number

    db.query("SELECT * FROM users WHERE phone_number = ?", [phone_number], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})


app.post("/sign_in", (req, res) => {
    let phone_number = req.body.phone_number
    let password = req.body.password

    db.query("SELECT * FROM users WHERE phone_number = ? AND password = ?", [phone_number, password], (err, rs) => {
        if (err) throw err

        if (rs.length > 0) {
            res.json({ rs, invalid: false })
        } else {
            res.json({ invalid: true })
        }
    })

})

app.get("/balance", (req, res) => {
    db.query("SELECT * FROM combine WHERE id = ?", [1], (err, rs) => {
        if (err) throw err


        res.json(rs)
    })
})


app.post("/deposit", (req, res) => {

    let money = req.body.money
    let phone_number = req.body.phone_number

    let dateModel = new Date().toLocaleString('en-EN')
    let date = dateModel

    db.query("SELECT * FROM combine WHERE id = ?", [1], (err, rs) => {
        if (err) throw err

        db.query("UPDATE combine SET balance = ? WHERE id = ?", [Number(rs[0].balance) + Number(money), 1], (err, rs2) => {
            if (err) throw err

            db.query("SELECT * FROM loaner WHERE username = ?", [phone_number], (err, loaner) => {
                if (err) throw err

                let loaner_money = loaner[0].return_total - money

                if (money < loaner[0].return_total) {
                    db.query("UPDATE loaner SET return_total = ? WHERE username = ?", [loaner_money, phone_number], (err, update_loan) => {

                        if (err) throw err

                        // UpdateLog

                        db.query("INSERT INTO log (username, type, amount, date) VALUES (?, ?, ?, ?)", [phone_number, 0, money, date], (err, rs3) => {
                            if (err) throw err

                            res.json({ deposit_success: true })
                        })
                    })
                } else {
                    db.query("UPDATE loaner SET total = ?, return_total = ? WHERE username = ?", [0, 0, phone_number], (err, update_loan2) => {
                        if (err) throw err

                        // UpdateLog


                        db.query("INSERT INTO log (username, type, amount, date) VALUES (?, ?, ?, ?)", [phone_number, 0, money, date], (err, rs3) => {
                            if (err) throw err

                            res.json({ deposit_success: true })
                        })
                    })
                }

            })

        })
    })

})

app.post('/withdraw', (req, res) => {
    let money = req.body.money
    let phone_number = req.body.phone_number

    let dateModel = new Date().toLocaleString('en-EN')
    let date = dateModel

    db.query("SELECT * FROM combine WHERE id = ?", [1], (err, rs) => {
        if (err) throw err

        if (rs[0].balance < money) {
            res.json({ balance_less: true })
        } else {
            db.query("UPDATE combine SET balance = ? WHERE id = ?", [rs[0].balance - Number(money), 1], (err, rs2) => {
                if (err) throw err

                db.query("SELECT * FROM loaner WHERE username = ?", [phone_number], (err, rs4) => {
                    if (err) throw err

                    if (rs4.length <= 0) {
                        db.query("INSERT INTO loaner (username, total, return_total) VALUES (?, ?, ?)", [phone_number, money, ((money * 6) / 100)], (err, rs) => {
                            if (err) throw err
                            

                            db.query("INSERT INTO log (username, type, amount, date) VALUES (? ,? ,?, ?)", [phone_number, 1, money, date], (err, rs3) => {

                                if (err) throw err

                                res.json({ balance_less: false })
                            })
                        })
                    } else {

                        let new_total = Number(rs4[0].total) + Number(money)

                        let new_return_total = new_total + ((new_total * 6) / 100)


                        db.query("UPDATE loaner SET total = ?, return_total = ? WHERE username = ?", [new_total, new_return_total, phone_number], (err, rs) => {
                            if (err) throw err

                            db.query("INSERT INTO log (username, type, amount, date) VALUES (? ,? ,?, ?)", [phone_number, 1, money, date], (err, rs3) => {

                                if (err) throw err

                                res.json({ balance_less: false })
                            })
                        })
                    }

                })
            })
        }
    })
})

app.get("/log", (req, res) => {
    db.query("SELECT * FROM log", (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})

app.post("/loaner", (req, res) => {

    let phone_number = req.body.phone_number

    db.query("SELECT * FROM loaner WHERE username = ?", [phone_number], (err, rs) => {
        if (err) throw err

        res.json(rs)
    })
})



app.post('/register', (req, res) => {

    let phone_number = req.body.phone_number
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let password = req.body.password

    db.query("SELECT * FROM users WHERE phone_number = ?", [phone_number], (err, rs) => {
        if (err) throw err

        if (rs.length > 0) {
            res.json({ already_id: true })
        } else {
            db.query("INSERT INTO users (first_name, last_name, phone_number, password) VALUES (?, ?, ?, ?)", [first_name, last_name, phone_number, password], (err, userInsert) => {
                if (err) throw err

                db.query("INSERT INTO loaner (username, total, return_total) VALUES (?, ?, ?)", [phone_number, 0, 0], (err, laonerInsert) => {
                    if (err) throw err

                    res.json({ already_id: false })
                })
            })
        }
    })
})


http.listen(3001, () => {
    console.log("Server is running on port 3001")
})