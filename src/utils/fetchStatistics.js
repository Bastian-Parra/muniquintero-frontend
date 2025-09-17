import {useState, useEffect} from 'react'
import StatisticsAPI from '../api/statistics.js'

export function useFetchStatistics() {
    const [dailyCount, setDailyCount] = useState(0)
    const [weeklyCount, setWeeklyCount] = useState(0)
    const [monthlyCount, setMonthlyCount] = useState(0)
    const [weeklyStats, setWeeklyStats] = useState([])
    const [monthlyStats, setMonthlyStats] = useState([])
    const [selectedMap, setSelectedMap] = useState("daily")


    useEffect(() => {

        const fetchStatistics = async () => {
            try {
                const daily = await StatisticsAPI.getDailyStatistics()
                const weekly = await StatisticsAPI.getWeeklyStatistics()
                const monthly = await StatisticsAPI.getMonthlyStatistics()
    
                const totalDaily = daily.reduce((acc, curr) => acc + curr.count, 0)
                setDailyCount(totalDaily)
                setWeeklyStats(weekly)
                setMonthlyStats(monthly)
    
                const totalWeekly = weekly.reduce((acc, day) => acc + day.count, 0)
                const totalMonthly = monthly.reduce((acc, week) => acc + week.count, 0)
    
                setWeeklyCount(totalWeekly)
                setMonthlyCount(totalMonthly)
    
            } catch (error) {
                console.error(error)
            }
        }
        
        fetchStatistics()
    }, [])

    return { dailyCount, weeklyCount, monthlyCount, weeklyStats, monthlyStats, selectedMap, setSelectedMap }
}