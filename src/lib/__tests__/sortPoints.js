const sortPoints = require('../sortPoints')

describe('sortPoints Function Unit Testing', () => {

    // Sorts unsorted array by ascending X value with the same Y values
    test('Sorts an unsorted array of points by ascending X value with same Y values', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5, y: 15 }, { x: 1, y: 15 }, { x: 7, y: 15 }, { x: 2, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }])

    })


    // Sorts unsorted array by ascending X value with different Y values 
            //- just to make sure Y values are not affecting
    test('Sorts an unsorted array of points by ascending X value with different Y values', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5, y: 17 }, { x: 1, y: 11 }, { x: 7, y: 12 }, { x: 2, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: 1, y: 11 }, { x: 2, y: 15 }, { x: 5, y: 17 }, { x: 7, y: 12 }])

    })


    // Returns the same exact arrray since the passed in array is already sorted
    test('Returns the exact same array if array was already sorted', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 1, y: 15 }, { x: 10, y: 15 }, { x: 70, y: 15 }, { x: 200, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points the exact same
        expect(sortedPoints).toBe(points)
        expect(sortedPoints).toEqual([{ x: 1, y: 15 }, { x: 10, y: 15 }, { x: 70, y: 15 }, { x: 200, y: 15 }])

    })


    // Empty array is returned if passed rather than returning an error
    test('Empty array is returned if passed rather than returning an error', () => {

        // Arrange - unsorted array of points
        const points = []

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the empyt array is returned
        expect(sortedPoints).toEqual([])
        expect(sortedPoints).toBe(points)

    })


    // Single element array is returned unchanged
    test('Single element array is returned unchanged', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the single element arrya is returned
        expect(sortedPoints).toEqual([{ x: 5, y: 15 }])
        expect(sortedPoints).toBe(points)

    })


    // Two identical X values array is returned unchanged
    test('Two identical X values array is returned unchanged', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5, y: 18 }, { x: 5, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the two identical X values arrai is returend
        expect(sortedPoints).toEqual([{ x: 5, y: 18 }, { x: 5, y: 15 }])
        expect(sortedPoints).toBe(points)

    })


    // Sorts unsorted array with negative X values and the same Y values
    test('Sorts unsorted array with negtive X values and the same Y values', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -5, y: 15 }, { x: -1, y: 15 }, { x: -7, y: 15 }, { x: -2, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -7, y: 15 }, { x: -5, y: 15 }, { x: -2, y: 15 }, { x: -1, y: 15 }])

    })


    // Sorts unsorted array with negative X values and different Y values
    test('Sorts unsorted array with negtive X values and different Y values', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -5, y: 17 }, { x: -1, y: 13 }, { x: -7, y: 188 }, { x: -2, y: 12 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -7, y: 188 }, { x: -5, y: 17 }, { x: -2, y: 12 }, { x: -1, y: 13 }])

    })



    // Returns teh same negative array if already sorted
    test('Returns the same negative array if already sorted', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -7, y: 15 }, { x: -5, y: 15 }, { x: -2, y: 15 }, { x: -1, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the same array is passed
        expect(sortedPoints).toBe(points)
        expect(sortedPoints).toEqual([{ x: -7, y: 15 }, { x: -5, y: 15 }, { x: -2, y: 15 }, { x: -1, y: 15 }])

    })


    // One single negative value gets returned if passed
    test('One single negative value gets reuturned if passed', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -7, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the same array is passed
        expect(sortedPoints).toBe(points)
        expect(sortedPoints).toEqual([{ x: -7, y: 15 }])

    })


    // Two identical negative X values gets returned as the same if passed
    test('Two identical negative X values gets returned as the same if passed', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -7, y: 17 }, { x: -7, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that teh same array is passed
        expect(sortedPoints).toBe(points)
        expect(sortedPoints).toEqual([{ x: -7, y: 17 }, { x: -7, y: 15 }])

    })


    // Negative and Positive X values gets sorted correctly
    test('Negative and Positive X values gets sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -5, y: 15 }, { x: 1, y: 15 }, { x: 7, y: 15 }, { x: -2, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -5, y: 15 }, { x: -2, y: 15 }, { x: 1, y: 15 }, { x: 7, y: 15 }])

    })


    // X and Y values can be a mix of positive and negative values and can still be sorted correctly
    test('X and Y values can be a mix of positive and negative values and can still be sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: -5, y: 15 }, { x: 1, y: -15 }, { x: 7, y: -15 }, { x: -2, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -5, y: 15 }, { x: -2, y: 15 }, { x: 1, y: -15 }, { x: 7, y: -15 }])

    })


    // Large integer X values can be sorted correctly
    test('Large integer values can be sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 50293023, y: 15 }, { x: 124095820, y: 15 }, { x: -13249781937, y: 15 }, { x: 2103948123123, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -13249781937, y: 15 }, { x: 50293023, y: 15 }, { x: 124095820, y: 15 }, { x: 2103948123123, y: 15 }])

    })


    // Floating point number X values get sorted correctly
    test('Floating point number X values get sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5.5, y: 15 }, { x: 1.01, y: 15 }, { x: -2.90032, y: 15 }, { x: 7.0000000001, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -2.90032, y: 15 }, { x: 1.01, y: 15 }, { x: 5.5, y: 15 }, { x: 7.0000000001, y: 15 }])

    })


    // Points in Descending Order are sorted correctly
    test('Points in Descending Order are sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 5, y: 15 }, { x: 4, y: 15 }, { x: 2, y: 15 }, { x: 1, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 4, y: 15 }, { x: 5, y: 15 }])

    })


    // Duplicate X float values within a larger array gets sorted correctly
    test('Duplicate X float values within a larger array gets sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 1.01, y: 17 }, { x: 1.01, y: 15 }, { x: -2, y: 15 }, { x: 7.0000000001, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -2, y: 15 }, { x: 1.01, y: 17 }, { x: 1.01, y: 15 }, { x: 7.0000000001, y: 15 }])

    })


    // Duplicate X integer values within a larger array gets sorted correctly
    test('Duplicate X integer values within a larger array gets sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [{ x: 1, y: 17 }, { x: 1, y: 15 }, { x: -2, y: 15 }, { x: 7.0000000001, y: 15 }]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([{ x: -2, y: 15 }, { x: 1, y: 17 }, { x: 1, y: 15 }, { x: 7.0000000001, y: 15 }])

    })


    // Size 25 array is sorted correctly
    test('Size 25 array is sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [
            { x: 5, y: 1 },   { x: 3, y: 10 },
            { x: 2, y: 4 },   { x: 9, y: 1 },
            { x: 21, y: 13 }, { x: 7, y: 16 },
            { x: 4, y: 12 },  { x: 18, y: 19 },
            { x: 14, y: 13 }, { x: 24, y: 6 },
            { x: 25, y: 18 }, { x: 17, y: 17 },
            { x: 13, y: 19 }, { x: 16, y: 2 },
            { x: 6, y: 1 },   { x: 12, y: 5 },
            { x: 8, y: 7 },   { x: 11, y: 3 },
            { x: 22, y: 9 },  { x: 15, y: 3 },
            { x: 19, y: 16 }, { x: 20, y: 12 },
            { x: 10, y: 1 },  { x: 23, y: 19 },
            { x: 1, y: 8 }
          ]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([
            { x: 1, y: 8 },   { x: 2, y: 4 },
            { x: 3, y: 10 },  { x: 4, y: 12 },
            { x: 5, y: 1 },   { x: 6, y: 1 },
            { x: 7, y: 16 },  { x: 8, y: 7 },
            { x: 9, y: 1 },   { x: 10, y: 1 },
            { x: 11, y: 3 },  { x: 12, y: 5 },
            { x: 13, y: 19 }, { x: 14, y: 13 },
            { x: 15, y: 3 },  { x: 16, y: 2 },
            { x: 17, y: 17 }, { x: 18, y: 19 },
            { x: 19, y: 16 }, { x: 20, y: 12 },
            { x: 21, y: 13 }, { x: 22, y: 9 },
            { x: 23, y: 19 }, { x: 24, y: 6 },
            { x: 25, y: 18 }
          ])

    })


    // Size 50 array is sorted correctly
    test('Size 50 array is sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [
            { x: 26, y: 12 }, { x: 29, y: 7 },  { x: 27, y: 6 },
            { x: 24, y: 5 },  { x: 19, y: 8 },  { x: 5, y: 3 },
            { x: 35, y: 4 },  { x: 30, y: 8 },  { x: 11, y: 16 },
            { x: 20, y: 16 }, { x: 16, y: 13 }, { x: 34, y: 11 },
            { x: 41, y: 15 }, { x: 9, y: 11 },  { x: 28, y: 18 },
            { x: 2, y: 16 },  { x: 4, y: 13 },  { x: 46, y: 9 },
            { x: 3, y: 9 },   { x: 38, y: 11 }, { x: 17, y: 12 },
            { x: 22, y: 16 }, { x: 7, y: 1 },   { x: 47, y: 7 },
            { x: 43, y: 19 }, { x: 12, y: 15 }, { x: 33, y: 18 },
            { x: 18, y: 16 }, { x: 6, y: 11 },  { x: 45, y: 3 },
            { x: 8, y: 2 },   { x: 42, y: 12 }, { x: 10, y: 15 },
            { x: 37, y: 15 }, { x: 25, y: 5 },  { x: 48, y: 18 },
            { x: 40, y: 16 }, { x: 50, y: 4 },  { x: 32, y: 2 },
            { x: 31, y: 9 },  { x: 21, y: 17 }, { x: 39, y: 13 },
            { x: 36, y: 14 }, { x: 1, y: 6 },   { x: 13, y: 3 },
            { x: 49, y: 15 }, { x: 23, y: 13 }, { x: 44, y: 3 },
            { x: 14, y: 9 },  { x: 15, y: 10 }
          ]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([
            { x: 1, y: 6 },   { x: 2, y: 16 },  { x: 3, y: 9 },
            { x: 4, y: 13 },  { x: 5, y: 3 },   { x: 6, y: 11 },
            { x: 7, y: 1 },   { x: 8, y: 2 },   { x: 9, y: 11 },
            { x: 10, y: 15 }, { x: 11, y: 16 }, { x: 12, y: 15 },
            { x: 13, y: 3 },  { x: 14, y: 9 },  { x: 15, y: 10 },
            { x: 16, y: 13 }, { x: 17, y: 12 }, { x: 18, y: 16 },
            { x: 19, y: 8 },  { x: 20, y: 16 }, { x: 21, y: 17 },
            { x: 22, y: 16 }, { x: 23, y: 13 }, { x: 24, y: 5 },
            { x: 25, y: 5 },  { x: 26, y: 12 }, { x: 27, y: 6 },
            { x: 28, y: 18 }, { x: 29, y: 7 },  { x: 30, y: 8 },
            { x: 31, y: 9 },  { x: 32, y: 2 },  { x: 33, y: 18 },
            { x: 34, y: 11 }, { x: 35, y: 4 },  { x: 36, y: 14 },
            { x: 37, y: 15 }, { x: 38, y: 11 }, { x: 39, y: 13 },
            { x: 40, y: 16 }, { x: 41, y: 15 }, { x: 42, y: 12 },
            { x: 43, y: 19 }, { x: 44, y: 3 },  { x: 45, y: 3 },
            { x: 46, y: 9 },  { x: 47, y: 7 },  { x: 48, y: 18 },
            { x: 49, y: 15 }, { x: 50, y: 4 }
          ])

    })


    // Repeating X values scattered in large array is sorted correctly
    test('Repeating X values scattered in large array is sorted correctly', () => {

        // Arrange - unsorted array of points
        const points = [
            { x: 5, y: 1 },   { x: 3, y: 10 },
            { x: 2, y: 4 },   { x: 9, y: 1 },
            { x: 21, y: 13 }, { x: 7, y: 16 },
            { x: 4, y: 12 },  { x: 18, y: 19 },
            { x: 14, y: 13 }, { x: 24, y: 6 },
            { x: 25, y: 3 }, { x: 17, y: 17 },
            { x: 25, y: 2 }, { x: 16, y: 2 },
            { x: 25, y: 1 },   { x: 12, y: 1 },
            { x: 8, y: 7 },   { x: 12, y: 2 },
            { x: 22, y: 9 },  { x: 12, y: 3 },
            { x: 25, y: 0 }, { x: 20, y: 12 },
            { x: 10, y: 1 },  { x: 23, y: 19 },
            { x: 1, y: 8 }
          ]

        // Act - use sortPoints to sort
        const sortedPoints = sortPoints(points)

        // Assert - verify that the points are truly sorted
        expect(sortedPoints).toEqual([
            { x: 1, y: 8 }, { x: 2, y: 4 }, { x: 3, y: 10 }, { x: 4, y: 12 },
            { x: 5, y: 1 }, { x: 7, y: 16 }, { x: 8, y: 7 }, { x: 9, y: 1 },
            { x: 10, y: 1 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 12, y: 3 },
            { x: 14, y: 13 }, { x: 16, y: 2 }, { x: 17, y: 17 }, { x: 18, y: 19 },
            { x: 20, y: 12 }, { x: 21, y: 13 }, { x: 22, y: 9 }, { x: 23, y: 19 },
            { x: 24, y: 6 }, { x: 25, y: 3 }, { x: 25, y: 2 }, { x: 25, y: 1 },
            { x: 25, y: 0 }
        ]
        )

    })

})