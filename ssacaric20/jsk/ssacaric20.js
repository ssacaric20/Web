function animiraj() {
  var element = document.getElementById("animirajse");
  
  setTimeout(function() {
    element.classList.toggle("move");
  }, 1000); 
}

setTimeout(animiraj, 500); 


function rotiraj() {
  var element = document.getElementById("rotirajse");
  element.classList.toggle("rotated");
}

setTimeout(rotiraj, 1000); 

function luduj() {
  var element = document.getElementById("ludi");
  element.classList.toggle("rotated");
  element.classList.toggle("promjeniboju");
}

setTimeout(luduj, 1000); 

window.addEventListener('DOMContentLoaded', function() {
  //error msg koji ne radi :c
  var form = document.getElementById('obrazac');
  var errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = 'Neko polje je krivo ili potpuno neispunjeno!';
  errorDiv.addEventListener('click', function() {
    errorDiv.style.display = 'none';
  });

  form.addEventListener('submit', function(event) {
    var inputs = form.getElementsByTagName('input');
    var selects = form.getElementsByTagName('select');
    var allFieldsFilled = true;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        allFieldsFilled = false;
        break;
      }
    }

    if (allFieldsFilled) {
      for (var j = 0; j < selects.length; j++) {
        if (selects[j].value === '') {
          allFieldsFilled = false;
          break;
        }
      }
    }

    if (!allFieldsFilled) {
      event.preventDefault();
      document.body.appendChild(errorDiv);
    }
  });
  //stupac stuff hover bs
  var stupac = document.querySelectorAll('#stolic td:first-child');

  for (var i = 0; i < stupac.length; i++) {
    stupac[i].addEventListener('mouseover', function() {
      var rowIndex = this.parentNode.rowIndex; 
      var columns = this.parentNode.querySelectorAll('td:not(:first-child)'); 
      var info = '';
      for (var j = 0; j < columns.length; j++) {
        info += columns[j].textContent + ', '; 
      }
      info = info.slice(0, -2); 
      document.getElementById('hoverpreko').textContent = info;
    });
  }

});