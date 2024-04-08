var express = require('express');
var app = express();
const paypal = require('paypal-rest-sdk');
 
// 配置PayPal客户端
paypal.configure({
    mode: 'sandbox', // 或者 'live' 用于生产环境
    client_id: '你的ClientID',
    client_secret: '你的ClientSecret'
});
 
// 创建支付
app.post('/create-payment', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/process-payment",
            "cancel_url": "http://localhost:3000/cancel-payment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "001",
                    "price": "5.00",
                    "currency": "USD",
                    "quantity": "1"
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "5.00"
            },
            "description": "这是一个支付描述。"
        }]
    };
 
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});
 
// 处理支付
app.get('/process-payment', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
 
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "5.00"
            }
        }]
    };
 
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.send(error);
        } else {
            res.send(payment);
        }
    });
});
 
// 取消支付
app.get('/cancel-payment', (req, res) => {
    res.send('支付已取消');
});