$(function() {
    var vehicleId = document.getElementById("vehicleId");

    $("#jsGrid").jsGrid({
        height: "auto",
        width: "100%",
        filtering: false,
        inserting: false,
        editing: false,
        sorting: false,
        paging: true,
        autoload: true,
        pageSize: 20,
        pageButtonCount: 5,
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/customers/list/"+vehicleId.value,
                    data: filter
                });
            }
        },
        fields: [
            { name: "sCustFirstName", title:"ชื่อ", type: "text", width: 100, filtering: false },
            { name: "sCustLastName", title:"นามสกุล", type: "text", width: 100 ,filtering: false },
            { name: "sCustPhoneNumber", title:"เบอร์โทร", type: "text", width:100,filtering: false },
            { name: "sCustEmail", title:"อีเมล", type: "text", width:150,filtering: false },
            { name: "sCustAddress1", title:"ที่อยู่", type: "text", width:200,filtering: false }, 
            { name: "sCustZip", title:"รหัสไปรษณี", type: "text", width:50,filtering: false },
            { type: "control", width: 100, editButton: false, deleteButton: false,
            itemTemplate: function(value, item) {
               var $customEditButton = $("<button>").attr({class: "customGridEditbutton jsgrid-button jsgrid-edit-button"
                                                         ,"data-toggle":"modal"
                                                         ,"data-target":"#CustomerFormModal"
                                                         ,type:"button"})
                 .click(function(e) {
                   $('#customerform').attr("action",'/customers/form')
                   $('#customerId').attr("value",item.iId)
                   $('#firstName').attr("value",item.sCustFirstName)           
                   $('#lastName').attr("value",item.sCustLastName)
                   $('#phonenumber').attr("value",item.sCustPhoneNumber)
                   $('#email').attr("value",item.sCustEmail)
                   $('#address').attr("value",item.sCustAddress1)
                 });

              var $customDeleteButton = $("<button>").attr({class: "customGridDeletebutton jsgrid-button jsgrid-delete-button"
                                                            ,"data-toggle":"modal"
                                                            ,"data-target":"#exampleModal"
                                                            ,type:"button"})
               .click(function(e) {
                $('#confirmdelete').attr("action",'/customers/disable/'+item.iId)
               });

               return $("<div>").append($customEditButton).append($customDeleteButton);
           },
         }
        ]
    });
    
});


