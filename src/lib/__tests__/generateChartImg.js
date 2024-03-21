/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

require('whatwg-fetch')
const generateChartImg = require('../generateChartImg')


describe('generateChartImg Function Unit Testing', () => {

    // Valid line chart data returns a valid URL
    test('Valid line chart parameters returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })

    // Valid scatter chart data returns a valid URL
    test('Valid scatter chart parameters returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'scatter'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Valid bar chart data returns a valid URL
    test('Valid bar chart parameters returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'bar'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Bar Chart - Optional title parameter ommitted returns a valid URL
    test('Bar Chart optional title parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'bar'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, null, color)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Bar Chart - Optional color parameter ommitted returns a valid URL
    test('Bar chart optional color parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'bar'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, null)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Line Chart - Optional title parameter ommitted returns a valid URL
    test('Line Chart optional title parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, null, color)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Line Chart - Optional color parameter ommitted returns a valid URL
    test('Line chart optional color parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, null)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })
    
    
    // Scatter Chart - Optional title parameter ommitted returns a valid URL
    test('Scatter Chart optional title parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'scatter'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, null, color)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Scatter Chart - Optional color parameter ommitted returns a valid URL
    test('Scatter chart optional color parameter ommitted returns a valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'scatter'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, null)

        // Assert - Check if the generated URL is a string and valid blob URL
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // xLabel as an empty string returns valid blob URL
    test('xLabel as an empty string returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = ''
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
       

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })

    // yLabel as an empty string returns valid blob URL
    test('yLabel as an empty string returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = ''
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
       

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Negative values in data returns valid blob URL
    test('Negative values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: -7, y: 15 }, { x: -5, y: 15 }, { x: -2, y: -15 }, { x: 1, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
       

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Decimal values in data returns valid blob URL
    test('Decimal values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1.0002, y: 15 }, { x: 2.213123, y: 15.01 }, { x: 5, y: 15 }, { x: 7.999999, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
       

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })



    // Negative Decimal values in data returns valid blob URL
    test('Negative decimal values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: -7.5096023, y: 15.1 }, { x: -5.01, y: 15 }, { x: -2, y: -15 }, { x: 1.9999999, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
       

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Unsorted values in data returns valid blob URL
    test('Unsorted values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 2, y: 15 }, { x: 5, y: 15 }, { x: 1, y: 15 }, { x: 0, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Line Chart: 50 values in data returns valid blob URL
    test('Line Chart: 50 values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [
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
          ]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })



    // Bar Chart: 50 values in data returns valid blob URL
    test('Bar Chart: 50 values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'bar'
        const data = [
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
          ]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })



    // Scatter Chart: 50 values in data returns valid blob URL
    test('Scatter Chart: 50 values in data returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'scatter'
        const data = [
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
          ]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })


    // Color parameter takes a hex color and returns valid blob URL
    test('Color parameter takes a hex color and returns valid blob URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = '#3c8df9'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        // console.log(imgUrl)

        // Assert - Check if the generated URL is a string and valid blob URL 
        expect(typeof imgUrl).toBe('string')
        expect(imgUrl).toMatch(/^blob:/)

    })



})