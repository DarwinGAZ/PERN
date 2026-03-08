export type Proposal = {
    id: string;
    message: string;
    price: number;
    status: ProposalStatus;
    createdAt: string;
};

export type ProposalStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface ProposalWithApplicant extends Proposal {
    applicant: {
        id: string;
        name: string;
        email: string;
    };
}
