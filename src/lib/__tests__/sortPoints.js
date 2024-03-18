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

})