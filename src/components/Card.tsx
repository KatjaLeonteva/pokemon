import React from "react";

interface CardProps {
    children: React.ReactNode;
}

function Card({ children }: CardProps) {

    return (
        <div className="p-4 bg-white shadow">
            {children}
        </div>
    );
}

export default Card
