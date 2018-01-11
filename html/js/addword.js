$('#addwordbutton').click(function(event) {
  event.preventDefault();
  var wordValue = $('#word').val();
  var hintValue = $('#hint').val();
  if (wordValue.length < 2 || wordValue.length > 25 || hintValue.length < 3 || hintValue.length > 50){
    alert('Pole z hasłem musi mieć od 2 do 25 znaków, a pole z podpowiedzią 3-50');
    return;
  }
  var form = $("#waterform")[0];
  var formData = new FormData(form);
  console.log(formData);
  if ($("#picture").val() == ''){
    formData.delete('picture');
  }
  if ($("#audio").val() == ''){
    formData.delete('audio');
  }
  var address = window.location.href;
  $.ajax({
    url: address,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function(result){
      $('#audio').val(null);
      $('#picture').val(null);
      $('#hint').val(null);
      $('#word').val(null); 
      $('#wordslist').replaceWith(result);

    },
    error: function(error){
      alert(JSON.stringify(error)); 
    }
  });
});

$('#addwordsfilebutton').click(function(event) {
  event.preventDefault();
  var form = $("#addwordfileform")[0];
  var formData = new FormData(form);
  if ($("#wordsfile").val() == ''){
    console.log('empty form');
    return;
  }
  var crossId = window.location.href.split("/").pop();
  console.log(crossId);
  var address = 'http://localhost:3000/uploadwordsfile/' + crossId;
  $.ajax({
    url: address,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function(result){
      $('#audio').val(null);
      $('#picture').val(null);
      $('#hint').val(null);
      $('#word').val(null);
      $('#wordsfile').val(null);
      location.reload();
    },
    error: function(error){
      alert(error.responseText + ', niektóre twoje hasła mogły zostać dodane nieprawidłowo, odśwież stronę'); 
    }
  });
});

$('#gencategorybutton').click(function(event){
  event.preventDefault();
  var category = $('#category').val();
  var crossId = window.location.href.split("/").pop();
  var form = $("#generatewords")[0];
  var formData = new FormData(form);
  var address = 'http://localhost:3000/crosswordcategory/' + crossId;
  console.log(address);
  $.ajax({
    url: address,
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function(result){
      setTimeout(function(){
        location.reload();
      }, 3000)
    },
    error: function(error){
      alert(error.responseText);
    }
  })
});

$(document).on ("click", ".deletewordbutton", function () {
  console.log('Delete word button on!');
  var address = window.location.href;
  $.ajax({
    url: address,
    method: "DELETE",
    data: {'wordId' : this.id},
    success: function(result){
      $('#wordslist').replaceWith(result);
    },
    error: function(error){
      alert(error.responseText); 
    }
  });
});
