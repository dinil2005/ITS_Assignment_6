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

    if (validate(customerId,'Customer Id') && validate(customerName,"Customer Name") && validate(customerMail,'Customer Mail')
        && validate(customerAddress,'Customer Address') && validate(selectedValue,"Gender")){
        let customer_Details_Object = new CustomerModel(customerId,customerName,customerMail,customerAddress,selectedValue)   //Constructor Through Data Send

        //customer_db Array Push customer Details Object
        customer_db.push(customer_Details_Object);
        Swal.fire(
            'Success!',
            'Customer Saved Successfully!',
            'success'
        )

        // Call Function
        LoadCustomerData();


        // reset button auto click save after
        $("#reset_btn").click();
    }


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


    if (validate(customer_Id,'Customer Id') && validate(customer_name,'Customer Name') && validate(customer_mail,'Customer Mail')
        && validate(customer_adress,'Customer Address') && validate(customer_gender,'Customer Gender')){
        //Constructor Through Data Send
        let customer_Details_Object = new CustomerModel(customer_Id,customer_name,customer_mail,customer_adress,customer_gender)

        // Update  Customer Index Number find
        let index = customer_db.findIndex(item => item.customer_Id === customer_Id);
        customer_db[index] = customer_Details_Object;
        Swal.fire(
            'Success!',
            'Customer Update Successfully!',
            'success'
        )
        // Table Lode
        LoadCustomerData();
        $('#custSaveBtn').css('display', 'block');
        $('#custdeleteBtn').css('display','none');
        $('#custUpdateBtn').css('display','none');
        $("#reset_btn").click();
    }

});

// Delete Customer
$("#custdeleteBtn").on('click',()=>{
    let customerId = $("#customerId").val();

    let delete_Customer_Index = customer_db.findIndex(item => item.customer_Id === customerId); // Delete Customer Index Find
    customer_db.splice(delete_Customer_Index , 1);    // Customer Index Delete
    Swal.fire(
        'Success!',
        'Customer Delete Successfully!',
        'success'
    )
    LoadCustomerData();

    $('#custSaveBtn').css('display', 'block');
    $('#custdeleteBtn').css('display','none');
    $('#custUpdateBtn').css('display','none');
    $("#reset_btn").click();
});


//Search Customer
$('#customerSearchBtn').on('click', () =>{
    let custId = $('#customer_searchTxt').val();

    let search_CustomerIndex = customer_db.findIndex(item => item.customer_Id === custId);

    $('#customer_Table').empty();

    var newRow = "<tr><th scope='row'>" + customer_db[search_CustomerIndex].customer_Id + "</th><td>" + customer_db[search_CustomerIndex].customer_Name + "</td><td>" + customer_db[search_CustomerIndex].customer_Mail + "</td><td>" + customer_db[search_CustomerIndex].customer_Address + "</td><td>" + customer_db[search_CustomerIndex].customer_Gender + "</td></tr>";
    $('#customer_Table').append(newRow);
});

$('#customer_searchTxt').on('click', () =>{
    LoadCustomerData();
})



function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}


$("#customer_Table").on("click", "tr", function() {
    $('#custSaveBtn').css('display', 'none');
    $('#custdeleteBtn').css('display','block');
    $('#custUpdateBtn').css('display','block');
});
