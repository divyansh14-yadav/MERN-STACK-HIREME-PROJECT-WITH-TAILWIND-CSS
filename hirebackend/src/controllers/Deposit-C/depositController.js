import Stripe from "stripe";
import Deposit from "../../models/Deposit-M/depositSchema.js";
import Auth from "../../models/Auth-M/authModel.js";
import TaskSubcategory from "../../models/Task-M/Task-subcategory/task-subcategory-schema.js";
import MileStone from "../../models/MileStone-M/mileStoneSchema.js";
import Wallet from "../../models/Deposit-M/walletSchema.js";
import BidTask from "../../models/Bid-Task-M/bidTaskSchema.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv"
dotenv.config()


var p = process.env.p
var s = process.env.s

const stripe = new Stripe(s);


// const INR_TO_USD = 87.04;
const INR_TO_USD = 83.25;


const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});


export const addDeposit = async (req, res) => {

    try {
        const { loginAuthId, milestoneId, taskId, bidId } = req.params;

        const { depositAmountUSD, status } = req.body;


        const processChargeUSD = (depositAmountUSD * 1) / 100;
        const totalAmountUSD = depositAmountUSD + processChargeUSD;

        if (isNaN(totalAmountUSD)) {
            return res.status(400).json({ message: "Invalid total amount in USD" });
        }

        const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));



        const mile = await MileStone.findById(milestoneId);
        if (!mile) {
            return res.status(404).json({ message: "mile not found" });
        }


        const bids = await BidTask.findById(bidId)

        const mileCreatorId = mile.loginAuthId;

        const bidUserId = bids.loginAuthId



        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "MetaLance Wallet Deposit",
                        description: `IN: ₹${totalAmountINR.toLocaleString()} | US: $${totalAmountUSD}\n(1 USD = ₹${INR_TO_USD})`
                    },
                    unit_amount: Math.round(totalAmountUSD * 100),
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `https://hiremejobs.vercel.app/taskSubDetailed/${taskId}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://hiremejobs.vercel.app/cancel`,

            metadata: {
                loginAuthId,
                status,
                milestoneId,
                taskId,
                mileCreatorId: mileCreatorId.toString(),
                bidUserId: bidUserId.toString(),
                depositAmountUSD: depositAmountUSD.toString(),
                processChargeUSD: processChargeUSD.toString(),
                totalAmountUSD: totalAmountUSD.toString(),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            },
        });


        const newDeposit = new Deposit({
            loginAuthId,
            milestoneId,
            taskId,
            depositAmountUSD: depositAmountUSD,
            process_charge: processChargeUSD,
            USDTotalAmount: totalAmountUSD,
            IndianTotalAmout: totalAmountINR,
            status: "pending",
            session_id: session.id,
            mileCreatorId,
            bidUserId
        });

        await newDeposit.save();

        res.json({ success: true, url: session.url, session_id: session.id });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const manageStatus = async (req, res) => {

    try {
        const { session_id } = req.params;

        if (!session_id) {
            return res.status(400).json({ message: "Session ID is required" });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        let newStatus = "pending";

        if (session.payment_status === "paid") {
            newStatus = "success";

        } else if (session.payment_status === "canceled") {
            newStatus = "canceled";

        } else if (session.payment_status === "failed") {
            newStatus = "failed";

        } else {
            newStatus = "canceled";
        }

        const updatedDeposit = await Deposit.findOneAndUpdate(
            { stripeSessionId: session_id },
            { status: newStatus },
            { new: true }
        );

        if (!updatedDeposit) {
            return res.status(404).json({ message: "Deposit not found" });
        }

        res.json({ success: true, message: `Deposit status updated to ${newStatus}`, updatedDeposit });

    } catch (error) {

        await Deposit.findOneAndUpdate(
            { stripeSessionId: req.query.session_id },
            { status: "canceled" },
            { new: true }
        );

        res.status(500).json({ message: "Error occurred, status set to canceled" });
    }
}

// export const creataddwallet = async (req, res) => {
//     try {

//         const { loginAuthId } = req.params
//         const { amountUSD } = req.body;

//         const processChargeUSD = (amountUSD * 1) / 100;
//         const totalAmountUSD = amountUSD + processChargeUSD;
    
//      if (isNaN(totalAmountUSD)) {
//             return res.status(400).json({ message: "Invalid total amount in USD" });
//         }
    
//      const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));

//       const options = {
//         amount: Math.round(totalAmountINR * 100), 
//         currency: "USD",
//         receipt: `receipt_${Date.now()}`,
//         notes: {
//             loginAuthId,
//             amountUSD: amountUSD.toString(),
//             processChargeUSD: processChargeUSD.toString(),
//             totalAmountUSD: totalAmountUSD.toString(),
//             exchangeRate: `1 USD = ₹${INR_TO_USD}`
//         }
//     };

//     const order = await razorpay.orders.create(options);

//       const newDeposit = new Wallet({
//         loginAuthId,
//         process_charge: processChargeUSD,
//         USDTotalAmount: totalAmountUSD,
//         IndianTotalAmout: totalAmountINR,
//         razorpay_order_id: order.id,
//     });

//     await newDeposit.save();

//     res.json({
//         success: true,
//         order_id: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         key_id: "rzp_test_XaFBcDCs2pZQoe",
//     });

      
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



export const getDepositTrans = async (req, res) => {

    try {
        const { loginAuthId } = req.params

        const depositAmount = await Deposit.find({
            $or: [
                { loginAuthId: loginAuthId },
                { mileCreatorId: loginAuthId },
                { bidUserId: loginAuthId }
            ]
        }).populate({
            path: "taskId",
            select: "taskTitle"
        }).populate({
            path: "milestoneId",
            select: "mileDescription"
        }).populate({
            path: "mileCreatorId",
            select: "firstName lastName"
        }).populate({
            path: "loginAuthId",
            select: "firstName lastName"
        })

        if (depositAmount.length > 0) {
            res.status(200).json({
                message: "deposit details",
                depositAmount
            })
        }

        else {
            res.status(404).json({
                message: "not found any deposit"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }


}



// export const addDeposit = async (req, res) => {

//     try {
//         const { loginAuthId, milestoneId, taskId, bidId } = req.params;
//         const { depositAmountUSD, status } = req.body;

        // // Calculate processing charge and totals
        // const processChargeUSD = (depositAmountUSD * 1) / 100;
        // const totalAmountUSD = depositAmountUSD + processChargeUSD;

        // if (isNaN(totalAmountUSD)) {
        //     return res.status(400).json({ message: "Invalid total amount in USD" });
        // }

        // const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));

//         const mile = await MileStone.findById(milestoneId);
//         if (!mile) return res.status(404).json({ message: "Milestone not found" });

//         const bids = await BidTask.findById(bidId);
//         const mileCreatorId = mile.loginAuthId;
//         const bidUserId = bids.loginAuthId;

        // // Create Razorpay order (amount in paise)
        // const options = {
        //     amount: Math.round(totalAmountINR * 100), // amount in paise
        //     currency: "USD",
        //     receipt: `receipt_${Date.now()}`,
        //     notes: {
        //         loginAuthId,
        //         milestoneId,
        //         taskId,
        //         bidId,
        //         status,
        //         mileCreatorId: mileCreatorId.toString(),
        //         bidUserId: bidUserId.toString(),
        //         depositAmountUSD: depositAmountUSD.toString(),
        //         processChargeUSD: processChargeUSD.toString(),
        //         totalAmountUSD: totalAmountUSD.toString(),
        //         exchangeRate: `1 USD = ₹${INR_TO_USD}`
        //     }
        // };

        // const order = await razorpay.orders.create(options);

        // console.log(order);
        

        // // Save deposit record
        // const newDeposit = new Deposit({
        //     loginAuthId,
        //     milestoneId,
        //     taskId,
        //     depositAmountUSD,
        //     process_charge: processChargeUSD,
        //     USDTotalAmount: totalAmountUSD,
        //     IndianTotalAmout: totalAmountINR,
        //     status: "pending",
        //     razorpay_order_id: order.id,
        //     mileCreatorId,
        //     bidUserId
        // });

        // await newDeposit.save();

        // res.json({
        //     success: true,
        //     order_id: order.id,
        //     amount: order.amount,
        //     currency: order.currency,
        //     key_id: "rzp_test_XaFBcDCs2pZQoe", // send to frontend for checkout
        // });

//     } catch (error) {
//         console.error("Razorpay deposit error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// --------------------------------






// FOR RAZORPAY START

export const creataddwallet = async (req, res) => {
    try {
        const { loginAuthId } = req.params;
        const { amountUSD } = req.body;

        const amount = parseFloat(amountUSD);
        if (isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amountUSD" });
        }

        const processChargeUSD = (amount * 1) / 100;
        const totalAmountUSD = amount + processChargeUSD;

        const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));

        const options = {
            amount: Math.round(totalAmountINR * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                loginAuthId,
                amountUSD: amount.toFixed(2),
                processChargeUSD: processChargeUSD.toFixed(2),
                totalAmountUSD: totalAmountUSD.toFixed(2),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            }
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: "rzp_test_XaFBcDCs2pZQoe",
            details: {
                enteredAmountUSD: amount,
                totalAmountUSD: totalAmountUSD.toFixed(2),
                totalAmountINR: totalAmountINR.toFixed(2),
                processChargeUSD: processChargeUSD.toFixed(2),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const verifyRazorpayPayment = async (req, res) => {

    try {

        const {loginAuthId} = req.params
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", "3hv6ZUhPh9gIPTA4uX6jEDM8")
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        const {  amountUSD, processChargeUSD, totalAmountUSD, totalAmountINR } = req.body;

        const newDeposit = new Wallet({
            loginAuthId,
            process_charge: processChargeUSD,
            USDTotalAmount: totalAmountUSD,
            IndianTotalAmout: totalAmountINR,
            razorpay_order_id,
            razorpay_payment_id,
            amountUSD,
            status: "Paid"
        });

        await newDeposit.save();

        res.json({ success: true, message: "Payment verified and wallet updated" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// FOR RAZORPAY END



// CREATE FOR STRIPE START
export const createAddWalletStripe = async (req, res) => {
    try {
        const { loginAuthId } = req.params;
        const { amountUSD } = req.body;

        const amount = parseFloat(amountUSD);
        if (isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amountUSD" });
        }

        const processChargeUSD = (amount * 1) / 100;
        const totalAmountUSD = amount + processChargeUSD;
        const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Wallet Add Amout (ID: ${loginAuthId})`,
                    },
                    unit_amount: Math.round(totalAmountUSD * 100), 
                },
                quantity: 1,
            }],
            metadata: {
                loginAuthId,
                amountUSD: amount.toFixed(2),
                processChargeUSD: processChargeUSD.toFixed(2),
                totalAmountUSD: totalAmountUSD.toFixed(2),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            },
            success_url: `https://hiremejobs.vercel.app/user/deposit?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://hiremejobs.vercel.app/user/deposit`,
        });

        res.json({
            success: true,
            checkoutUrl: session.url,
            details: {
                enteredAmountUSD: amount,
                totalAmountUSD: totalAmountUSD.toFixed(2),
                totalAmountINR: totalAmountINR.toFixed(2),
                processChargeUSD: processChargeUSD.toFixed(2),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const verifyStripePayment = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const paymentStatus = session.payment_status;

        if (paymentStatus === 'paid') {
            const { loginAuthId, amountUSD, processChargeUSD, totalAmountUSD, exchangeRate } = session.metadata;
            const totalAmountINR = (totalAmountUSD * 83.12).toFixed(2); 

            const newDeposit = new Wallet({
                loginAuthId,
                process_charge: processChargeUSD,
                USDTotalAmount: totalAmountUSD,
                IndianTotalAmount: totalAmountINR,
                stripe_checkout_session_id: session.id,
                amountUSD,
                status: "Paid"
            });

            await newDeposit.save();
            return res.json({ success: true, walletUpdated: true });
        }

        let message = '';
        switch (paymentStatus) {
            case 'unpaid':
                message = "Payment is still pending.";
                break;
            case 'requires_payment_method':
                message = "Payment method is required.";
                break;
            case 'canceled':
                message = "Payment was canceled.";
                break;
            case 'expired':
                message = "Payment session has expired.";
                break;
            default:
                message = "Unknown payment status.";
        }

        return res.json({ success: false, message });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// FOR STRIPE END



import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
    'ASJ0X7_FTDh9Jo9eRBS5n6Guec8NKdDOIrlBx3AnhizDIKzEnYHwxSqpzS5aIWEsSf5WtL6M6FlDN8kQ',
    'ECxL-GtSYgx6QBPC4tilEnSzjeGGcaQ-ryvkqMhGTu9tHnljyPdGZwnc2OJhc_JdNz2zAg3Lm9JuYaHU'
);

const client = new paypal.core.PayPalHttpClient(environment);


export const creataddwalletFORPaypal = async (req, res) => {
    try {
        const { loginAuthId } = req.params;
        const { amountUSD } = req.body;

        const amount = parseFloat(amountUSD);
        if (isNaN(amount)) {
            return res.status(400).json({ message: "Invalid amountUSD" });
        }

        const processChargeUSD = (amount * 1) / 100;
        const totalAmountUSD = amount + processChargeUSD;

        const totalAmountINR = parseFloat((totalAmountUSD * INR_TO_USD).toFixed(2));

        // PayPal order creation
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: totalAmountUSD.toFixed(2)
                },
                description: `Payment for loginAuthId: ${loginAuthId}`,
                custom_id: loginAuthId,
                // Optionally add additional metadata for tracking
                custom_id: `receipt_${Date.now()}`
            }]
        });

        // Call PayPal API to create the order
        const order = await client.execute(request);

        // Find the approval link
        const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;

        // Return order details and PayPal approval URL
        res.json({
            success: true,
            order_id: order.result.id,
            amount: totalAmountUSD.toFixed(2),
            currency: 'USD',
            paypalApprovalUrl: approvalUrl, // PayPal approval URL for redirection
            details: {
                enteredAmountUSD: amount,
                totalAmountUSD: totalAmountUSD.toFixed(2),
                totalAmountINR: totalAmountINR.toFixed(2),
                processChargeUSD: processChargeUSD.toFixed(2),
                exchangeRate: `1 USD = ₹${INR_TO_USD}`
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export const verifyPaypalPayment = async (req, res) => {
    try {
        const { loginAuthId } = req.params;
        const { paypal_order_id, paypal_payment_id } = req.body;

        // Verify the payment with PayPal
        const request = new paypal.orders.OrdersCaptureRequest(paypal_order_id);
        request.requestBody({});
        
        const captureResponse = await client.execute(request);

        if (captureResponse.result.status !== 'COMPLETED') {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Extract relevant payment details
        const { amountUSD, processChargeUSD, totalAmountUSD, totalAmountINR } = req.body;

        // Save the wallet entry
        const newDeposit = new Wallet({
            loginAuthId,
            process_charge: processChargeUSD,
            USDTotalAmount: totalAmountUSD,
            IndianTotalAmout: totalAmountINR,
            paypal_order_id: paypal_order_id,
            paypal_payment_id: paypal_payment_id,
            amountUSD,
            status: "Paid"
        });

        await newDeposit.save();

        res.json({ success: true, message: "Payment verified and wallet updated" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};