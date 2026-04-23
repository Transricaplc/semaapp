import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useFollowOfficial(officialId: string, officialName: string) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !officialId) {
      setIsFollowing(false);
      return;
    }
    let cancelled = false;
    supabase
      .from("followed_officials")
      .select("id")
      .eq("user_id", user.id)
      .eq("official_id", officialId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setIsFollowing(!!data);
      });
    return () => {
      cancelled = true;
    };
  }, [user, officialId]);

  const toggle = useCallback(async () => {
    if (!user) {
      toast.error("Ingia kwanza ili kufuatilia");
      return;
    }
    setLoading(true);
    if (isFollowing) {
      const { error } = await supabase
        .from("followed_officials")
        .delete()
        .eq("user_id", user.id)
        .eq("official_id", officialId);
      setLoading(false);
      if (error) return toast.error("Imeshindikana");
      setIsFollowing(false);
      toast.success("Umeacha kufuatilia");
    } else {
      const { error } = await supabase
        .from("followed_officials")
        .insert({ user_id: user.id, official_id: officialId, official_name: officialName });
      setLoading(false);
      if (error) return toast.error("Imeshindikana");
      setIsFollowing(true);
      toast.success("Unamfuatilia sasa");
    }
  }, [user, officialId, officialName, isFollowing]);

  return { isFollowing, toggle, loading };
}

export function useFollowedList() {
  const { user } = useAuth();
  const [items, setItems] = useState<{ official_id: string; official_name: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("followed_officials")
      .select("official_id, official_name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems(data || []);
        setLoading(false);
      });
  }, [user]);

  return { items, loading };
}
