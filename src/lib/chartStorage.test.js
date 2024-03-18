//Need to:
// Go through and add assertions to ensure data matches, not just that data was added
// Add more failing tests. We cant really do "failing tests" with saveChart but see test at bottome to see what I mean
// Consolidate redundant functions. I split a lot of them into 3 but if it feels unnecessary let me know.



// Import the functions to test
const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
} = require('./chartStorage.js');

// Mock localStorage
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

    // Test saveChart function to ensure it correctly saves the charts
    
    test('saveChart should correctly save the charts', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Assert that the saved charts contain the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    

    // Test saveChart function with Line Plot
    test('saveChart should store/append line plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with Scatter plot
    test('saveChart should store/append scatter plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 2, y: 5 },
            { x: 3, y: 8 },
            { x: 5, y: 12 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with Bar plot
    test('saveChart should store/append bar plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 30 },
            { x: 'Category B', y: 45 },
            { x: 'Category C', y: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    test('saveChart should store/append identical data', () => {
        // Mock data
        const existingData = [{ x: 0, y: 5 }];
        // Save existing data
        saveChart(existingData);
    
        const newData = [{ x: 0, y: 5 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData);
    
        // Load the saved data
        const savedData = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        // Assert that the data was overwritten
        expect(savedData[1]).toEqual([{ x: 0, y: 5 }]); 
        expect(savedData.length).toBe(2); // Ensure the length remains the same
    });

    // Test saveChart function with small line plot
    test('saveChart should store small line plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with small scatter plot
    test('saveChart should store small scatter plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 2, y: 5 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with small bar plot
    test('saveChart should store small bar plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 30 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with large line plot
    test('saveChart should store large line plot data in localStorage', () => {
        // Mock data
        const linePlotData = [];
        for (let i = 0; i < 1000; i++) {
            linePlotData.push({ x: i, y: Math.random() * 100 });
        }

        // Call the function
        saveChart(linePlotData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with large scatter plot
    test('saveChart should store large scatter plot data in localStorage', () => {
        // Mock data
        const scatterPlotData = [];
        for (let i = 0; i < 1000; i++) {
            scatterPlotData.push({ x: Math.random() * 100, y: Math.random() * 100 });
        }

        // Call the function
        saveChart(scatterPlotData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with large bar plot
    test('saveChart should store large bar plot data in localStorage', () => {
        // Mock data
        const barPlotData = [];
        const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
        for (const category of categories) {
            barPlotData.push({ x: category, y: Math.random() * 100 });
        }

        // Call the function
        saveChart(barPlotData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });


  

    // Test saveChart function with mixed graph type inputs
    test('saveChart function with mixed graph type inputs', () => {
        // Mock data
        const chartData = [
            { x: 25, y: 25 },
            { x: 2, y: 15 },
            { x:'Category C', y: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with Line Plot
    test('saveChart function for line plot with mixed x and y inputs', () => {
        // Mock data
        const chartData = [
            { y: 10, x: 1 },
            { x: 2, y: 15 },
            { y: 20, x: 3 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with scatter Plot
     test('saveChart function for scatter plot with mixed x and y inputs', () => {
        // Mock data
        const chartData = [
            { x: 2, y: 5 },
            { x: 3, y: 8 },
            { x: 5, y: 12 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with bar plot
    test('saveChart function for bar graph with mixed x and y inputs', () => {
        // Mock data
        const chartData = [
            { y: 'Category A', x: 30 },
            { x: 'Category B', y: 45 },
            { y: 'Category C', x: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the correctness of the stored data
    });

    // Test saveChart function with empty data
    test('saveChart should handle empty data gracefully', () => {
        // Mock data
        const chartData = [];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the behavior with empty data
    });

    // Test saveChart function with invalid data
    test('saveChart should handle invalid data gracefully', () => {
        // Mock data
        const chartData = [
            { x: 1, y: '' },
            { x: '', y: 15 },
            { x: 3, y: '' }
        ];

        // Call the function
        saveChart(chartData);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the behavior with invalid data
    });

    // Test saveChart function with out-of-bound index
    test('saveChart should handle out-of-bound index gracefully', () => {
        // Mock data
        const chartData = [];

        // Call the function with an out-of-bound index
        saveChart(chartData, -1);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the behavior with out-of-bound index
    });

    // Test saveChart function with null index
    test('saveChart should handle null index gracefully', () => {
        // Mock data
        const chartData = [];

        // Call the function with a null index
        saveChart(chartData, null);

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the behavior with null index
    });

    // Test saveChart function with invalid index
    test('saveChart should handle invalid index gracefully', () => {
        // Mock data
        const chartData = [];

        // Call the function with an invalid index
        saveChart(chartData, "Invalid Index");

        // Check if data is stored in localStorage
        expect(localStorage.getItem('savedCharts')).toBeTruthy();
        // Additional assertions can be added to verify the behavior with invalid index
    });

    test('saveChart should overwrite existing line data when index is specified', () => {
        // Mock data
        const existingData = [{ x: 0, y: 5 }, { x: 1, y: 6 }, { x: 2, y: 7 }];
        // Save existing data
        saveChart(existingData, 0);
    
        const newData = [{ x: 3, y: 8 }, { x: 4, y: 9 }, { x: 5, y: 10 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);
    
        // Load the saved data
        const savedData = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        // Assert that the data was overwritten
        expect(savedData).toEqual([[{ x: 3, y: 8 }, { x: 4, y: 9 }, { x: 5, y: 10 }]]); 
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });


    test('saveChart should overwrite existing scatter data when index is specified', () => {
        // Mock data
        const existingData = [{ x: 0, y: 5 }, { x: 10, y: 6 }, { x: 5, y: 7 }];
        // Save existing data
        saveChart(existingData, 0);
    
        const newData = [{ x: 2, y: 25 }, { x: 3, y: 13 }, { x: 4, y: 2 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);
    
        // Load the saved data
        const savedData = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        // Assert that the data was overwritten
        expect(savedData).toEqual([[{ x: 2, y: 25 }, { x: 3, y: 13 }, { x: 4, y: 2 }]]); 
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });


    test('saveChart should overwrite existing bar data when index is specified', () => {
        // Mock data
        const existingData = [{ x: "Column C", y: 5 }, {x: "Column B", y: 6 }, { x: "Column A", y: 7 }];
        // Save existing data
        saveChart(existingData, 0);
    
        const newData = [{ x: "Column A", y: 15 }, { x: "Column B", y: 16 }, { x: "Column C", y: 17 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);
    
        // Load the saved data
        const savedData = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        // Assert that the data was overwritten
        expect(savedData).toEqual([[{ x: "Column A", y: 15 }, { x: "Column B", y: 16 }, { x: "Column C", y: 17 }]]); 
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });


    test('saveChart should handle invalid data types gracefully', () => {
        // Mock invalid data (e.g., string instead of array)
        const invalidData = 'invalid';
        
        // Call the function with invalid data
        saveChart(invalidData);
    
        // Load the saved data
        const savedData = JSON.parse(window.localStorage.getItem('savedCharts'));
    
        // Check if data is stored gracefully (might depend on the specific implementation)
        expect(savedData).toEqual(["invalid"]); // For example, expect null if invalid data is not saved
    });


  
    
    
    



   
});
