import { Card } from "@repo/ui/card";

export const TransactionHistory = ({
    transactions
}: {
    transactions: {
        timestamp: Date,
        amount: number,
        direction: "SENT" | "RECEIVED",
        toUser: string,
        fromUser: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center py-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                        <div className="flex flex-col">
                            <div className="text-sm font-medium">
                                {t.direction === "SENT" ? `Sent to ${t.toUser}` : `Received from ${t.fromUser}`}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <div className={`text-sm ${t.direction === "SENT" ? "text-red-500" : "text-green-600"}`}>
                                {t.direction === "SENT" ? "-" : "+"} ₹{(t.amount / 100).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};