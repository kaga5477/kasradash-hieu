
import { useState, useEffect } from 'react';

export interface ReportedPost {
    id: string;
    title: string;
    date: string;
}

const mockReportedPosts: ReportedPost[] = [
    { id: '1', title: 'Post A', date: '2024-06-10' },
    { id: '2', title: 'Post B', date: '2024-06-12' },
    { id: '3', title: 'Post C', date: '2024-06-15' },
];

export function useGetReportedPostsHook() {
    const [data, setData] = useState<ReportedPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setData(mockReportedPosts);
            setLoading(false);
        }, 1000); // simulate network delay
    }, []);

    return { data, loading, error };
}
