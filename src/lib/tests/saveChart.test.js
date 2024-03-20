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

    test('saveChart should store/append small line plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append large line plot data in localStorage', () => {
        // Mock data
        const chartData = [];
        for (let i = 0; i < 1000; i++) {
            chartData.push({ x: i, y: i * 100 });
        }

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with small values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with large values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 100000, y: 100000 },
            { x: 200000, y: 200000 },
            { x: 300000, y: 300000 }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    
    test('saveChart should store/append line plot data with swapped x and y in localStorage', () => {
        // Mock data
        const chartData = [
            { y: 1, x: 10 },
            { y: 2, x: 15 },
            { y: 3, x: 20 }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with valid and null values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: null },
            { x: null, y: 20 },
            { x: 3, y: null }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with valid and invalid values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 'invalid' },
            { x: 'invalid', y: 20 },
            { x: 3, y: 'invalid' }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append identical line plot data in localStorage', () => {
        // Mock identical data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function to save the data twice
        saveChart(chartData);
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if two charts were saved
        expect(savedCharts.length).toBe(2);

        // Check if both saved charts match the expected chart data
        expect(savedCharts[0]).toEqual(chartData);
        expect(savedCharts[1]).toEqual(chartData);
    });

    test('saveChart should overwrite existing scatter line data when index is specified in localStorage', () => {
        // Mock data
        const existingData = [{ x: 0, y: 50 }, { x: 1, y: 60 }, { x: 2, y: 70 }];
        // Save existing data
        saveChart(existingData, 0);

        const newData = [{ x: 3, y: 80 }, { x: 4, y: 90 }, { x: 5, y: 10 }];

        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);

        // Load the saved data
        const savedData = loadAllSavedCharts();

        // Assert that the data was overwritten
        expect(savedData).toEqual([newData]); // Check if the saved data matches the new data
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });

    test('saveChart should repeatedly overwrite existing line data when index is specified in localStorage', () => {
        // Mock data for initial save
        const initialData = [{ x: 0, y: 50 }, { x: 1, y: 60 }, { x: 2, y: 70 }];
        // Save initial data
        saveChart(initialData, 0);

        // Mock data for subsequent saves
        const newData1 = [{ x: 3, y: 80 }, { x: 4, y: 90 }, { x: 5, y: 100 }];
        const newData2 = [{ x: 6, y: 110 }, { x: 7, y: 120 }, { x: 8, y: 130 }];

        // Call the function to overwrite existing data multiple times
        saveChart(newData1, 0); // Overwrite with newData1
        saveChart(newData2, 0); // Overwrite with newData2

        // Load the saved data
        const savedData = loadAllSavedCharts();

        // Assert that the data was overwritten correctly
        expect(savedData).toEqual([newData2]); // Only the latest data should be saved
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });

    test('saveChart should store/append line plot data with negative index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData, -1);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with small index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function with a small index
        saveChart(chartData, 0);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with large index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData, 100000000000000);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append line plot data with null index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData, null);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });


    test('saveChart should store/append line plot data with invalid index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        // Call the function
        saveChart(chartData, 'invalid');

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    
    test('saveChart should store/append multiple consecutive saves in local Storage', () => {
        // Mock data for a single chart
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 15 },
            { x: 3, y: 20 }
        ];

        const numSaves = 1000; // Number of consecutive saves to perform

        // Perform multiple consecutive saves
        for (let i = 0; i < numSaves; i++) {
            saveChart(chartData);
        }

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if the correct number of charts were saved
        expect(savedCharts.length).toBe(numSaves);

        // Check if each saved chart matches the expected chart data
        for (let i = 0; i < numSaves; i++) {
            expect(savedCharts[i]).toEqual(chartData);
        }
    });

    /************************************************************************************************/

    test('saveChart should store/append small scatter plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 10 },
            { x: 2, y: 50}
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append large scatter plot data in localStorage', () => {
        // Mock data
        const chartData = [];
        for (let i = 0; i < 1000; i++) {
            chartData.push({ x: i, y: Math.random() * 100 });
        }
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with small values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 3, y: 8 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with large values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 100000, y: 170000 },
            { x: 200000, y: 300000 },
            { x: 300000, y: 800000 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with swapped x and y in localStorage', () => {
        // Mock data
        const chartData = [
            { y: 1, x: 100 },
            { y: 2, x: 15 },
            { y: 3, x: 200 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with valid and null values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: null },
            { x: null, y: 56 },
            { x: 3, y: null }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with valid and invalid values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 'invalid' },
            { x: 'invalid', y: 56 },
            { x: 3, y: 'invalid' }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append identical scatter plot data in localStorage', () => {
        // Mock identical data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function to save the data twice
        saveChart(chartData);
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if two charts were saved
        expect(savedCharts.length).toBe(2);
    
        // Check if both saved charts match the expected chart data
        expect(savedCharts[0]).toEqual(chartData);
        expect(savedCharts[1]).toEqual(chartData);
    });
    
    test('saveChart should overwrite existing scatter plot data when index is specified in localStorage', () => {
        // Mock data
        const existingData = [{ x: 0, y: 100 }, { x: 1, y: 150 }, { x: 2, y: 200 }];
        // Save existing data
        saveChart(existingData, 0);
    
        const newData = [{ x: 3, y: 50 }, { x: 4, y: 0 }, { x: 5, y: 200 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);
    
        // Load the saved data
        const savedData = loadAllSavedCharts();
    
        // Assert that the data was overwritten
        expect(savedData).toEqual([newData]); // Check if the saved data matches the new data
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });
    
    test('saveChart should repeatedly overwrite existing scatter data when index is specified in localStorage', () => {
        // Mock data for initial save
        const initialData = [{ x: 0, y: 1 }, { x: 1, y: 15 }, { x: 2, y: 2 }];
        // Save initial data
        saveChart(initialData, 0);
    
        // Mock data for subsequent saves
        const newData1 = [{ x: 3, y: 50 }, { x: 4, y: 0 }, { x: 5, y: 200 }];
        const newData2 = [{ x: 6, y: 10 }, { x: 7, y: 20 }, { x: 8, y: 130 }];
    
        // Call the function to overwrite existing data multiple times
        saveChart(newData1, 0); // Overwrite with newData1
        saveChart(newData2, 0); // Overwrite with newData2
    
        // Load the saved data
        const savedData = loadAllSavedCharts();
    
        // Assert that the data was overwritten correctly
        expect(savedData).toEqual([newData2]); // Only the latest data should be saved
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });
    
    test('saveChart should store/append scatter plot data with negative index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function
        saveChart(chartData, -1);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with small index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function with a small index
        saveChart(chartData, 0);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with large index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function
        saveChart(chartData, 100000000000000);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append scatter plot data with null index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function
        saveChart(chartData, null);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    
    test('saveChart should store/append scatter plot data with invalid index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        // Call the function
        saveChart(chartData, 'invalid');
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append multiple consecutive saves in local Storage', () => {
        // Mock data for a single chart
        const chartData = [
            { x: 1, y: 100 },
            { x: 2, y: 15 },
            { x: 3, y: 200 }
        ];
    
        const numSaves = 1000; // Number of consecutive saves to perform
    
        // Perform multiple consecutive saves
        for (let i = 0; i < numSaves; i++) {
            saveChart(chartData);
        }
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if the correct number of charts were saved
        expect(savedCharts.length).toBe(numSaves);
    
        // Check if each saved chart matches the expected chart data
        for (let i = 0; i < numSaves; i++) {
            expect(savedCharts[i]).toEqual(chartData);
        }
    });
    
    /************************************************************************************************/

    test('saveChart should store/append small bar plot data in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 1 },
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append large bar plot data in localStorage', () => {
        // Mock data
        const barData = [];
        for (let i = 0; i < 1000; i++) {
            barData.push({ category: `Category ${i}`, value: Math.random() * 100 });
        }
    
        // Call the function
        saveChart(barData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(barData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with small values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 1 },
            { x: 'Category B', y: 2 },
            { x: 'Category C', y: 8 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with large values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 170000 },
            { x: 'Category B', y: 300000 },
            { x: 'Category C', y: 800000 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with swapped x and y in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with valid and null values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: null },
            { x: null, y: 56 },
            { x: 3, y: null }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with valid and invalid values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 1, y: 'invalid' },
            { x: 'invalid', y: 56 },
            { x: 3, y: 'invalid' }
        ];
    
        // Call the function
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append identical bar plot data in localStorage', () => {
        // Mock identical data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function to save the data twice
        saveChart(chartData);
        saveChart(chartData);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if two charts were saved
        expect(savedCharts.length).toBe(2);
    
        // Check if both saved charts match the expected chart data
        expect(savedCharts[0]).toEqual(chartData);
        expect(savedCharts[1]).toEqual(chartData);
    });
    
    test('saveChart should overwrite existing bar plot data when index is specified in localStorage', () => {
        // Mock data
        const existingData = [{ x: 'Category A', y: 10 },
        { x: 'Category B', y: 20 },
        { x: 'Category C', y: 80 }];
        // Save existing data
        saveChart(existingData, 0);
    
        const newData = [{ x: 'Category A', y: 100 },
        { x: 'Category B', y: 200 },
        { x: 'Category C', y: 800 }];
    
        // Call the function to overwrite existing data at index 1
        saveChart(newData, 0);
    
        // Load the saved data
        const savedData = loadAllSavedCharts();
    
        // Assert that the data was overwritten
        expect(savedData).toEqual([newData]); // Check if the saved data matches the new data
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });
    
    test('saveChart should repeatedly overwrite existing bar data when index is specified in localStorage', () => {
        // Mock data for initial save
        const initialData = [{ x: 'Category A', y: 10 },
        { x: 'Category B', y: 20 },
        { x: 'Category C', y: 80 }];
        // Save initial data
        saveChart(initialData, 0);
    
        // Mock data for subsequent saves
        const newData1 = [{ x: 'Category A', y: 110 },
        { x: 'Category B', y: 210 },
        { x: 'Category C', y: 810 }];
        const newData2 = [{ x: 'Category A', y: 210 },
        { x: 'Category B', y: 220 },
        { x: 'Category C', y: 280 }];
    
        // Call the function to overwrite existing data multiple times
        saveChart(newData1, 0); // Overwrite with newData1
        saveChart(newData2, 0); // Overwrite with newData2
    
        // Load the saved data
        const savedData = loadAllSavedCharts();
    
        // Assert that the data was overwritten correctly
        expect(savedData).toEqual([newData2]); // Only the latest data should be saved
        expect(savedData.length).toBe(1); // Ensure the length remains the same
    });
    
    test('saveChart should store/append bar plot data with negative index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function
        saveChart(chartData, -1);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with small index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function with a small index
        saveChart(chartData, 0);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with large index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function
        saveChart(chartData, 100000000000000);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with null index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function
        saveChart(chartData, null);
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append bar plot data with invalid index in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        // Call the function
        saveChart(chartData, 'invalid');
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });
    
    test('saveChart should store/append multiple consecutive saves in local Storage', () => {
        // Mock data for a single chart
        const chartData = [
            { x: 'Category A', y: 10 },
            { x: 'Category B', y: 20 },
            { x: 'Category C', y: 80 }
        ];
    
        const numSaves = 1000; // Number of consecutive saves to perform
    
        // Perform multiple consecutive saves
        for (let i = 0; i < numSaves; i++) {
            saveChart(chartData);
        }
    
        // Load the saved charts
        const savedCharts = loadAllSavedCharts();
    
        // Check if the correct number of charts were saved
        expect(savedCharts.length).toBe(numSaves);
    
        // Check if each saved chart matches the expected chart data
        for (let i = 0; i < numSaves; i++) {
            expect(savedCharts[i]).toEqual(chartData);
        }
    });
    
    /************************************************************************************************/

    test('saveChart should store/append data with mixed valid input types in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 25, y: 25 },
            { x: 2, y: 15 },
            { x: 'Category C', y: 20 }
        ];

        // Call the function
        saveChart(chartData);

        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append data with all null values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: null, y: null },
            { x: null, y: null },
            { x: null, y: null }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

    test('saveChart should store/append data with all invalid values in localStorage', () => {
        // Mock data
        const chartData = [
            { x: 'invalid', y: 'invalid' },
            { x: 'invalid', y: 'invalid' },
            { x: 'invalid', y: 'invalid' }
        ];

        // Call the function
        saveChart(chartData);

        // Load the saved charts
        const savedCharts = loadAllSavedCharts();

        // Check if data is stored in localStorage and matches the expected chart data
        expect(savedCharts.length).toBe(1); // There should be one saved chart
        expect(savedCharts[0]).toEqual(chartData); // The saved chart should match the input chart data
    });

});
