// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // to generate the list of Product
    // Get the button element 
    let generateButton = document.getElementById('generateButton');
    // Add click event listener to the button
    generateButton.addEventListener('click', generateListOfProduct);

    // to export in excel the list of Product
    // Get the button element 
    let generateButtonExcel = document.getElementById('generateButtonExcel');
    // Add click event listener to the button
    generateButtonExcel.addEventListener('click', generateExcel);

    //Edit blue colored cells
    //Get the cells
    let blueCells = document.getElementsByClassName("textInBlue");
    //Add click event listener to the cells
    for (let i = 0; i < blueCells.length; i++) {
        blueCells[i].addEventListener('click', function () {
            //Replace the cell content with an input field
            let testValueCell = blueCells[i].innerHTML;
            let inputChange = document.createElement('input');
            inputChange.type = 'text';
            inputChange.value = this.textContent;
            this.textContent = '';
            this.appendChild(inputChange);
            //Focus the input field
            inputChange.focus();
            //Update the cell's content when the user finishes editing
            inputChange.addEventListener('blur', function () {
                this.parentNode.textContent = this.value;
                //Test if value has been modified and give message to update all tables
                if (testValueCell !== inputChange.value) {
                    alert('Clic on "Calculate rate" to update all tables!');
                } else {
                    return;
                }
            });

        });
    }
    //to recalculate Price CHF or Price EUR depending on the rate given
    //Get the submit button and rate input
    let calculateButtonX = document.getElementById('calculateButton');
    // Add click event listener to the button
    calculateButtonX.addEventListener('click', calculateRate);

});

/**
 * This function will add all Price CHF and all Price EUR of all table and update 
 * the new table on index.html with the result.
 */
function generateListOfProduct() {

    // Get references to the three tables
    let table1 = document.getElementsByClassName('table10');
    let table2 = document.getElementsByClassName('table200');
    let table3 = document.getElementsByClassName('table210');

    // Get the tbody element of the new table
    let newTableBody = document.getElementById('newTableBody');

    // Clear any existing rows in the new table
    newTableBody.innerHTML = '';

    // Loop through each row of table1
    for (let i = 0; i < 6; i++) {
        // Create a new row for the new table
        let newRow = document.createElement('tr');

        // Get the rows from table1
        let table1Cells = table1[0].children[i];

        // Loop through the first 6 columns of table1 and create cells in the new row and set their values to be identical
        for (let x = 0; x < 6; x++) {
            let newCell = document.createElement('td');
            newCell.textContent = table1Cells.children[x].innerHTML;
            newRow.appendChild(newCell);
        }

        // Calculate the sum of columns 7 (Price CHF) and 8 (Price EUR) from table1, table2, and table3
        let sumColumn7 = parseFloat(table1Cells.children[6].innerHTML) + parseFloat(table2[0].children[i].children[6].innerHTML) + parseFloat(table3[0].children[i].children[6].innerHTML);
        let sumColumn8 = parseFloat(table1Cells.children[7].innerHTML) + parseFloat(table2[0].children[i].children[7].innerHTML) + parseFloat(table3[0].children[i].children[7].innerHTML);

        // Create cells for the sum values and add them to the new row
        //Add sum of Prices in CHF
        let sumCell7 = document.createElement('td');
        sumCell7.textContent = sumColumn7.toFixed(2);
        newRow.appendChild(sumCell7);

        //Add sum of Prices EUR
        let sumCell8 = document.createElement('td');
        sumCell8.textContent = sumColumn8.toFixed(2);
        newRow.appendChild(sumCell8);

        // Add the new row to the new table
        newTableBody.appendChild(newRow);

        // update the content of the first column, which should notify that it is the addition of the prices of all zones
        newTableBody.children[i].children[0].innerHTML = `${table1Cells.children[0].innerHTML},${table2[0].children[i].children[0].innerHTML},${table3[0].children[i].children[0].innerHTML}`;
    }
}

/**
 * This function will allow the client to export the new table in excel
 */
function generateExcel() {
    //Create a new workbook
    let workbook = XLSX.utils.book_new();

    //Get the new table by its ID
    let excelTable = document.getElementById("newTable");

    // Check if the table is empty
    if (excelTable.children[1].innerHTML === '' || excelTable.rows.length === 0) {
        alert("The table is empty!");
        return;
    }

    //Create a worksheet
    let worksheet = XLSX.utils.aoa_to_sheet([]);

    // Loop through each row of excelTable and add data to the worksheet
    for (let i = 0; i < excelTable.rows.length; i++) {
        let rowData = [];
        let cells = excelTable.rows[i].cells;

        // Loop through each cell of the row and add its value to rowData
        for (let j = 0; j < cells.length; j++) {
            rowData.push(cells[j].textContent);
        }

        // Add the row data to the worksheet
        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: -1 });
    }

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, "output.xlsx");
}

/**
 * This function recalculate black numbers
 */
function calculateRate() {
    //Get the rate input
    let rateInput = document.getElementById('rate');
    //Test if rateInput is empty and give a standard value of 1.13
    rateInput.value === '' ? rateInput.value = 1.13 : rateInput.value;
    //Get the value entered in the rate input
    let rate = parseFloat(rateInput.value);
    // Get references to the three tables
    let table1 = document.getElementsByClassName('table10');
    let table2 = document.getElementsByClassName('table200');
    let table3 = document.getElementsByClassName('table210');
    //Update the 8th column (Price EURO) of table1
    for (let i = 0; i < 6; i++) {
        let priceCHF = parseFloat(table1[0].children[i].children[6].innerHTML);
        let priceEuro = Math.ceil(priceCHF / rate * 10) / 10;
        table1[0].children[i].children[7].innerHTML = priceEuro.toFixed(2);
        table1[0].children[i].children[7].style.color = 'orange';
    }
    //Update the 7th column (Price CHF) of table2 and 3
    for (let i = 0; i < 6; i++) {
        let priceEuroTable2 = parseFloat(table2[0].children[i].children[7].innerHTML);
        let priceChfTable2 = Math.ceil(priceEuroTable2 * rate * 10) / 10;
        table2[0].children[i].children[6].innerHTML = priceChfTable2.toFixed(2);
        table2[0].children[i].children[6].style.color = 'orange';

        let priceEuroTable3 = parseFloat(table3[0].children[i].children[7].innerHTML);
        let priceChfTable3 = Math.ceil(priceEuroTable3 * rate * 10) / 10;
        table3[0].children[i].children[6].innerHTML = priceChfTable3.toFixed(2);
        table3[0].children[i].children[6].style.color = 'orange';
    }
}