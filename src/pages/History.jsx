import HistoryResultsCard from "@/components/HistoryResultsCard";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import ArrowComponent from "@/components/ArrowComponent";
import PageHeader from "@/components/PageHeader";

const History = () => {

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await supabase
                .from("purchases")
                // .select("*");
                .select(`
                    id,
                    purchased_at,
                    drink_name,
                    price,
                    rating,
                    locations (
                        shop_name
                    )
                `)
                //     location:locations (
                //     id,
                //     shop name,
                //     address
                //     ),
                //     photos:purchase_photos (
                //     id,
                //     storage_path,
                //     caption,
                //     created_at
                //     )
                // `)
                // .eq("user_id", user_id)
                // .order("purchased_at", { ascending: false });
                setRows(data ?? []);
        };

        fetchHistory();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Header */}
            <PageHeader
                title="History"
                caption="all your entries"
            />

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

                {rows.map((row) => (
                    <HistoryResultsCard key={row.id} row={row} className="text-sm geist-400" />
                ))}

                <div className="p-5 geist-400 text-sm text-muted-foreground">
                    {rows.length === 0 ? 
                    "No history yet. Start by adding a drink!" :
                    `Showing ${rows.length} of ${rows.length}`}
                </div>
            </div>
        </div>
    );
};

export default History;