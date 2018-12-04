M.AutoInit();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.scrollspy');
    var instances = M.ScrollSpy.init(elems);
    elems = document.querySelectorAll('.sidenav');
    instances = M.Sidenav.init(elems); 

  });
  