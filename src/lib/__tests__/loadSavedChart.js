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

    test('loadSavedChart should return an empty object when array is empty at the specified index', () => {
        localStorage.setItem("savedCharts", "[]"); // Set empty array as saved charts
        const loadedChart = loadSavedChart(0);
        expect(loadedChart).toEqual({});
    });

    test('loadSavedChart should return an empty object when nothing at the specified index', () => {
        localStorage.setItem("savedCharts", ""); 
        const loadedChart = loadSavedChart(0);
        expect(loadedChart).toEqual({});
    });

    test('loadSavedChart should return the linear chart at the specified index', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
        const loadedChart = loadSavedChart(1); // Load second chart
        expect(loadedChart).toEqual(chartData2);
    });   

    test('loadSavedChart should return the same linear chart result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadSavedChart(0);
    
        // Second call
        const savedChartsSecondCall = loadSavedChart(0);
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });

    test('loadSavedChart should return the scatter chart at the specified index', () => {
        const chartData1 = [{ x: 1, y: 100 }, { x: 2, y: 2 }];
        const chartData2 = [{ x: 3, y: 300 }, { x: 4, y: 4 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
        const loadedChart = loadSavedChart(1); // Load second chart
        expect(loadedChart).toEqual(chartData2);
    });   

    test('loadSavedChart should return the same scatter chart result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadSavedChart(0);
    
        // Second call
        const savedChartsSecondCall = loadSavedChart(0);
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });


    test('loadSavedChart should return the bar chart at the specified index', () => {
        const chartData1 = [{ x: 'Column A', y: 100 }, { x: 'Column B', y: 2 }];
        const chartData2 = [{ x: 'Column A', y: 300 }, { x: 'Column B', y: 4 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
        const loadedChart = loadSavedChart(1); // Load second chart
        expect(loadedChart).toEqual(chartData2);
    });   

    test('loadSavedChart should return the same bar chart result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadSavedChart(0);
    
        // Second call
        const savedChartsSecondCall = loadSavedChart(0);
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });

    test('loadSavedChart should return empty array when no chart at target', () => {
        window.localStorage.clear(); // Clear localStorage
        const savedCharts = loadSavedChart(0);
        expect(savedCharts).toEqual({});
    });

    test('loadSavedChart should return empty array when the index is negative', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
    
        // Expect calling loadSavedChart with a negative index to throw an error
        expect(loadSavedChart(-1)).toEqual({});
    });
    

    test('loadSavedChart should return empty array when the index is null', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
    
        // Expect calling loadSavedChart with a negative index to throw an error
        expect(loadSavedChart(null)).toEqual({});
    });

    test('loadSavedChart should return empty array when the index is invalid', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
    
        // Expect calling loadSavedChart with a negative index to throw an error
        expect(loadSavedChart('invalid')).toEqual({});
    });
    

    test('loadSavedChart should return empty array when the index isnt provided', () => {
        const chartData1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }];
        const chartData2 = [{ x: 3, y: 30 }, { x: 4, y: 40 }];
        saveChart(chartData1); // Save first chart data
        saveChart(chartData2); // Save second chart data
    
        // Expect calling loadSavedChart with a negative index to throw an error
        expect(loadSavedChart()).toEqual({});
    });

});
