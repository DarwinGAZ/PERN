import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";

import { IconFolderCode } from "@tabler/icons-react";

type Props = {
    title: string;
    description?: string;
    action?: React.ReactNode;
};

export function EmptyCpn({ title, description, action }: Props) {
    return (
        <Empty className="py-20">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode className="w-12 h-12 text-muted-foreground" />
                </EmptyMedia>

                <EmptyTitle>{title}</EmptyTitle>

                {description && (
                    <EmptyDescription>{description}</EmptyDescription>
                )}
            </EmptyHeader>

            {action && <EmptyContent>{action}</EmptyContent>}
        </Empty>
    );
}
