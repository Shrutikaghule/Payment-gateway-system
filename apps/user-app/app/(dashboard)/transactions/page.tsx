import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { TransactionHistory } from "../../../components/TransactionHistory";

type Direction = "SENT" | "RECEIVED";

async function getTransactionHistory() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
              { fromUserId: Number(session.user.id) },
              { toUserId: Number(session.user.id) }
            ]
          },
          include: {
            fromUser: true,
            toUser: true
          },
          orderBy: {
            timestamp: 'desc'
          }
        });
      
    return txns.map(t => ({
        timestamp: t.timestamp,
        amount: t.amount,
        direction: (t.fromUserId === Number(session.user.id) ? "SENT" : "RECEIVED") as Direction,
        fromUser: t.fromUser.name || t.fromUser.number || "Unknown",
        toUser: t.toUser.name || t.toUser.number || "Unknown",
    }))
}

export default async function() {
    const transactions = await getTransactionHistory();

    return <div className="w-[98%]">
                <div className="pt-4">
                    <TransactionHistory transactions={transactions} />
                </div>
    </div>
}