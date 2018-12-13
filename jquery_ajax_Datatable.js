getApi();
function getApi() {
    $("#loading").hide(4000);
    $.ajax({
        url: 'https://payloads/ul',
        type: 'GET',
        data: {
          format: 'json'
        },
        headers: {
        Authorization: "BASIC dmlub2RrdW1hcjpQYXNzQDEyMw=="
    },
        success: function(response) {
            var dataSet = response;
                $('#example1').DataTable({
                    
                        "bProcessing": true,
                    data: dataSet,
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    columns: [
                        {
                            data: 'timestamp', title: 'timestamp',
                            render: function (data) {
                                var updDate = UtcToIst(data).toLocaleDateString();
                                var updTime = UtcToIst(data).toLocaleTimeString();
                                var updDateTime = updDate + ", " + updTime;
                                return updDateTime;
                            }
                        },
                        {
                            data: 'dataFrame', title: 'filled',
                            render: function (data) {
                                var hexvalue = base64toHEX(data);
                                var d1 = hexvalue.substr(1, 1);
                                var d2 = hexvalue.substr(3, 1);
                                var d3 = hexvalue.substr(5, 1);
                                var total = d1 + d2 + d3;
                                var decimaldata = hexToDec(total);
                                var filled_feet = 28.5 - (decimaldata / 12);
                                var filled_feet=filled_feet.toFixed(2);
                                if  (filled_feet < 0 )
                                {
                                    filled_feet=0
                                }
                                return filled_feet ;
                            }
                        },
                        { data: "fcnt", title: "fcnt" },
                        { data: "freq", title: "freq" },
                        { data: "port", title: "port" },
                        { data: "rssi", title: "rssi" }
                    ],
                    "deferRender": true
                });
        
        },
        error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
        }
      });
    }
  

           
//function to convert utc to ist time
function UtcToIst(data) {
    var dt = new Date(data);
    return dt;
}

function base64toHEX(base64) {
    var raw = atob(base64);
    var HEX = '';
    for (i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16)
        HEX += (_hex.length == 2 ? _hex : '0' + _hex);
    }
    return HEX.toUpperCase();
}
function hexToDec(hex) {
    return hex.toLowerCase().split('').reduce((result, ch) =>
        result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
}
$( function() {
    var progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
  } );
