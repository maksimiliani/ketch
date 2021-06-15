
// document ready wrapper
$(document).ready( function() {
  var tcf_core = $( "#tcf_core" );
  var tcf_source;
  var purposes;

  $("#field_lang").change(function(){
  		tcf_core.empty();

      // var invocation = new XMLHttpRequest();
      // var url = 'https://cdn.jsdelivr.net/gh/maksimiliani/ketch@13d8b5c/json/vendor-list.json';
      //
      // function callOtherDomain() {
      //   if(invocation) {
      //     invocation.open('GET', url, true);
      //     invocation.onreadystatechange = handler;
      //     invocation.send();
      //   }
      // }

      fetch('https://cdn.jsdelivr.net/gh/maksimiliani/ketch@13d8b5c/json/vendor-list.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          populate_sections(data);
        });

      // invocation.onload = function() {
      //   tcf_source = invocation.response;
      //   populate_sections(tcf_source);
      // }

      function populate_sections(jsonObj) {

        purposes = jsonObj['purposes'];
        var tcf_section = document.createElement('div');
        var tcf_h2 = document.createElement('h2');
        tcf_h2.textContent = "Purposes";
        tcf_section.append(tcf_h2);
        console.log(purposes);
        console.log(purposes.length);
        console.log(purposes[0].name);
        for (var i = 0; i < purposes.length; i++) {
          var tcf_block = document.createElement('div');
          var tcf_block_title = document.createElement('h4');
          var tcf_block_p = document.createElement('p');

          tcf_block_title.textContent = purposes[i].name;
          tcf_block_p.textContent = purposes[i].descriptionLegal;

          tcf_block.append(tcf_block_title);
          tcf_block.append(tcf_block_p);

          tcf_section.append(tcf_block);
        }
        tcf_core.append(tcf_section);
      }
    });
});
