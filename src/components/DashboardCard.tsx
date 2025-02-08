import React from "react";

interface DashboardCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

function DashboardCard({ children, className, title }: DashboardCardProps) {

    return (
        <div className={`p-4 bg-white ${className}`}>
            {title && <div>{title.toUpperCase()}</div>}
            {children}
        </div>
    );
}

export default DashboardCard
