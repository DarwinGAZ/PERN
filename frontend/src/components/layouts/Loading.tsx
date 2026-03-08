import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

function Loading() {
    return (
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Carregando...</EmptyTitle>
                <EmptyDescription>
                    Por favor, aguarde enquanto carregamos os dados.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent></EmptyContent>
        </Empty>
    );
}

export default Loading;
