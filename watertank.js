var data= base64toAscii("AA8OJAEA",28.5)//base 64 data and total tank height from sensor to tank bottom
function base64toAscii(base64,max) {
                var raw = atob(base64);
                var HEX = '';
                for (i = 0; i < raw.length; i++) {
                    var _hex = raw.charCodeAt(i).toString(16)
                    HEX += (_hex.length == 2 ? _hex : '0' + _hex);
                }
                var hex= HEX.substr(1,1) + HEX.substr(3,1)+ HEX.substr(5,1);
                var inches = hex.toLowerCase().split('').reduce((result, ch) =>
                  result * 16 + '0123456789abcdefgh'.indexOf(ch), 0);
                 var feet = inches/12;
                 var filled = max - feet;
                 filled = filled.toFixed(2);
                return filled;
        }
        
