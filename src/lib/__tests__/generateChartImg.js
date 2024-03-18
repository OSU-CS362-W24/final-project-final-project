/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

require('whatwg-fetch')
const generateChartImg = require('../generateChartImg')


describe('generateChartImg Function Unit Testing', () => {

    // Valid line chart data returns a valid URL
    test('Valid line chart parameters returns a valid URL', async () => {
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
    test('Valid scatter chart parameters returns a valid URL', async () => {
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
    test('Valid bar chart parameters returns a valid URL', async () => {
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


})