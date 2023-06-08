/**
 * This function will add Price CHF and Price EUR of all table and update 
 * the table in index.html with the result.
 */
function generateListOfProduct() {
    console.log('Button clicked');

    // Get references to the three tables
    let table1 = document.getElementsByClassName('table10');
    let table2 = document.getElementsByClassName('table200');
    let table3 = document.getElementsByClassName('table210');
    console.log(table1[0].children[1].textContent);

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
        console.log(table1Cells);
        // Loop through each column of table1 and create cells in the new row and set their values
        for (let x = 0; x < 6; x++) {
            let newCell = document.createElement('td');
            newCell.textContent = table1Cells.children[x].innerHTML;
            newRow.appendChild(newCell);
        }
        console.log(table1Cells.children[6].innerHTML);
        // Calculate the sum of columns 7 and 8 from table1, table2, and table3
        let sumColumn7 = parseFloat(table1Cells.children[6].innerHTML) + parseFloat(table2[0].children[i].children[6].innerHTML) + parseFloat(table3[0].children[i].children[6].innerHTML);
        let sumColumn8 = parseFloat(table1Cells.children[7].innerHTML) + parseFloat(table2[0].children[i].children[7].innerHTML) + parseFloat(table3[0].children[i].children[7].innerHTML);

        // Create cells for the sum values and add them to the new row
        let sumCell7 = document.createElement('td');
        sumCell7.textContent = sumColumn7.toFixed(2);
        newRow.appendChild(sumCell7);

        let sumCell8 = document.createElement('td');
        sumCell8.textContent = sumColumn8.toFixed(2);
        newRow.appendChild(sumCell8);

        // Add the new row to the new table
        newTableBody.appendChild(newRow);
    }
}


// Get the button element
let generateButton = document.getElementById('generateButton');

// Add click event listener to the button
generateButton.addEventListener('click', generateListOfProduct);
