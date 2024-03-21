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

    test('loadCurrentChartData should return the linear chart data stored in localStorage', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });

    test('loadCurrentChartData should handle large numbers in linear chart data', () => {
        const chartData = [{ x: 1, y: 1000000000000 }, { x: 2, y: 20000000000000 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
    

    test('loadCurrentChartData should handle multiple calls with linear chart gracefully', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));

        const firstCall = loadCurrentChartData();
        const secondCall = loadCurrentChartData();

        expect(firstCall).toEqual(chartData);
        expect(secondCall).toEqual(chartData);

    });
    
    test('loadCurrentChartData should return the last saved chart data when multiple linear charts are stored in localStorage', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        const chartData3 = [{ x: 5, y: 50 }, { x: 6, y: 60 }];

        localStorage.setItem('chart1', JSON.stringify(chartData1));
        localStorage.setItem('chart2', JSON.stringify(chartData2));
        localStorage.setItem('currentChartData', JSON.stringify(chartData3));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData3);
    });


    test('loadCurrentChartData should return the scatter chart data stored in localStorage', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });

    test('loadCurrentChartData should handle large numbers in scatter chart data', () => {
        const chartData = [{ x: 1, y: 1000000000000 }, { x: 2, y: 12345678910 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
    

    test('loadCurrentChartData should handle multiple calls with scatter chart gracefully', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));

        const firstCall = loadCurrentChartData();
        const secondCall = loadCurrentChartData();

        expect(firstCall).toEqual(chartData);
        expect(secondCall).toEqual(chartData);

    });
    
    test('loadCurrentChartData should return the last saved chart data when multiple scatter charts are stored in localStorage', () => {
        const chartData1 = [{ x: 1, y: 100 }, { x: 2, y: 200 }];
        const chartData2 = [{ x: 3, y: 3 }, { x: 4, y: 4 }];
        const chartData3 = [{ x: 5, y: 50 }, { x: 6, y: 60 }];

        localStorage.setItem('chart1', JSON.stringify(chartData1));
        localStorage.setItem('chart2', JSON.stringify(chartData2));
        localStorage.setItem('currentChartData', JSON.stringify(chartData3));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData3);
    });


    test('loadCurrentChartData should return the bar chart data stored in localStorage', () => {
        const chartData = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });

    test('loadCurrentChartData should handle large numbers in bar chart data', () => {
        const chartData = [{ x: 'Column A', y: 1000000000000 }, { x: 'Column B', y: 20000000000000 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
    

    test('loadCurrentChartData should handle multiple calls with bar chart gracefully', () => {
        const chartData = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));

        const firstCall = loadCurrentChartData();
        const secondCall = loadCurrentChartData();

        expect(firstCall).toEqual(chartData);
        expect(secondCall).toEqual(chartData);

    });
    
    test('loadCurrentChartData should return the last saved chart data when multiple bar charts are stored in localStorage', () => {
        const chartData1 = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        const chartData2 = [{ x: 'Column A', y: 30 }, { x: 'Column B', y: 40 }];
        const chartData3 = [{ x: 'Column A', y: 50 }, { x: 'Column B', y: 60 }];

        localStorage.setItem('chart1', JSON.stringify(chartData1));
        localStorage.setItem('chart2', JSON.stringify(chartData2));
        localStorage.setItem('currentChartData', JSON.stringify(chartData3));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData3);
    });


    test('loadCurrentChartData should return the last saved chart data when multiple charts with different types are stored in localStorage', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 1, y: 30 }, { x: 2, y: 400 }];
        const chartData3 = [{ x: 'Column A', y: 50 }, { x: 'Column B', y: 60 }];

        localStorage.setItem('chart1', JSON.stringify(chartData1));
        localStorage.setItem('chart2', JSON.stringify(chartData2));
        localStorage.setItem('currentChartData', JSON.stringify(chartData3));

        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData3);
    });

    test('loadCurrentChartData should return negative chart data stored in localStorage', () => {
        const chartData = [{ x: -1, y: -10 }, { x: -2, y: -20 }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });


    test('loadCurrentChartData should return null chart data stored in localStorage', () => {
        const chartData = [{ x: null, y: null }, { x: null, y: null }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });

    test('loadCurrentChartData should return invalid chart data stored in localStorage', () => {
        const chartData = [{ x: 'Invalid', y: 'Invalid' }, { x: 'Invalid', y: 'Invalid' }];
        localStorage.setItem('currentChartData', JSON.stringify(chartData));
        const loadedData = loadCurrentChartData();
        expect(loadedData).toEqual(chartData);
    });
});
