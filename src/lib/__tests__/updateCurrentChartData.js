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

    test('updateCurrentChartData should store the provided linear chart data in localStorage', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        updateCurrentChartData(chartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData);
    });

    test('updateCurrentChartData should store the provided large linear chart data in localStorage', () => {
        const largeChartData = [];
        for (let i = 0; i < 10000; i++) {
            largeChartData.push({ x: i, y: i * 100 });
        }
        updateCurrentChartData(largeChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(largeChartData);
    });

    test('updateCurrentChartData should overwrite previously stored linear chart data in localStorage', () => {
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


    test('updateCurrentChartData should overwrite previously stored linear chart data with multiple calls', () => {
        const initialChartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const updatedChartData = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
    
        // Call the function twice with different data
        updateCurrentChartData(initialChartData);
        updateCurrentChartData(updatedChartData);
    
        // Ensure that the updated data is stored
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(updatedChartData);
    });

    test('updateCurrentChartData should store the provided scatter chart data in localStorage', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        updateCurrentChartData(chartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData);
    });

    test('updateCurrentChartData should store the provided large scatter chart data in localStorage', () => {
        const largeChartData = [];
        for (let i = 0; i < 10000; i++) {
            largeChartData.push({ x: i, y: i * Math.random() });
        }
        updateCurrentChartData(largeChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(largeChartData);
    });

    test('updateCurrentChartData should overwrite previously stored scatter chart data in localStorage', () => {
        const chartData1 = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        const chartData2 = [{ x: 3, y: 300 }, { x: 4, y: 4 }];

        // Save initial chart data
        updateCurrentChartData(chartData1);
        let storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData1);

        // Update chart data with new data
        updateCurrentChartData(chartData2);
        storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData2);
    });


    test('updateCurrentChartData should overwrite previously stored scatter chart data with multiple calls', () => {
        const initialChartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        const updatedChartData = [{ x: 3, y: 300 }, { x: 4, y: 4 }];
    
        // Call the function twice with different data
        updateCurrentChartData(initialChartData);
        updateCurrentChartData(updatedChartData);
    
        // Ensure that the updated data is stored
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(updatedChartData);
    });


    test('updateCurrentChartData should store the provided bar chart data in localStorage', () => {
        const chartData = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        updateCurrentChartData(chartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData);
    });

    test('updateCurrentChartData should store the provided large bar chart data in localStorage', () => {
        const largeChartData = [];
        for (let i = 0; i < 10000; i++) {
            largeChartData.push({ x: i, y: i * 100 });
        }
        updateCurrentChartData(largeChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(largeChartData);
    });

    test('updateCurrentChartData should overwrite previously stored bar chart data in localStorage', () => {
        const chartData1 = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        const chartData2 = [{ x: 'Column A', y: 30 }, { x: 'Column B', y: 40 }];

        // Save initial chart data
        updateCurrentChartData(chartData1);
        let storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData1);

        // Update chart data with new data
        updateCurrentChartData(chartData2);
        storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual(chartData2);
    });


    test('updateCurrentChartData should overwrite previously stored bar chart data with multiple calls', () => {
        const initialChartData = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }];
        const updatedChartData = [{ x: 'Column A', y: 30 }, { x: 'Column B', y: 40 }];
    
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

    test('updateCurrentChartData should handle null chart data gracefully', () => {
        const nullChartData = "Invalid";
        updateCurrentChartData(nullChartData);
        const storedData = JSON.parse(localStorage.getItem('currentChartData'));
        expect(storedData).toEqual("Invalid");
    });

    
});
