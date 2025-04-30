import BidTask from "../../models/Bid-Task-M/bidTaskSchema.js";
import Deposit from "../../models/Deposit-M/depositSchema.js";
import MileStone from "../../models/MileStone-M/mileStoneSchema.js";
import TaskFile from "../../models/TASK-FILE-M/TaskFileSchema.js";
import TaskSubcategory from "../../models/Task-M/Task-subcategory/task-subcategory-schema.js";
import dotenv from "dotenv"
dotenv.config()
import Stripe from "stripe"
var s = process.env.s
const stripe = new Stripe(s)

export const createMileStone = async (req, res) => {
    try {
        const { taskId, bidId, loginAuthId } = req.params;
        const { mileDescription, mileAmount, mileStatus } = req.body;

        const checkBidAmount = await BidTask.findOne({ taskId });

        if (!checkBidAmount) {
            return res.status(404).json({
                message: "No bid found for the given task ID"
            });
        }

        if (mileAmount > checkBidAmount.minimalRate) {
            return res.status(400).json({
                // message: `Milestone amount (${mileAmount}) cannot exceed the minimal rate (${checkBidAmount.minimalRate})`
                message: "your mileAmount is greater then your bidAmount"
            });
        }

        const bids = await BidTask.findById(bidId)

        const bidUserId = bids.loginAuthId


        const addAMile = new MileStone({
            taskId,
            bidId,
            loginAuthId,
            mileDescription,
            mileAmount,
            mileStatus,
            bidUserId
        });

        await addAMile.save();

        res.status(200).json({
            message: "Created a milestone",
            addedMileStone: addAMile
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



export const deatils_On_Task_MileStone = async (req, res) => {
    try {
        const { taskId, loginAuthId } = req.params;
        const { session_id } = req.query;

        if (session_id) {
            const session = await stripe.checkout.sessions.retrieve(session_id);

            if (session) {
                const milestoneId = session.metadata?.milestoneId;

                let newStatus = null;

                if (session.payment_status === "paid") {
                    newStatus = "Released";
                } else if (session.status === "expired") {
                    newStatus = "Cancelled";
                }

                if (milestoneId && newStatus) {
                    await MileStone.findByIdAndUpdate(milestoneId, {
                        mileStatus: newStatus,
                        session_id: session_id,
                    });

                    await Deposit.findOneAndUpdate(
                        { session_id: session_id },
                        { status: newStatus.toLowerCase() }
                    );
                }
            }
        }

        const milestones = await MileStone.find({ taskId })
            .populate({
                path: "taskId",
                select: "taskTitle"
            })
            .populate({
                path: "loginAuthId",
                select: "firstName _id"
            })
            .populate({
                path: "bidId",
                select: "TaskCreaterId",
                populate: {
                    path: "TaskCreaterId",
                    select: "firstName _id"
                }
            });

        if (!milestones || milestones.length === 0) {
            return res.status(404).json({
                message: "Milestone not found"
            });
        }

        const isAuthorized = milestones.some(milestone =>
            milestone.loginAuthId?._id.toString() === loginAuthId ||
            milestone.bidId?.TaskCreaterId?._id.toString() === loginAuthId ||
            milestone.bidUserId?._id.toString() === loginAuthId
        );

        if (!isAuthorized) {
            return res.status(403).json({
                message: "You are not authorized to view these milestones"
            });
        }
        res.status(200).json({
            message: "Found milestones",
            foundMileStone: milestones
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};





export const createStripeInvoiceForMilestone = async (req, res) => {

    try {
        const { milestoneId } = req.params;
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({ message: 'Missing session_id in query' });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);
        const metadata = session.metadata;
        const customerDetails = session.customer_details;


        if (!metadata || !metadata.totalAmountUSD) {
            return res.status(400).json({ message: 'Invalid session metadata' });
        }

        const totalAmountUSD = parseFloat(metadata.totalAmountUSD);
        const amountInCents = Math.round(totalAmountUSD * 100);
        const customerEmail = customerDetails?.email;
        const customerName = customerDetails?.name;

        if (!customerEmail || !customerName) {
            return res.status(400).json({ message: 'Missing customer details in session' });
        }

        const customer = await stripe.customers.create({
            email: customerEmail,
            name: customerName,
        });

        await stripe.invoiceItems.create({
            customer: customer.id,
            amount: amountInCents,
            currency: 'usd',
            description: `Milestone ID: ${metadata.milestoneId} (Task ID: ${metadata.taskId})`,
            metadata: {
                milestoneId: metadata.milestoneId,
                taskId: metadata.taskId,
                loginAuthId: metadata.loginAuthId,
                depositAmountUSD: metadata.depositAmountUSD,
                processChargeUSD: metadata.processChargeUSD,
                exchangeRate: metadata.exchangeRate,
            },
        });

        const invoice = await stripe.invoices.create({
            customer: customer.id,
            collection_method: 'send_invoice',
            days_until_due: 7,
            auto_advance: true,
            pending_invoice_items_behavior: 'include',
            metadata: {
                paymentSessionId: session_id,
                paymentStatus: session.payment_status,
                mode: session.mode,
            },
        });


        const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

        const fullInvoice = await stripe.invoices.retrieve(finalizedInvoice.id, {
            expand: ['lines']
        });

        res.status(200).json({
            message: 'Invoice created and finalized successfully',
            invoice: fullInvoice.invoice_pdf,
        });

    } catch (error) {
        console.error('Stripe invoice error:', error.message);
        res.status(500).json({
            message: 'Invoice creation failed',
            error: error.message,
        });
    }
};




export const uploadTaskFiles = async (req, res) => {
    try {
        const { loginAuthId, taskCreatorId } = req.params;

        const uploadFiles = req.file ? req.file.filename : null;

        const saveFile = new TaskFile({
            loginAuthId,
            uploadFiles,
            taskCreatorId
        });

        await saveFile.save();

        res.status(200).json({
            message: "File uploaded successfully",
            files: saveFile
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export const getUploadedFiles = async (req, res) => {
    try {
        const { loginAuthId, taskCreatorId } = req.params;

        const files = await TaskFile.find({
            $or: [
                { loginAuthId, taskCreatorId },
                { loginAuthId: taskCreatorId, taskCreatorId: loginAuthId },
            ],
        }).populate({
            path: "loginAuthId",
            select: "firstName"
        }).populate({
            path: "taskCreatorId",
            select: "firstName"
        })

        if (files.length === 0) {
            return res.status(404).json({
                message: "No files found for the given user and task creator"
            });
        }

        res.status(200).json({
            message: "Files fetched successfully",
            files
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
