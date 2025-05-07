// src/hooks/useSleepDiary.ts

import { useState, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "./useAuth";

// Sleep Diary entry interface
export interface SleepDiaryEntry {
  id?: number;
  date: string;
  bedTime: string;
  fallAsleepTime: string;
  wakeTime: string;
  getUpTime: string;
  awakenings: number;
  totalAwakeTime: number;
  sleepQuality: number;
  restedness: number;
  mood: number;
  notes?: string;
  timeInBed?: string;
  totalSleepTime?: string;
  sleepEfficiency?: number;
}

// API response types
interface SleepDiaryResponse extends SleepDiaryEntry {
  id: number;
  userId: number;
  timeInBed: string;
  totalSleepTime: string;
  sleepEfficiency: number;
}

interface SleepDiaryListResponse {
  diaries: SleepDiaryResponse[];
}

// State for the hook
interface SleepDiaryState {
  entries: SleepDiaryResponse[];
  currentEntry: SleepDiaryResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useSleepDiary() {
  const { user } = useAuth();
  const [state, setState] = useState<SleepDiaryState>({
    entries: [],
    currentEntry: null,
    isLoading: false,
    error: null,
  });

  // Get all sleep diary entries
  const getSleepDiaries = useCallback(
    async (limit = 30, skip = 0) => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await api.get<SleepDiaryListResponse>(
          `/sleep-diary/${user.id}?limit=${limit}&skip=${skip}`
        );

        setState((prev) => ({
          ...prev,
          entries: response.diaries,
          isLoading: false,
        }));

        return response.diaries;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch sleep diaries",
        }));
      }
    },
    [user]
  );

  // Get a specific sleep diary entry
  const getSleepDiary = useCallback(
    async (diaryId: number) => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await api.get<SleepDiaryResponse>(
          `/sleep-diary/${user.id}/${diaryId}`
        );

        setState((prev) => ({
          ...prev,
          currentEntry: response,
          isLoading: false,
        }));

        return response;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch sleep diary entry",
        }));
      }
    },
    [user]
  );

  // Create a new sleep diary entry
  const createSleepDiary = useCallback(
    async (diaryData: SleepDiaryEntry) => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Convert to Record<string, unknown> for the API client
        const diaryDataRecord: Record<string, unknown> = {};
        Object.entries(diaryData).forEach(([key, value]) => {
          // Convert keys from camelCase to snake_case for the API
          const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          diaryDataRecord[snakeKey] = value;
        });

        const response = await api.post<SleepDiaryResponse>(
          `/sleep-diary/${user.id}`,
          diaryDataRecord
        );

        // Update state with the new entry
        setState((prev) => ({
          ...prev,
          entries: [response, ...prev.entries],
          currentEntry: response,
          isLoading: false,
        }));

        return response;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to create sleep diary entry",
        }));
      }
    },
    [user]
  );

  // Update a sleep diary entry
  const updateSleepDiary = useCallback(
    async (diaryId: number, diaryData: Partial<SleepDiaryEntry>) => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Convert to Record<string, unknown> for the API client
        const diaryDataRecord: Record<string, unknown> = {};
        Object.entries(diaryData).forEach(([key, value]) => {
          // Convert keys from camelCase to snake_case for the API
          const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          diaryDataRecord[snakeKey] = value;
        });

        const response = await api.put<SleepDiaryResponse>(
          `/sleep-diary/${user.id}/${diaryId}`,
          diaryDataRecord
        );

        // Update state with the updated entry
        setState((prev) => ({
          ...prev,
          entries: prev.entries.map((entry) =>
            entry.id === diaryId ? response : entry
          ),
          currentEntry: response,
          isLoading: false,
        }));

        return response;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update sleep diary entry",
        }));
      }
    },
    [user]
  );

  // Delete a sleep diary entry
  const deleteSleepDiary = useCallback(
    async (diaryId: number) => {
      if (!user) {
        setState((prev) => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        await api.delete<void>(`/sleep-diary/${user.id}/${diaryId}`);

        // Update state by removing the deleted entry
        setState((prev) => ({
          ...prev,
          entries: prev.entries.filter((entry) => entry.id !== diaryId),
          currentEntry:
            prev.currentEntry?.id === diaryId ? null : prev.currentEntry,
          isLoading: false,
        }));

        return true;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete sleep diary entry",
        }));
        return false;
      }
    },
    [user]
  );

  return {
    ...state,
    getSleepDiaries,
    getSleepDiary,
    createSleepDiary,
    updateSleepDiary,
    deleteSleepDiary,
  };
}
