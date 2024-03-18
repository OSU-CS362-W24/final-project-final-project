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


})