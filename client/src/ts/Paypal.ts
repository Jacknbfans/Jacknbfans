import axios from 'axios';
 
// 定义PayPal支付参数的接口
interface PayPalPaymentParams {
  intent: 'sale' | 'authorize';
  payer: {
    payment_method: 'paypal';
  };
  transactions: [{
    amount: {
      total: string;
      currency: string;
    };
    description: string;
  }];
  redirect_urls: {
    return_url: string;
    cancel_url: string;
  };
}
 
// 创建支付的函数
async function createPayment(params: PayPalPaymentParams): Promise<string> {
  try {
    const response = await axios.post('https://api.paypal.com/v1/payments/payment', params, {
      headers: {
        'Authorization': `Bearer YOUR_CLIENT_ID`,
        'Content-Type': 'application/json'
      }
    });
 
    // 返回创建的支付ID
    return response.data.id;
  } catch (error) {
    // 处理错误
    console.error('Error creating PayPal payment:', error);
    throw error;
  }
}
 
// 使用示例
const paymentParams: PayPalPaymentParams = {
  intent: 'sale',
  payer: {
    payment_method: 'paypal'
  },
  transactions: [{
    amount: {
      total: '10.00',
      currency: 'USD'
    },
    description: 'Your Order Description'
  }],
  redirect_urls: {
    return_url: 'https://your-website.com/success',
    cancel_url: 'https://your-website.com/cancel'
  }
};
 
createPayment(paymentParams).then(paymentId => {
  console.log('Payment created:', paymentId);
}).catch(error => {
  console.error('Error creating payment:', error);
});