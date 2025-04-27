import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
      token: string;
      userId: string;
      amount: string
    } = {
      token: req.body.token,
      userId: req.body.user_identifier,
      amount: req.body.amount
    };
  
    try {
      await db.$transaction(async (tx) => {
        const existingBalance = await tx.balance.findFirst({
          where: { userId: Number(paymentInformation.userId) }
        });
  
        if (existingBalance) {
          await tx.balance.update({
            where: { id: existingBalance.id },
            data: {
              amount: {
                increment: Number(paymentInformation.amount)
              }
            }
          });
        } else {
          await tx.balance.create({
            data: {
              userId: Number(paymentInformation.userId),
              amount: Number(paymentInformation.amount),
              locked: 0
            }
          });
        }
  
        await tx.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token
          },
          data: {
            status: "Success",
          }
        });
      });
  
      res.json({ message: "Captured" });
    } catch (e) {
      console.error(e);
      res.status(411).json({ message: "Error while processing webhook" });
    }
  });
  

app.listen(3003);