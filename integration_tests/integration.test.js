/**
 * @jest-environment jsdom
 */
const fs = require("fs")

require("whatwg-fetch")
require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const path = require('path')

beforeEach(function() {
    document.documentElement.innerHTML = ''
    jest.resetModules()
    jest.restoreAllMocks()
    jest.clearAllMocks()
    document.getElementsByTagName('html')[0].innerHTML = ''
    window.localStorage.clear()
})

async function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
	console.log(jsPath)
	jest.isolateModules(function() {
		require(jsPath)
	})
}

test("Chart Builder recognizes when values are added to a chart", async function() {
    //Arrange:
    await initDomFromFiles(path.join(__dirname, '../src/line/line.html'), path.join(__dirname, '../src/line/line.js'))
    const user = userEvent.setup()

    //Acquire:
    const addValueButton = domTesting.getByRole(document, "button", {name: "+"})
    var xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[0], "1")
    await user.type(xyInputs[1], "2")
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[2], "3")
    await user.type(xyInputs[3], "4")
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[4], "5")
    await user.type(xyInputs[5], "6")
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Assert:
    expect(xyInputs).toHaveLength(12)
    expect(xyInputs[0]).toHaveValue(1)
    expect(xyInputs[1]).toHaveValue(2)
    expect(xyInputs[2]).toHaveValue(3)
    expect(xyInputs[3]).toHaveValue(4)
    expect(xyInputs[4]).toHaveValue(5)
    expect(xyInputs[5]).toHaveValue(6)
})

test("Chart Builder gives alert when missing data", async function() {
    //Arrange:
    await initDomFromFiles(path.join(__dirname, '../src/line/line.html'), path.join(__dirname, '../src/line/line.js'))
    const user = userEvent.setup()

    //Acquire:
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    const generateButton = domTesting.getByRole(document, "button", {name: /Generate chart/i})
    const xLabelInput = domTesting.getByLabelText(document, "X label");
    const yLabelInput = domTesting.getByLabelText(document, "Y label");

    //Act:
    await user.type(xLabelInput, "Cats");
    await user.type(yLabelInput, "Dogs");
    await user.click(generateButton);

    //Assert:
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy.mock.calls[0][0]).toBe("Error: No data specified!");

    //Clean:
    alertSpy.mockRestore();
});

test("Chart Builder gives alert when missing labels", async function() {
    //Arrange:
    await initDomFromFiles(path.join(__dirname, '../src/line/line.html'), path.join(__dirname, '../src/line/line.js'))
    const user = userEvent.setup()

    //Acquire:
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    const generateButton = domTesting.getByRole(document, "button", {name: /Generate chart/i})
    const addValueButton = domTesting.getByRole(document, "button", {name: "+"})
    var xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[0], "1")
    await user.type(xyInputs[1], "2")
    await user.type(xyInputs[2], "3")
    await user.type(xyInputs[3], "4")
    await user.type(xyInputs[4], "5")
    await user.type(xyInputs[5], "6")
    await user.type(xyInputs[6], "7")
    await user.type(xyInputs[7], "8")
    await user.type(xyInputs[6], "9")
    await user.type(xyInputs[7], "10")
    await user.click(generateButton)

    //Assert:
    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy.mock.calls[0][0]).toBe("Error: Must specify a label for both X and Y!");

    //Clean:
    alertSpy.mockRestore()
})

test("Chart Builder clears all fields correctly", async function () {
    // Arrange:
    await initDomFromFiles(path.join(__dirname, '../src/line/line.html'), path.join(__dirname, '../src/line/line.js'))
    const user = userEvent.setup()

    // Acquire:
    const titleField = domTesting.getByLabelText(document, "Chart title")
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    const xLabelInput = domTesting.getByLabelText(document, "X label")
    const yLabelInput = domTesting.getByLabelText(document, "Y label")
    const addValueButton = domTesting.getByRole(document, "button", { name: "+" })
    var xyInputs = domTesting.getAllByRole(document, "spinbutton")
    const clearButton = domTesting.getByRole(document, "button", { name: /Clear chart data/i })

    // Act:
    await user.type(titleField, "Cats vs Dogs")
    await user.click(chartColor)
    await user.type(chartColor, "{arrowdown}") // Decrease R
    await user.type(chartColor, "{arrowdown}") // Decrease G
    await user.type(chartColor, "{arrowdown}") // Decrease B
    await user.type(xLabelInput, "Cats")
    await user.type(yLabelInput, "Dogs")
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[0], "1")
    await user.type(xyInputs[1], "2")
    await user.type(xyInputs[2], "3")
    await user.type(xyInputs[3], "4")
    await user.type(xyInputs[4], "5")
    await user.type(xyInputs[5], "6")
    await user.type(xyInputs[6], "7")
    await user.type(xyInputs[7], "8")
    await user.type(xyInputs[8], "9")
    await user.type(xyInputs[9], "10")
    await user.click(clearButton)

    //Act:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    // Assert:
    expect(titleField).toHaveValue("")
    expect(chartColor).toHaveValue("#ff4500")
    expect(xLabelInput).toHaveValue("")
    expect(yLabelInput).toHaveValue("")
    expect(xyInputs.length).toBe(2)
})

test("generateChartImg receives all user inputs correctly", async function () {
    // Arrange:
    await initDomFromFiles(path.join(__dirname, '../src/line/line.html'), path.join(__dirname, '../src/line/line.js'))
    const user = userEvent.setup()
    const generateChartImg = require(path.join(__dirname, '../src/lib/generateChartImg.js'));

    // Acquire:
    const generateChartImgSpy = jest.spyOn(generateChartImg, 'generateChartImg');
    const titleField = domTesting.getByLabelText(document, "Chart title")
    const chartColor = domTesting.getByLabelText(document, "Chart color")
    const xLabelInput = domTesting.getByLabelText(document, "X label")
    const yLabelInput = domTesting.getByLabelText(document, "Y label")
    const addValueButton = domTesting.getByRole(document, "button", { name: "+" })
    var xyInputs = domTesting.getAllByRole(document, "spinbutton")
    const generateButton = domTesting.getByRole(document, "button", { name: /Generate chart/i })

    // Act:
    await user.type(titleField, "Cats vs Dogs")
    await user.click(chartColor)
    await user.type(chartColor, "{arrowdown}") // Decrease R
    await user.type(chartColor, "{arrowdown}") // Decrease G
    await user.type(chartColor, "{arrowdown}") // Decrease B
    await user.type(xLabelInput, "Cats")
    await user.type(yLabelInput, "Dogs")
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)
    await user.click(addValueButton)

    //Acquire:
    xyInputs = domTesting.getAllByRole(document, "spinbutton")

    //Act:
    await user.type(xyInputs[0], "1")
    await user.type(xyInputs[1], "2")
    await user.type(xyInputs[2], "3")
    await user.type(xyInputs[3], "4")
    await user.type(xyInputs[4], "5")
    await user.type(xyInputs[5], "6")
    await user.type(xyInputs[6], "7")
    await user.type(xyInputs[7], "8")
    await user.type(xyInputs[8], "9")
    await user.type(xyInputs[9], "10")
    await user.click(generateButton)

    // Assert: Check if generateChartImg was called with the correct arguments
    expect(generateChartImgSpy).toHaveBeenCalledTimes(1);
    expect(generateChartImgSpy).toHaveBeenCalledWith(
        "line",
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "Cats",
        "Dogs",
        "Cats vs Dogs",
        "#FC4503"
    );
});

