function nav() {
    if (document.getElementById("navtoo").style.display == "block") {
        navClose();
    }
    else if (document.getElementById("navtoo").style.display == "none") {
        navOpen();
    }
}
function navOpen() {
    document.getElementById("navtoo").style.display = "block";
}

function navClose() {
    document.getElementById("navtoo").style.display = "none";
}

function sendData(e){
    fetch('getSearch', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    });
}

