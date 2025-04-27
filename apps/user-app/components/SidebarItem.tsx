"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <div
            className={`flex items-center gap-3 cursor-pointer p-3 pl-8 rounded-lg transition 
                ${selected ? "bg-purple-100 text-[#6a51a6]" : "text-slate-600 hover:bg-gray-100"}`}
            onClick={() => router.push(href)}
        >
            <div className="w-6 h-6">{icon}</div>
            <div className="font-semibold">{title}</div>
        </div>
    );
};
