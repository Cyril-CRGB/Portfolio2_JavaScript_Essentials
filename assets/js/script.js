/**
 * This function will add Price CHF and Price EUR of all table and update 
 * the table in index.html with the result.
 */
function generateListOfProduct() {
    // Get references to the three tables
    var table1 = document.getElementById('table1');
    var table2 = document.getElementById('table2');
    var table3 = document.getElementById('table3');

    // Get the tbody element of the new table
    var newTableBody = document.getElementById('newTableBody');

    // Clear any existing rows in the new table
    newTableBody.innerHTML = '';

    // Loop through each row of table1
    for (var i = 1; i < table1.rows.length; i++) {
        // Create a new row for the new table
        var newRow = document.createElement('tr');

        // Get the cells from table1
        var table1Cells = table1.rows[i].cells;

        // Create cells in the new row and set their values
        for (var x = 0; x < 6; x++) {
            var newCell = document.createElement('td');
            newCell.textContent = table1Cells[x].textContent;
            newRow.appendChild(newCell);
        }

        // Calculate the sum of columns 7 and 8 from table1, table2, and table3
        var sumColumn7 = parseFloat(table1Cells[6].textContent) + parseFloat(table2.rows[i].cells[6].textContent) + parseFloat(table3.rows[i].cells[6].textContent);
        var sumColumn8 = parseFloat(table1Cells[7].textContent) + parseFloat(table2.rows[i].cells[7].textContent) + parseFloat(table3.rows[i].cells[7].textContent);

        // Create cells for the sum values and add them to the new row
        var sumCell7 = document.createElement('td');
        sumCell7.textContent = sumColumn7.toFixed(2);
        newRow.appendChild(sumCell7);

        var sumCell8 = document.createElement('td');
        sumCell8.textContent = sumColumn8.toFixed(2);
        newRow.appendChild(sumCell8);

        // Add the new row to the new table
        newTableBody.appendChild(newRow);
    }
}