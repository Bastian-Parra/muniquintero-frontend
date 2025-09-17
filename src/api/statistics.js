import axios from './axios.js'

const StatisticsAPI = {
    async generateStatistics(period) {
        const response = await axios.post('/api/stats/generate', { period });
        return response.data;
    },

    async getDailyStatistics() {
        const response = await axios.get('/api/stats/daily');
        return response.data;
    },

    async getWeeklyStatistics(weekOffset = 0) {
        const response = await axios.get(`/api/stats/weekly?weekOffset=${weekOffset}`);
        return response.data;
    },

    async getMonthlyStatistics() {
        const response = await axios.get('/api/stats/monthly');
        return response.data;
    },

    async getAllStatistics() {
        const response = await axios.get('/api/stats/getStats');
        return response.data;
    },

    async getReportsCoordinates(period) {
        const response = await axios.get(`/api/stats/coordinates/${period}`);
        return response.data;
    },

    async getFilteredReports(selectedDay, selectedShift) {
        const response = await axios.get('/api/stats/filtered-reports', {
            params: {
                dayOfWeek: selectedDay,
                shift: selectedShift
            }
        })
        return response.data
    },

    async getFilteredReportsByShiftAndSituation() {
        const response = await axios.get('/api/stats/filtered-reports-2');  
        return response.data
    },

    async getMostCommonSituations() {
        const response = await axios.get('/api/stats/most-common')
        return response.data.data
    },

}

export default StatisticsAPI