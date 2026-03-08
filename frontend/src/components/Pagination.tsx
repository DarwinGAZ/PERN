import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

export function PaginationDemo({
    page,
    total,
    onPageChange,
}: {
    page: number;
    total: number;
    onPageChange: (page: number) => void;
}) {
    const totalPages = Math.ceil(total / 12);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(Math.max(1, page - 1))}
                    />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => onPageChange(p)}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() =>
                            onPageChange(Math.min(totalPages, page + 1))
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
