import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Mkoa = { id: number; jina: string; pcode: string };
export type Wilaya = { id: number; jina: string; pcode: string };
export type Kata = { id: number; jina: string; pcode: string };

export function useLocationHierarchy(initial?: {
  mkoa_id?: number | null;
  wilaya_id?: number | null;
  kata_id?: number | null;
}) {
  const [mikoa, setMikoa] = useState<Mkoa[]>([]);
  const [wilaya, setWilaya] = useState<Wilaya[]>([]);
  const [kata, setKata] = useState<Kata[]>([]);
  const [selectedMkoa, setSelectedMkoa] = useState<number | null>(initial?.mkoa_id ?? null);
  const [selectedWilaya, setSelectedWilaya] = useState<number | null>(initial?.wilaya_id ?? null);
  const [selectedKata, setSelectedKata] = useState<number | null>(initial?.kata_id ?? null);

  useEffect(() => {
    supabase
      .from("mikoa")
      .select("id, jina, pcode")
      .order("jina")
      .then(({ data }) => setMikoa((data as Mkoa[]) || []));
  }, []);

  useEffect(() => {
    if (!selectedMkoa) {
      setWilaya([]);
      return;
    }
    supabase
      .from("wilaya")
      .select("id, jina, pcode")
      .eq("mkoa_id", selectedMkoa)
      .order("jina")
      .then(({ data }) => setWilaya((data as Wilaya[]) || []));
  }, [selectedMkoa]);

  useEffect(() => {
    if (!selectedWilaya) {
      setKata([]);
      return;
    }
    supabase
      .from("kata")
      .select("id, jina, pcode")
      .eq("wilaya_id", selectedWilaya)
      .order("jina")
      .then(({ data }) => setKata((data as Kata[]) || []));
  }, [selectedWilaya]);

  const reset = useCallback(() => {
    setSelectedMkoa(null);
    setSelectedWilaya(null);
    setSelectedKata(null);
  }, []);

  const pickMkoa = useCallback((id: number | null) => {
    setSelectedMkoa(id);
    setSelectedWilaya(null);
    setSelectedKata(null);
  }, []);

  const pickWilaya = useCallback((id: number | null) => {
    setSelectedWilaya(id);
    setSelectedKata(null);
  }, []);

  return {
    mikoa,
    wilaya,
    kata,
    selectedMkoa,
    selectedWilaya,
    selectedKata,
    setSelectedMkoa: pickMkoa,
    setSelectedWilaya: pickWilaya,
    setSelectedKata,
    reset,
  };
}
