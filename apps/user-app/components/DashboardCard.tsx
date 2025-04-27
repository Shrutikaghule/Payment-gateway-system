import React from 'react'
import Link from "next/link";

export const DashboardCard = () => {
    return (
        <div>
          <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Add Money"
              description="Top up your wallet easily"
              href="/transfer"
            />
            
            <Card
              title="Recent Transactions"
              description="View your recent activity"
              href="/transactions"
            />
            <Card
              title="P2P Transfers"
              description="Send money to friends"
              href="/p2p"
            />
          </div>
        </div>
      );
}

function Card({
    title,
    description,
    href,
  }: {
    title: string;
    description: string;
    href: string;
  }) {
    return (
      <Link href={href} passHref>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all cursor-pointer">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </Link>
    );
  }
  