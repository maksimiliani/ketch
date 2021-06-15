
// document ready wrapper
$(document).ready( function() {
  var tcf_core = $( "#tcf_core" );
  var tcf_source;

  $("#field_lang").change(function(){
  		tcf_core.empty();

      fetch('https://cdn.jsdelivr.net/gh/maksimiliani/ketch@13d8b5c/json/vendor-list.json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          populate_sections(data);
        });

      function populate_sections(jsonObj) {

        var purposes_obj = jsonObj['purposes'];

        var tcf_section = document.createElement('div');
        tcf_section.addClass('tcf__section');

        var tcf_h2 = document.createElement('h2');
        tcf_h2.textContent = "Purposes";
        tcf_section.append(tcf_h2);

        var purposes = $.map(purposes_obj, function(value, index){
          return [value];
        });

        for (var i = 0; i < purposes.length; i++) {
          var tcf_block = document.createElement('div');
          tcf_block.addClass('tcf_block');

          var tcf_block_title = document.createElement('h4');
          var tcf_block_p = document.createElement('p');
          tcf_block_p.addClass('tcf__p');

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
