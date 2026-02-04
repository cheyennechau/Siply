import HistoryResultsCard from "@/components/HistoryResultsCard";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import ArrowComponent from "@/components/ArrowComponent";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

const History = () => {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setPage(1);
    }, [user?.id]);
    
    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) return;

            setLoading(true);
            setError("");

            const from = (page - 1) * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            let query = supabase
                .from("purchases")
                .select(`
                    id,
                    purchased_at,
                    drink_name,
                    price,
                    rating,
                    locations (
                        shop_name
                    )
                `,
                    { count: "exact" }
                )
                .eq("user_id", user.id)
                .order("purchased_at", { ascending: false })
                .range(from, to);

                // if (user) query = query.eq("user_id", user.id);
                const { data, error, count } = await query;

                if (error) {
                    setError(error.message);
                    setRows([]);
                    setTotal(0);
                } else {
                    setRows(data ?? []);
                    setTotal(count ?? 0);
                }

                setLoading(false);
        };

        fetchHistory();
    }, [user, page]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col">
            {/* Header */}
            <PageHeader title="History" caption="all your entries" />

            <div className="bg-white rounded-lg border">
                <div className="grid grid-cols-5 gap-20 p-5 geist-500 text-md border-b">
                    <div className="flex items-center gap-2">
                        Date
                        <ArrowComponent />
                    </div>
                    <div className="flex items-center gap-2">
                        Location
                        <ArrowComponent />
                    </div>
                    <div className="flex items-center gap-2">
                        Drink
                        <ArrowComponent />
                    </div>
                    <div className="flex items-center gap-2">
                        Price
                        <ArrowComponent />
                    </div>
                    <div className="flex items-center gap-2">
                        Rating
                        <ArrowComponent />
                    </div>
                </div>

                {loading ? (
                    <div className="p-5 geist-400 text-sm text-muted-foreground">Loading…</div>
                ) : (
                    rows.map((row) => (
                        <HistoryResultsCard key={row.id} row={row} className="text-sm geist-400" />
                    ))
                )}

                <div className="p-5 geist-400 text-sm text-muted-foreground flex items-center justify-between">
                    <div>
                        {total === 0
                            ? "No history yet. Start by adding a drink!" 
                            : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total}`}
                    </div>

                    {/* pagination */}
                    {total > PAGE_SIZE && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!canPrev || loading}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Prev
                            </Button>

                            <span className="px-2">
                                Page {page} / {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!canNext || loading}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;