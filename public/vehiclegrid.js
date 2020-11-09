$(function() {
    $("#jsGrid").jsGrid({
        height: "70%",
        width: "70%",
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
                    url: "/vehicles/list",
                    data: filter
                });
            }
        },
        fields: [
            { name: "sType", title:"ประเภท", type: "text", width: 100, filtering: false },
            { name: "sBrand", title:"ยี่ห้อ", type: "text", width: 100 ,filtering: false },
            { name: "sModel", title:"โมเดล", type: "text", width:100,filtering: false },
            { name: "sVin", title:"เลขตัวถัง", type: "text", width:150,filtering: false },
            { name: "sRegistrationNumber", title:"เลขทะเบียน", type: "text", width:200,filtering: false }, 
            { type: "control", width: 100, editButton: false, deleteButton: false,
            itemTemplate: function(value, item) {
               var $customEditButton = $("<button>").attr({class: "customGridEditbutton jsgrid-button jsgrid-edit-button"})
                 .click(function(e) {
                    document.location.href = '/vehicles/form/'+item.iId; 
                   e.stopPropagation();
                 });

              var $customDeleteButton = $("<button>").attr({class: "customGridDeletebutton jsgrid-button jsgrid-delete-button"
                                                            ,"data-toggle":"modal"
                                                            ,"data-target":"#exampleModal"
                                                            ,type:"button"})
               .click(function(e) {
                $('#confirmdelete').attr("action",'/vehicles/delete/'+item.iId)
               });

               return $("<div>").append($customEditButton).append($customDeleteButton);
           },
         }
        ]
    });
    
});


