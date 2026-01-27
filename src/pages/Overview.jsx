import { useEffect, useState } from "react";
import { Calendar18 } from "@/components/Calendar18";
import Map from "@/components/Map";
import DefaultCard from "@/components/DefaultCard";
import OverviewHistoryCard from "@/components/OverviewHistoryCard";
import { supabase } from "@/lib/supabaseClient";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import CalendarDropdown from "@/components/CalendarDropdown";
import { ChartLineMultiple } from "@/components/ChartLineMultiple";
import { Button } from "@/components/ui/button";
import { RadialChart } from "@/components/RadialChart";

const Overview = () => {
    const [rows, setRows] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0.0)
    const [totalDrinks, setTotalDrinks] = useState(0)
    const [monthDrinks, setMonthDrinks] = useState(0)

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

    useEffect(() => {
        const fetchTotalSpent = async () => {
            const { data } = await supabase
                .from("purchases")
                .select("price")
                // .eq("user_id", user.id);
        
            const total = (data ?? []).reduce(
                (sum, row) => sum + Number(row.price ?? 0),
                0
            );

            setTotalSpent(total);
        };

        fetchTotalSpent();
    }, []);

    useEffect(() => {
        const fetchTotalDrinks = async () => {
            const { data } = await supabase
                .from("purchases")
                .select("id")
                // .eq("user_id", user.id);
        
            const total = (data ?? []).length;

            setTotalDrinks(total);
        };

        fetchTotalDrinks();
    }, []);

    useEffect(() => {
        const fetchMonthDrinks = async () => {
            const now = new Date();
            const startOfMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            ).toISOString();

            const { data } = await supabase
                .from("purchases")
                .select("id")
                .gte("purchased_at", startOfMonth);
                // .eq("user_id", user.id);
        
            const total = (data ?? []).length;

            setMonthDrinks(total);
        };

        fetchMonthDrinks();
    }, []);

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
                        <Map className="border" />
                    </div>

                    {/* <Calendar18 /> */}
                    <CalendarDropdown />
                </div>

                {/* Stats */}
                <ChartLineMultiple />

                <DefaultCard
                    className="inline-block"
                >
                    <div className="flex justify-between">
                        <p className="geist-500 text-md mb-3">Recent History</p>
                        <Button>View All</Button>
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