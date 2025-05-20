import { useState, useEffect } from 'react';

export interface PendingEvent {
    id: string;
    title: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

const mockPendingEvents: PendingEvent[] = [
    { id: '1', title: 'Event A', date: '2024-06-10', status: 'pending' },
    { id: '2', title: 'Event B', date: '2024-06-12', status: 'pending' },
    { id: '3', title: 'Event C', date: '2024-06-15', status: 'pending' },
];

export function useGetPendingEventsHook() {
    const [data, setData] = useState<PendingEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setData(mockPendingEvents);
            setLoading(false);
        }, 1000); // simulate network delay
    }, []);

    return { data, loading, error };
}