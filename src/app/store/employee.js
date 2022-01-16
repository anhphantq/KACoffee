const order_model = require("../../models/order_model")
const employee_model = require("../../models/employees_model")
const user_model = require("../../models/users_model")

// xem tất cả đơn hàng trong cửa hàng
// nhân viên chỉ xem đơn của mình
// admin xem tất cả đơn
async function viewOrder(req,res){
    try{
        if(req.session.AccountType == "Employee" || req.session.AccountType == "Admin"){
            const idAccount = req.session.idAccount
            const employee = await employee_model.findById(idAccount)
            if(employee == null)
                res.send(JSON.stringify("Employee not exist!"))

            const storeID = employee.storeID
            let orders
            if(req.session.AccountType == "Admin")
                orders = await order_model.find({storeID: storeID}).populate({path: "products.info"}).populate("user")
            else
                orders = await order_model.find({storeID: storeID, employee: idAccount}).populate({path: "products.info"}).populate("user")
            res.json(orders)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        res.json(err)
    }
}

// xem đơn đang ở trạng thái verifying
async function viewPendingOrder(req,res){
    try{
        if(req.session.AccountType == "Employee" || req.session.AccountType == "Admin"){
            const idAccount = req.session.idAccount
            const employee = await employee_model.findById(idAccount)
            if(employee == null)
                res.send(JSON.stringify("Employee not exist!"))

            const storeID = employee.storeID
            const orders = await order_model.find({storeID: storeID, status: "Verifying"}).populate({path: "products.info"}).populate("user")
            res.json(orders)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        res.json(err)
    }
}

// xem tất cả đơn hàng chờ xác nhận trong cửa hàng
async function viewFilterOrder(req,res){
    try{
        if(req.session.AccountType == "Employee" || req.session.AccountType == "Admin"){
            const { status_order } = req.body
            const idAccount = req.session.idAccount
            const employee = await employee_model.findById(idAccount)
            if(employee == null)
                res.send(JSON.stringify("Employee not exist!"))
            const storeID = employee.storeID

            let orders
            if(req.session.AccountType == "Admin")
                orders = await order_model.find({storeID: storeID, status: status_order}).populate({path: "products.info"}).populate("user")
            else
                orders = await order_model.find({storeID: storeID, status: status_order, employee: idAccount}).populate({path: "products.info"}).populate("user")
            
                res.json(orders)
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        res.json(err)
    }
}

async function changeStatus(req,res){
    try{
        if(req.session.AccountType == "Employee"){
            const { id_order, status_order } = req.body
            const idAccount = req.session.idAccount

            const order = await order_model.findById(id_order)
            if(order.status == "Verifying"){
                order.employee = idAccount
            }
            order.status = status_order
            order.save()
            res.json(order)
        }
        else res.send(JSON.stringify("Only employee / admin can access!"))
    }
    catch(err){
        res.json(err)
    }
}

async function get_5t1_voucher(req,res){
    try{
        if(req.session.AccountType == "Employee"){
            const { phone } = req.body
            const user = await user_model.findOne({ phone: phone })
            if(user == null){
                return res.send(JSON.stringify("Number phone is not exist!"))
            }
            const remainder = user.NbItem - user.NumExchangeItem
            if(remainder < 5){
                return res.send(JSON.stringify("Customer has less than 5 item to exchange!"))
            }
            else{
                user.NumExchangeItem += 5
                await user.save()
                return res.send(JSON.stringify("Get 5t1 voucher successfully!"))
            }
        }
        else res.send(JSON.stringify("Only employee can access!"))
    }
    catch(err){
        res.json(err)
    }
}

module.exports = (app) =>{
    app.get("/store/view_order", (req,res) =>{
        viewOrder(req,res)
    })
    app.get("/store/view_pending_order", (req,res) =>{
        viewPendingOrder(req,res)
    })
    app.post("/store/view_order", (req,res) =>{
        viewFilterOrder(req,res)
    })
    app.put("/store/status_order", (req,res) =>{
        changeStatus(req,res)
    })
    app.post("/voucher/get_5t1_voucher", (req,res) =>{
        get_5t1_voucher(req,res)
    })
    // app.post("/store/create_order", (req,res) =>{
    //     createOrder(req,res)
    // })
}
