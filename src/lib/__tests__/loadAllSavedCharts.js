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

    test('loadAllSavedCharts should return array with single saved chart', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chartData]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chartData]);
    });

    test('loadAllSavedCharts should return array with multiple saved charts', () => {
        const chart1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
        const chart2 = [{ x: 4, y: 40 }, { x: 5, y: 50 }, { x: 6, y: 60 }];
        window.localStorage.setItem("savedCharts", JSON.stringify([chart1, chart2]));
        const savedCharts = loadAllSavedCharts();
        expect(savedCharts).toEqual([chart1, chart2]);
    });


    test('loadAllSavedCharts should return the same result on multiple consecutive calls', () => {
        const chartData = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }];
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

});
