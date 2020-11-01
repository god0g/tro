$(function() {
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
                    url: "/customers/list",
                    data: filter
                });
            }
        },
        fields: [
            { name: "sTpaCode", title:"Tpa",  type: "text", width: 80 ,filtering: false },
            { name: "sCustFirstName", title:"First Name", type: "text", width: 100, filtering: false },
            { name: "sCustLastName", title:"Last Name", type: "text", width: 100 ,filtering: false },
            { name: "sCustPhoneNumber", title:"Phone Number", type: "text", width:100,filtering: false },
            { name: "sCustEmail", title:"Email", type: "text", width:150,filtering: false },
            { name: "sCustAddress1", title:"Address", type: "text", width:200,filtering: false }, 
            { name: "sCustCountry", title:"Country", type: "text", width:50,filtering: false },
            { name: "sCustState", title:"State", type: "text", width:50,filtering: false },
            { name: "sCustZip", title:"Zip", type: "text", width:50,filtering: false },
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
    
});


