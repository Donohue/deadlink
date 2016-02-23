chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var x = new XMLHttpRequest();
        x.open('GET', request.url, true);
        x.onreadystatechange = function(){
            if (x.readyState != 4) return;
            if (x.status == 404) {
                y = new XMLHttpRequest();
                y.open('GET', 'http://web.archive.org/web/' + request.url, true);
                y.onreadystatechange = function() {
                    if (y.readyState != 4) return;
                    if (y.status == 200) {
                        chrome.tabs.sendMessage(sender.tab.id, {'status': 'success'});
                    }
                }
                y.send();
            }
        }
        x.send();
    }
)
