/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

require('whatwg-fetch')
const generateChartImg = require('../generateChartImg')


describe('generateChartImg Function Unit Testing', () => {

    // Valid line chart data returns a valid URL
    test('Valid line chart data returns a valid URL', async () => {
        // Arrange - set up all the paramters to be passed in
        const type = 'line'
        const data = [{ x: 1, y: 15 }, { x: 2, y: 15 }, { x: 5, y: 15 }, { x: 7, y: 15 }]
        const xLabel = 'X axis'
        const yLabel = 'Y axis'
        const title = 'Title of Chart'
        const color = 'red'

        // Act - generate the image AKA image URL
        const imgUrl = await generateChartImg(type, data, xLabel, yLabel, title, color)
        console.log(imgUrl)

        // Assert - Check if the generated URL is a blob URL
        expect(imgUrl).toMatch(/^blob:/)

    })


    

})