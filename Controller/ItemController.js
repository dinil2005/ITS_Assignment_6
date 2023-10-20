import {item_db} from "../db/db.js";





const LoadItemTable = () =>{
    $('#item_table').empty();
    item_db.map((item,index) =>{
        var newRow = "<tr><th scope='row'>" + item.item_Id + "</th><td>" + item.item_Description + "</td><td>" + item.item_UnitPrice + "</td><td>" + item.ite_Qty +  "</td></tr>";
        $("#item_table").append(newRow)
    })
}

//Save Item
$("#item_save_btn").on('click', ()=>{
    var item_id = $("#item_id_txt").val();
    var item_description = $("#item_name_txt").val().trim();
    var item_unitPrice = $("#item_price_txt").val().trim();
    var item_qty = $("#item_qty_txt").val().trim();


    let item_detail_object = {
        item_Id:item_id,
        item_Description:item_description,
        item_UnitPrice:item_unitPrice,
        ite_Qty:item_qty
    }

    item_db.push(item_detail_object)

    LoadItemTable();

    $("#item_reset_btn").click();



    //Order Form Item select field set items


    const selectElement = document.getElementById("item_description_select");

    // An array of item names
    var index = 0;
    const itemNames = [];
    itemNames[index] = item_description;
    index++;


    // Loop through the item names and create an option for each one
    itemNames.forEach(itemName => {
        const option = document.createElement("option");
        option.text = itemName;
        // If you want to assign a value to each option, you can do so using option.value
        // option.value = itemName;
        selectElement.appendChild(option);
    });

});

//row click and get values text fields
$("#item_table").on("click","tr",function (){
    let id = $(this).find("th");
    let data = $(this).find("td");

    $("#item_id_txt").val(id.eq(0).text());
    $("#item_name_txt").val(data.eq(0).text());
    $("#item_price_txt").val(data.eq(1).text());
    $("#item_qty_txt").val(data.eq(2).text());
})

//update Item
$("#item_update_btn").on('click', ()=>{
    var item_id = $("#item_id_txt").val();
    var item_description = $("#item_name_txt").val().trim();
    var item_price = $("#item_price_txt").val().trim();
    var item_qty = $("#item_qty_txt").val().trim()

    $("#item_table tr").each(function (){
        let itemId = $(this).find('th').text();

        if (itemId === item_id ){
            $(this).find('td:nth-child(2)').text(item_description);
            $(this).find('td:nth-child(3)').text(item_price);
            $(this).find('td:nth-child(4)').text(item_qty);
        }
    });
    $("#item_reset_btn").click();
});

//Delete Item
$("#item_delete_btn").on('click',()=>{
    let item_id = $("#item_id_txt").val();

    $('#item_table tr').each(function (){
        let items_ids = $(this).find('th').text();

        if (item_id === items_ids){
            $(this).remove();
        }
    });
    $("#item_reset_btn").click();
});

