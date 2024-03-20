const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
} = require('../chartStorage.js');

const localStorageMock = (() => {
    let store = {};
    return {
        getItem: key => {
            return store[key];
        },
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Chart Storage Functions', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });
    
    test('loadCurrentChartData should return an empty object when no chart data is stored in localStorage', () => {
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual({});
    });

    test('loadCurrentChartData should return the chart data stored in localStorage', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });

    test('loadCurrentChartData should handle large numbers in chart data', () => {
        const chartData = [{ x: 1, y: 1000000000000000000 }, { x: 2, y: 2000000000000000000 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
    

    test('loadCurrentChartData should handle multiple calls gracefully', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));

        const firstCall = loadCurrentChartData();
        const secondCall = loadCurrentChartData();

        expect(firstCall).toEqual(chartData);
        expect(secondCall).toEqual(chartData);

    });
    
    test('loadCurrentChartData should return the last saved chart data when multiple charts are stored in localStorage', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        const chartData3 = [{ x: 5, y: 50 }, { x: 6, y: 60 }];

        localStorage.setItem('chart1', JSON.stringify(chartData1));
        localStorage.setItem('chart2', JSON.stringify(chartData2));
        localStorage.setItem('currentChartData', JSON.stringify(chartData3));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData3);
    });
    
});
