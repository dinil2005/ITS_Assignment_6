
// <!--////////////// Place Order Script ////////-->


$("#item_description_select").on('change', () => {
    var item_description = $("#item_description_select").val();


    if (item_description === $("#item_table td")){
        console.log("have")
    }else{
        console.log("not have")
    }


});

$("#place_order_btn").on('click', () =>{
    var orderId = $("#orderId").val().trim();
    var customerId = $("#customerOrder_Id").val().trim();
    var date =  $("#order_Date").val().trim();

    var selectItem = $("#item_description_select").val().trim();
    var selectItem_qty_on_hand = $("#qtyOnHand").val().trim();
    var buy_qty = $("#qty").val().trim()





    console.log("Order ID: " + orderId);
    console.log("Customer ID: " + customerId);
    console.log("Date: " + date);
    console.log("Selected Item: " + selectItem);
    console.log("Quantity on Hand: " + selectItem_qty_on_hand);
    console.log("Buy Quantity: " + buy_qty);
})










