import { useEffect, useState } from "react";
import { Calendar18 } from "@/components/Calendar18";
import MapComponent from "@/components/MapComponent";
import DefaultCard from "@/components/DefaultCard";
import OverviewHistoryCard from "@/components/OverviewHistoryCard";
import { supabase } from "@/lib/supabaseClient";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import CalendarDropdown from "@/components/CalendarDropdown";
import ChartLineMultiple from "@/components/ChartLineMultiple";
import { Button } from "@/components/ui/button";
import { RadialChart } from "@/components/RadialChart";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Overview = () => {
    const [rows, setRows] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0.0)
    const [totalDrinks, setTotalDrinks] = useState(0)
    const [monthDrinks, setMonthDrinks] = useState(0)
    const { user } = useAuth();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchChart = async () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString();

        const { data, error } = await supabase
            .from("purchases")
            .select("purchased_at, rating, user_id")
            .gte("purchased_at", start)
            .eq("user_id", user.id)
            .order("purchased_at", { ascending: true });

        if (error) {
            console.error("chart error:", error.message);
            setChartData([]);
            return;
        }

        // past 6 months
        const months = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            months.push({ key, label: d.toLocaleString("en-US", { month: "long" }) });
        }

        const bucket = new Map(
            months.map((m) => [m.key, { month: m.label, drinks: 0, ratingSum: 0, ratingCount: 0 }])
        );

        for (const row of data ?? []) {
            const d = new Date(row.purchased_at);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            const b = bucket.get(key);
            if (!b) continue;

            b.drinks += 1;

            const r = Number(row.rating);
            if (!Number.isNaN(r) && r > 0) {
            b.ratingSum += r;
            b.ratingCount += 1;
            }
        }

        setChartData(
            months.map((m) => {
            const b = bucket.get(m.key);
            return {
                month: b.month,
                drinks: b.drinks,
                avgRating: b.ratingCount ? Number((b.ratingSum / b.ratingCount).toFixed(2)) : 0,
            };
            })
        );
        };

        fetchChart();
    }, [user]);

    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await supabase
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
                `);

                setRows(data ?? []);
        };

        fetchHistory();
    }, []);

    // useEffect(() => {
    //     const fetchTotalSpent = async () => {
    //         const { data } = await supabase
    //             .from("purchases")
    //             .select("price")
    //             // .eq("user_id", user.id);
        
    //         const total = (data ?? []).reduce(
    //             (sum, row) => sum + Number(row.price ?? 0),
    //             0
    //         );

    //         setTotalSpent(total);
    //     };

    //     fetchTotalSpent();
    // }, []);

    // useEffect(() => {
    //     const fetchTotalDrinks = async () => {
    //         const { data } = await supabase
    //             .from("purchases")
    //             .select("id")
    //             // .eq("user_id", user.id);
        
    //         const total = (data ?? []).length;

    //         setTotalDrinks(total);
    //     };

    //     fetchTotalDrinks();
    // }, []);

    // useEffect(() => {
    //     const fetchMonthDrinks = async () => {
    //         const now = new Date();
    //         const startOfMonth = new Date(
    //             now.getFullYear(),
    //             now.getMonth(),
    //             1
    //         ).toISOString();

    //         const { data } = await supabase
    //             .from("purchases")
    //             .select("id")
    //             .gte("purchased_at", startOfMonth);
    //             // .eq("user_id", user.id);
        
    //         const total = (data ?? []).length;

    //         setMonthDrinks(total);
    //     };

    //     fetchMonthDrinks();
    // }, []);


    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Overview"
                caption="at a glance"
            />

            <div className="grid gap-10">
                {/* Map and Calendar */}
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2">
                        <MapComponent className="border" />
                    </div>

                    <CalendarDropdown />
                </div>

                {/* Stats */}
                {/* <ChartLineMultiple data={chartData} /> */}
                {chartData.length === 0 ? (
                    <div className="text-sm text-muted-foreground p-6">
                        No data yet — add a drink to see your trends.
                    </div>
                ) : (
                    <ChartLineMultiple data={chartData} />
                )}

                <DefaultCard
                    className="inline-block"
                >
                    <div className="flex justify-between">
                        <p className="geist-500 text-md mb-3">Recent History</p>
                        <Link to="/history">
                            <Button
                                className="bg-white text-muted-foreground hover:bg-muted-foreground/20"
                            >
                                View All
                            </Button>
                        </Link>
                    </div>
                    {rows.map((row) => (
                        <OverviewHistoryCard key={row.id} row={row} className="text-sm geist-400" />
                    ))}
                </DefaultCard>
            </div>
        </div>
    );
};

export default Overview;