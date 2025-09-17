import { useEffect, useState, useCallback } from "react";
import StatisticsAPI from "../api/statistics.js";

export const useWeeklyStats = () => {
  const [currentWeekData, setCurrentWeekData] = useState([]);
  const [lastWeekData, setLastWeekData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeeklyData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [current, last] = await Promise.all([
        StatisticsAPI.getWeeklyStatistics(0), // this week
        StatisticsAPI.getWeeklyStatistics(1)  // last week
      ]);
      
      // Solo actualiza el estado si los datos son diferentes
      setCurrentWeekData(prev => JSON.stringify(prev) !== JSON.stringify(current) ? current : prev);
      setLastWeekData(prev => JSON.stringify(prev) !== JSON.stringify(last) ? last : prev);
    } catch (err) {
      setError(err);
      console.error("Error fetching weekly data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeeklyData();
    
    // Opcional: agregar limpieza si es necesario
    return () => {
      // Cancelar peticiones pendientes si es necesario
    };
  }, [fetchWeeklyData]);

  return { 
    currentWeekData, 
    lastWeekData, 
    loading, 
    error,
    refetch: fetchWeeklyData // Opcional: exponer función para re-fetch
  };
};