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

    test('updateCurrentChartData should store the provided chart data in localStorage', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        updateCurrentChartData(chartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData);
    });

    test('updateCurrentChartData should store the provided large chart data in localStorage', () => {
        const largeChartData = [];
        for (let i = 0; i < 10000; i++) {
            largeChartData.push({ x: i, y: i * 10 });
        }
        updateCurrentChartData(largeChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(largeChartData);
    });

    test('updateCurrentChartData should overwrite previously stored chart data in localStorage', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];

        // Save initial chart data
        updateCurrentChartData(chartData1);
        let storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData1);

        // Update chart data with new data
        updateCurrentChartData(chartData2);
        storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData2);
    });


    test('updateCurrentChartData should overwrite previously stored chart data with multiple calls', () => {
        const initialChartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const updatedChartData = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
    
        // Call the function twice with different data
        updateCurrentChartData(initialChartData);
        updateCurrentChartData(updatedChartData);
    
        // Ensure that the updated data is stored
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(updatedChartData);
    });


    test('updateCurrentChartData should handle empty chart data gracefully', () => {
        const emptyChartData = [];
        updateCurrentChartData(emptyChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(emptyChartData);
    });

    test('updateCurrentChartData should handle null chart data gracefully', () => {
        const nullChartData = null;
        updateCurrentChartData(nullChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toBeNull();
    });

    
});
