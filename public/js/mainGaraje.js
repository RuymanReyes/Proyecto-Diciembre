$(document).ready(function () {
  // $('#formulario').on('submit', function (e) { 
  //   e.preventDefault();
  //   let formulario = new FormData($(this)[0]); 
  //   $.ajax({
  //   type: 'POST',
  //   url: '/vulcan/add', 
  //   data: formulario,
  //   contentType:false, 
  //   cache:false, 
  //   processData: false
  //   }); 
  // });
  $(function() {
  $('#file-input').change(function(e) {
      addImage(e); 
     });

     function addImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
    
      if (!file.type.match(imageType))
       return;
  
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
     }
  
     function fileOnload(e) {
      var result=e.target.result;
      $('#imgSalida').attr("src",result);
     }
    });

  });
