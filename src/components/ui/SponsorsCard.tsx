import React from "react";

export interface SponsorCardProps {
    name: string;
    description: string;
}

const SponsorsCard = ({ name, description }: SponsorCardProps) => {
    return (
        <div className="h-40 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow p-8 flex flex-col items-center justify-center text-center space-y-2">
            <p className="text-2xl font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
};

export default SponsorsCard;
