import { supabase } from "@/lib/supabaseClient";

export async function searchPlaces({ query, ll, limit = 10 }) {
  const { data, error } = await supabase.functions.invoke("foursquare-places", {
    body: { query, ll, limit },
  });

  if (error) throw error;
  return data;
}