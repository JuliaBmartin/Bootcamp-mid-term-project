function showForm (action){
  let form = document.getElementById('formPlate');
  if(form && action == true){
    form.style.display = "flex";
  }
  else if(form && action == false){
    form.style.display = "none";
  }
}


function editForm (action){
  let form = document.getElementById('editForm');
  if(form && action){
    form.style.display = "flex";
  }
  else if(form && !action){
    form.style.display = "none";
  }
}