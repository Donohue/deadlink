chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var elem = document.createElement('a');
        elem.setAttribute('href', 'http://web.archive.org/web/' + document.URL);
        elem.className = 'deadlink_container';
        
        var close = document.createElement('div');
        close.className = 'deadlink_close';
        close.onclick = function(e) {
            var container = e.target.parentNode;
            container.parentNode.removeChild(container);
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        var x = document.createTextNode('✕');
        close.appendChild(x);
        elem.appendChild(close);

        var gif = document.createElement('span');
        gif.className = 'deadlink_gif';
        elem.appendChild(gif);
        
        var text = document.createTextNode('Looks like this link is dead, but I found an archived version for you!');
        elem.appendChild(text);
        document.body.appendChild(elem);
    }
);

chrome.runtime.sendMessage({'url': document.URL});

