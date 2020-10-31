$(function() {
    var countries = [
        { Name: "", Id: 0 },
        { Name: "United States", Id: 1 },
        { Name: "Canada", Id: 2 },
        { Name: "United Kingdom", Id: 3 },
        { Name: "France", Id: 4 },
        { Name: "Brazil", Id: 5 },
        { Name: "China", Id: 6 },
        { Name: "Russia", Id: 7 }
    ];
    $("#jsGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: false,
        inserting: false,
        editing: false,
        sorting: false,
        paging: true,
        autoload: true,
        pageSize: 10,
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
            { name: "sCustFirstName", title:"First Name", type: "text", width: 150, filtering: false },
            { name: "sCustLastName", title:"Last Name", type: "text", width: 150 ,filtering: false },
            { name: "sUserName", title:"User Name", type: "text", width:100,filtering: false },
            { name: "sCustEmail", title:"Email", type: "text", width:150,filtering: false },
            { name: "sCustAddress1", title:"Address", type: "text", width:200,filtering: false },
            { name: "sCustAddress2", title:"Address2", type: "text", width:200,filtering: false },
            { name: "sCustCountry", title:"Country", type: "text", width:50,filtering: false },
            { name: "sCustState", title:"State", type: "text", width:50,filtering: false },
            { name: "sCustZip", title:"Zip", type: "text", width:50,filtering: false },
        ]
    });
    
});


