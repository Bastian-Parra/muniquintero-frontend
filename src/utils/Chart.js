import { Bar }  from 'react-chartjs-2'


export const generateWeeklyChartData = (currentWeekData, lastWeekData, label) => {
    const translateDayOfWeek = (dayOfWeek) => {
        const days = {
            'Monday': 'Lunes',
            'Tuesday': 'Martes',
            'Wednesday': 'Miércoles',
            'Thursday': 'Jueves',
            'Friday': 'Viernes',
            'Saturday': 'Sábado',
            'Sunday': 'Domingo'
        };
        return days[dayOfWeek] || dayOfWeek;
    }

    return {
        labels: currentWeekData.map(stat => `${translateDayOfWeek(stat.dayOfWeek)} (${stat.date})`),
        datasets: [
            {
                label: 'Esta semana',
                data: currentWeekData.map(stat => stat.count),
                backgroundColor: '#FF834A',
                borderColor: '#FF834A',
                borderWidth: 2,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Semana pasada',
                data: lastWeekData.map(stat => stat.count),
                backgroundColor: '#4A90E2',
                borderColor: '#4A90E2',
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }
        ]
    }
}

export const generateMonthlyChartData = (monthlyStats, label) => {
    const labels = monthlyStats.map(stat => stat.date)
    const data = monthlyStats.map(stat => stat.count)

    return {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor: '#FF834A',
                borderColor: '#FF834A',
                borderWidth: 2,
                tension: 0.4

            }
        ]
    }
}
