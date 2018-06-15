function savefile(direct_save, saveasid, saveid) {
    if (!window.Blob) {
        alert('Your browser does not support HTML5 "Blob" function required to save a file.');
    } else {
        var txtwrt = '';
        if (direct_save == 'yes') {
            txtwrt = saveid;
        } else {
            txtwrt = document.getElementById(saveid).value;
        }
        if (document.getElementById('dos').checked == true) txtwrt = txtwrt.replace(/\n/g, '\r\n');
        var textblob = new Blob([txtwrt], {
            type: 'text/plain'
        });
        var saveas = document.getElementById(saveasid).value;
        var dwnlnk = document.createElement('a');
        dwnlnk.download = saveas;
        dwnlnk.innerHTML = "Download File";
        if (window.webkitURL != null) {
            dwnlnk.href = window.webkitURL.createObjectURL(textblob);
        } else {
            dwnlnk.href = window.URL.createObjectURL(textblob);
            dwnlnk.onclick = destce;
            dwnlnk.style.display = 'none';
            document.body.appendChild(dwnlnk);
        }
        dwnlnk.click();
    }
}

function destce(event) {
    document.body.removeChild(event.target);
}

function cleartext() {
    document.getElementById('output').value = '';
}

function SelectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

function wrapis(boxid, wrapis) {
    var area = document.getElementById(boxid);
    area.setAttribute('wrap', wrapis);
    var newarea = area.cloneNode(true);
    newarea.value = area.value;
    area.parentNode.replaceChild(newarea, area);
}

Array.prototype.map = function(fn) {
    var r = [];
    var l = this.length;
    for (i = 0; i < l; i++) {
        r.push(fn(this[i]));
    }
    return r;
}

function permute() {
    //+ Jonas Raoni Soares Silva @ http://jsfromhell.com/array/permute
    var permute = function(v, m) {
        for (var p = -1, j, k, f, r, l = v.length, q = 1, i = l + 1; --i; q *= i);
        for (x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1; ++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
        for (r = new Array(q); ++p < q;)
            for (r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i], x[2][i] = (x[2][i] + 1) % l), r[p][i] = m ? x[3][i] : v[x[3][i]])
                for (x[3][i] = x[2][i], f = 0; !f; f = !f)
                    for (j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));
        return r;
    };
    //end
    var perobjs = new Array();
    perobjscnt = 0;
    var permobj = '';
    for (var x = 0; x < 10; x++) {
        permobj = document.getElementById('permobj' + (x + 1)).value.replace(/\\x/g, '\n');
        if (permobj != '') {
            perobjs[perobjscnt] = permobj;
            perobjscnt++;
        }
    }
    var pre = document.getElementById('setprefix').value.replace(/\\x/g, '\n');
    var suf = document.getElementById('setsuffix').value.replace(/\\x/g, '\n');
    var joinobjs = document.getElementById('objdelimiter').value.replace(/\\x/g, '\n');
    var joinperms = document.getElementById('objjoin').value.replace(/\\x/g, '\n');
    var out = permute(perobjs).map(function(objs) {
        return pre + objs.join(joinobjs) + suf
    });
    out = out.join(joinperms);
    if (document.getElementById('direct_save').checked == true) {
        savefile('yes', 'saveas', out)
    } else {
        document.getElementById('output').value = out;
    }
    count_me();
}

var lastdivnum = 1;

function cnthlite(divnum) {
    var objcnt = 0;
    for (var x = 1; x < 11; x++) {
        if (document.getElementById('permobj' + x).value != '') objcnt++;
    }
    if (objcnt != 0) {
        document.getElementById('cnthlite' + objcnt).style.backgroundColor = '#CC0000';
        document.getElementById('cnthlite' + objcnt).style.color = '#FFFFFF';
        document.getElementById('cnthlite' + objcnt).style.fontWeight = 'bold';
    }
    if (objcnt != lastdivnum || objcnt == 0) {
        document.getElementById('cnthlite' + lastdivnum).style.backgroundColor = '#E3E2DF';
        document.getElementById('cnthlite' + lastdivnum).style.color = '#000000';
        document.getElementById('cnthlite' + lastdivnum).style.fontWeight = 'normal';
    }
    if (objcnt == 0) lastdivnum = 1;
    else lastdivnum = objcnt;
}