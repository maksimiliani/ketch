
// document ready wrapper
$(document).ready( function() {
  var tcf_core = $( "#tcf_core" );

  $("#field_lang").change(function(){
  		tcf_core.empty();

      var invocation = new XMLHttpRequest();
      var url = '../json/vendor-list.json';

      function callOtherDomain() {
        if(invocation) {
          invocation.open('GET', url, true);
          invocation.onreadystatechange = handler;
          invocation.send();
        }
      }

      //
      // var requestURL = 'https://vendor-list.consensu.org/v2/vendor-list.json';
      // var request = new XMLHttpRequest();
      //
      // request.open('GET', requestURL);
      // request.responseType = 'json';
      // request.send();

      invocation.onload = function() {
        var tcf_source = invocation.response;
        populate_sections(tcf_source);
      }

      function populate_sections(jsonObj) {

        var purposes = jsonObj['purposes'];
        var tcf_section = document.createElement('div');
        var tcf_h2 = document.createElement('h2');
        tcf_h2.textContent = "Purposes";
        tcf_section.appendChild(tcf_h2);
        for (var i = 0; i < purposes.length; i++) {
          var tcf_block = document.createElement('div');
          var tcf_block_title = document.createElement('h4');
          var tcf_block_p = document.createElement('p');

          tcf_block_title.textContent = purposes[i].name;
          tcf_block_p.textContent = purposes[i].descriptionLegal;

          tcf_block.appendChild(tcf_block_title);
          tcf_block.appendChild(tcf_block_p);

          tcf_section.appendChild(tcf_block);
        }
        tcf_core.appendChild(tcf_section);
      }
    });
});
