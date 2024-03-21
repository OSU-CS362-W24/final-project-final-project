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

    test('loadAllSavedCharts should return empty array when no charts are saved', () => {
        window.localStorage.clear(); 
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([]);
    });

    test('loadAllSavedCharts should return empty array when saved charts value is an empty array', () => {
        window.localStorage.setItem("savedCharts", "[]");
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([]);
    });

    test('loadAllSavedCharts should return array with single linear chart', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });

    test('loadAllSavedCharts should return array with multiple linear charts', () => {
        const chart1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        const chart2 = [{ x: 4, y: 40 }, { x: 5, y: 50 }, { x: 6, y: 60 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chart1, chart2]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart1, chart2]);
    });

    test('loadAllSavedCharts should return the same linear result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadAllSavedCharts();
    
        // Second call
        const savedChartsSecondCall = loadAllSavedCharts();
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });


    test('loadAllSavedCharts should return array with single scatter chart', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });

    test('loadAllSavedCharts should return array with multiple scatter charts', () => {
        const chart1 = [{ x: 1, y: 100 }, { x: 2, y: 2 }, { x: 3, y: 30 }];
        const chart2 = [{ x: 4, y: 400 }, { x: 5, y: 5 }, { x: 6, y: 60 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chart1, chart2]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart1, chart2]);
    });

    test('loadAllSavedCharts should return the same scatter result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 100 }, { x: 2, y: 2 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadAllSavedCharts();
    
        // Second call
        const savedChartsSecondCall = loadAllSavedCharts();
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });

  
    test('loadAllSavedCharts should return array with single bar chart', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });

    test('loadAllSavedCharts should return array with multiple bar charts', () => {
        const chart1 = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }, { x: 'Column C', y: 30 }];
        const chart2 = [{ x: 'Column A', y: 40 }, { x: 'Column B', y: 50 }, { x: 'Column C', y: 60 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chart1, chart2]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart1, chart2]);
    });

    test('loadAllSavedCharts should return the same bar result on multiple consecutive calls', () => {
        const chartData = [{ x: 'Column A', y: 10 }, { x: 'Column B', y: 20 }, { x: 'Column C', y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
    
        // First call
        const savedChartsFirstCall = loadAllSavedCharts();
    
        // Second call
        const savedChartsSecondCall = loadAllSavedCharts();
    
        // Expect both calls to return the same result
        expect(savedChartsFirstCall).toEqual(savedChartsSecondCall);
    });
    

    test('loadAllSavedCharts should throw an error when saved data is invalid', () => {
        window.localStorage.setItem("savedCharts", "invalid JSON data");
        expect(loadAllSavedCharts).toThrow();
    });

    test('loadAllSavedCharts should return array with chart when data is negative', () => {
        const chartData = [{ x: -1, y: -10 }, { x: -2, y: -20 }, { x: -3, y: -30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });

    test('loadAllSavedCharts should return array with chart when data is invalid', () => {
        const chartData = [{ x: 'Invalid', y: 'Invalid' }, { x: 'Invalid', y: 'Invalid' }, { x: 'Invalid', y: 'Invalid' }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });


    test('loadAllSavedCharts should return array with chart when data is null', () => {
        const chartData = [{ x: null, y: null }, { x: null, y: null }, { x: null, y: null }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });



});
