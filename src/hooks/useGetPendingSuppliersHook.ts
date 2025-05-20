import { useState, useEffect } from 'react';

export interface PendingSupplier {
    id: string;
    name: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
}

const mockPendingSuppliers: PendingSupplier[] = [
    { id: '1', name: 'Supplier A', date: '2024-06-10', status: 'pending' },
    { id: '2', name: 'Supplier B', date: '2024-06-12', status: 'pending' },
    { id: '3', name: 'Supplier C', date: '2024-06-15', status: 'pending' },
];

export function useGetPendingSuppliersHook() {
    const [data, setData] = useState<PendingSupplier[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setData(mockPendingSuppliers);
            setLoading(false);
        }, 1000); // simulate network delay
    }, []);

    return { data, loading, error };
}
