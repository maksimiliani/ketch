var tcf_core;

function init__(json_link) {
  tcf_core.empty();

  fetch(json_link)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      populate_sections(data);
    });

  function populate_sections(jsonObj) {
    populate_sections_nested(jsonObj['purposes'], "Purposes");
    populate_sections_nested(jsonObj['specialPurposes'], "Special Purposes");
    populate_sections_nested(jsonObj['features'], "Features");
    populate_sections_nested(jsonObj['specialFeatures'], "Special Features");
  }
}

function populate_sections_nested(jsonObj_ref, h2_title) {
  var purposes_obj = jsonObj_ref;

  var tcf_section = document.createElement('div');
  tcf_section.setAttribute('class', 'tcf__section');

  var tcf_h2 = document.createElement('h2');
  tcf_h2.textContent = h2_title;
  tcf_section.append(tcf_h2);

  var purposes = $.map(purposes_obj, function(value, index){
    return [value];
  });

  for (var i = 0; i < purposes.length; i++) {
    var tcf_block = document.createElement('div');
    tcf_block.setAttribute('class', 'tcf__block');

    var tcf_block_title = document.createElement('h4');
    var tcf_block_p = document.createElement('p');
    tcf_block_p.setAttribute('class', 'tcf__p');

    var tcf_p_ul = document.createElement('ul');
    tcf_p_ul.setAttribute('class', 'tcf__p');
    var tcf_p_ul_lis = purposes[i].descriptionLegal.split('\n'); // was .split('\n* ');

    for (var j = 1; j < tcf_p_ul_lis.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = tcf_p_ul_lis[j];
      tcf_p_ul.append(listItem);
    }

    tcf_block_title.textContent = purposes[i].name;
    tcf_block_p.textContent = tcf_p_ul_lis[0];

    tcf_block.append(tcf_block_title);
    tcf_block.append(tcf_block_p);
    tcf_block.append(tcf_p_ul);

    tcf_section.append(tcf_block);
  }
  tcf_core.append(tcf_section);
}

// document ready wrapper
$(document).ready( function() {
  tcf_core = $( "#tcf_core" );
  init__( $("#field_lang")[0].value );

  $("#field_lang").change(function(){
    init__( $("#field_lang")[0].value );
  });
});
