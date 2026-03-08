import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
    name: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "size-10 text-sm",
    md: "size-16 text-xl",
    lg: "size-24 text-3xl",
};

export function UserAvatar({ name, size = "lg" }: UserAvatarProps) {
    const initials = name
        .split(" ")
        .slice(0, 2)
        .map((n) => n.charAt(0).toUpperCase())
        .join("");

    return (
        <Avatar className={sizeClasses[size]}>
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}
