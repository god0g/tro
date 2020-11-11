$(document).ready(function() { 
    var carid = document.getElementById("carid");
    var name = document.getElementById("name");  
    var phone = document.getElementById("phone");         
    $("#jsGrid").jsGrid({
        height: "70%",
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
                    url: "/search/ls",
                    data: {carid:carid.value,name:name.value,phone:phone.value}
                });
            }
        },
        fields: [
            { name: "sRegistrationNumber", title:"Tpa",  type: "text", width: 80 ,filtering: false },
            { name: "sCustName", title:"First Name", type: "text", width: 100, filtering: false },
            { name: "sCustPhoneNumber", title:"Phone Number", type: "text", width:100,filtering: false },
            { type: "control", width: 100, editButton: false, deleteButton: false,
            itemTemplate: function(value, item) {
               var $customEditButton = $("<button>").attr({class: "customGridEditbutton jsgrid-button jsgrid-edit-button"})
                 .click(function(e) {
                    document.location.href = '/customers/form/'+item.iId; 
                   e.stopPropagation();
                 });

              var $customDeleteButton = $("<button>").attr({class: "customGridDeletebutton jsgrid-button jsgrid-delete-button"
                                                            ,"data-toggle":"modal"
                                                            ,"data-target":"#exampleModal"
                                                            ,type:"button"})
               .click(function(e) {
                $('#confirmdelete').attr("action",'/customers/delete/'+item.iId)
               });

               return $("<div>").append($customEditButton).append($customDeleteButton);
           },
         }
        ]
    });
    $("#btnsearch").click(function() {
        $("#jsGrid").jsGrid("loadData");
      });
});