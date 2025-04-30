import express from "express"
import { addDeposit, creataddwallet, creataddwalletFORPaypal, createAddWalletStripe, getDepositTrans, manageStatus, verifyRazorpayPayment, verifyStripePayment } from "../../controllers/Deposit-C/depositController.js"
import bodyParser from 'body-parser';

const depositRouter = express.Router()


depositRouter.put("/add-deposit/:loginAuthId/:milestoneId/:taskId/:bidId", addDeposit)

depositRouter.get("/manageStatus/:session_id", manageStatus)

depositRouter.put("/addtocard/:loginAuthId", creataddwallet)

depositRouter.put("/verify/:loginAuthId", verifyRazorpayPayment)

depositRouter.get("/transtion-Details/:loginAuthId", getDepositTrans)

depositRouter.put("/addtocardStripe/:loginAuthId", createAddWalletStripe)

depositRouter.get('/verifyStripe/:sessionId', verifyStripePayment);

depositRouter.put("/addtocardpaypal/:loginAuthId", creataddwalletFORPaypal)



export default depositRouter