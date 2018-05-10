/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function _(id) {
    return document.getElementById(id);
}
function submitForm() {
    _("mybtn").disabled = true;
    _("status").innerHTML = 'așteptați vă rog...';
    var formdata = new FormData();
    formdata.append("n", _("n").value);
    var n = _("n").value;
    formdata.append("e", _("e").value);
    formdata.append("e_c", _("e_c").value);
    formdata.append("m", _("m").value);
    if (window.XMLHttpRequest) {
        var ajax = new XMLHttpRequest();
    }
    else {
        var ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open("POST", "contact.php");
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            if (ajax.responseText === "success") {
                _("my_form").reset();
                _("mybtn").disabled = false;
                _("status").innerHTML = '';
                _("messg").innerHTML ='<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Mulțumim ' + n + '. Mesajul a fost trimis. Vă vom contacta in max. 48h.</div>';
            } else {
                _("status").innerHTML = ajax.responseText;
                _("my_form").reset();
                _("mybtn").disabled = false;
            }
        }
    };
    ajax.send(formdata);
}
