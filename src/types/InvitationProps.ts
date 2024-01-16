export interface InvitationProps {
    id: string;
    from: string;
    to: string;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: number;
}