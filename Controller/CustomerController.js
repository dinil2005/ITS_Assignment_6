import {CustomerModel} from "../Model/CustomerModel.js";
import {customer_db} from "../db/db.js"



const LoadCustomerData = () =>{
    $('#customer_Table').empty();// Customer Table Clean
    customer_db.map((item,index) =>{
        var newRow = "<tr><th scope='row'>" + item.customer_Id + "</th><td>" + item.customer_Name + "</td><td>" + item.customer_Mail + "</td><td>" + item.customer_Address + "</td><td>" + item.customer_Gender + "</td></tr>";
        $("#customer_Table").append(newRow)
    })
}

// Save Customer
$("#custSaveBtn").on('click', () => {
    var customerId = $("#customerId").val();
    var customerName = $("#customer_name").val();
    var customerMail = $("#customer_mail").val();
    var customerAddress = $("#customer_Address").val();
    // Select the <select> element by its id
    const genderSelect = document.getElementById('customer_Gender');
    // Get the selected value
    const selectedValue = genderSelect.value;


    //Create Object
    // let customer_Details_Object = {
    //     customer_Id:customerId,
    //     customer_Name: customerName,
    //     customer_Mail: customerMail,
    //     customer_Address: customerAddress,
    //     customer_Gender: selectedValue
    // }

    //Constructor Through Data Send
    let customer_Details_Object = new CustomerModel(customerId,customerName,customerMail,customerAddress,selectedValue)


    //customer_db Array Push customer Details Object
    customer_db.push(customer_Details_Object);


    // Call Function
    LoadCustomerData();

    // place order form customer Id option set ids with customers
    var selectelment = document.getElementById("customerOrder_Id");
    var ids = [];
    ids=customerId;
    console.log(ids)

    for (let i = 0; i < ids.length; i++) {
        var opation = document.createElement("option");
        opation.text = ids[i];
        selectelment.appendChild(opation)
    }

    // reset button auto click save after
    $("#reset_btn").click();
});

//row click and get values text fields
$("#customer_Table").on("click","tr", function (){
    let id = $(this).find("th");
    let data = $(this).find("td");


    $("#customerId").val(id.eq(0).text());
    $("#customer_name").val(data.eq(0).text());
    $("#customer_mail").val(data.eq(1).text());
    $("#customer_Address").val(data.eq(2).text());
    $("#customer_Gender").val(data.eq(3).text());
});

// Update Customer

$("#custUpdateBtn").on('click', ()=>{
    let customer_Id = $("#customerId").val();
    let customer_name = $("#customer_name").val().trim();
    let customer_mail = $('#customer_mail').val().trim();
    let customer_adress = $('#customer_Address').val().trim();
    let customer_gender = $('#customer_Gender').val().trim();

    //Create Object
    // let customer_Details_Object = {
    //     customer_Id:customer_Id,
    //     customer_Name: customer_name,
    //     customer_Mail: customer_mail,
    //     customer_Address: customer_adress,
    //     customer_Gender: customer_gender
    // }

    //Constructor Through Data Send
    let customer_Details_Object = new CustomerModel(customer_Id,customer_name,customer_mail,customer_adress,customer_gender)

    // Update  Customer Index Number find
    let index = customer_db.findIndex(item => item.customer_Id === customer_Id);
    customer_db[index] = customer_Details_Object;

    // Table Lode
    LoadCustomerData();

    // $('#customer_Table tr').each(function (){
    //     let customerId = $(this).find('th').text();
    //
    //     if (customerId === customer_Id){
    //         $(this).find('td:nth-child(2)').text(customer_name);
    //         $(this).find('td:nth-child(3)').text(customer_mail);
    //         $(this).find('td:nth-child(4)').text(customer_adress);
    //         $(this).find('td:nth-child(5)').text(customer_gender)
    //     }
    // })

    $("#reset_btn").click();
});

// Delete Customer

$("#custdeleteBtn").on('click',()=>{
    let customerId = $("#customerId").val();

    // Delete Customer Index Find
    let delete_Customer_Index = customer_db.findIndex(item => item.customer_Id === customerId);
    // Customer Index Delete
    customer_db.splice(delete_Customer_Index , 1);

    LoadCustomerData();

    $("#reset_btn").click();
});



