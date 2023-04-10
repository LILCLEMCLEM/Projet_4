function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
var form  = document.getElementsByTagName('form')[0];
const validationForm = document.querySelector(".submit-ok");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const closesubBtn = document.querySelector(".close-submit");
const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const acceptBtn = document.querySelector(".btn-valider");

//close modal event
acceptBtn.addEventListener("click" , closeModal);


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//close modal if not completed -> dont send form
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalbg.style.visibility = "visible";

}
//close modal form
function closeModal() {  
  modalbg.style.display = "none";
  form.reset();
  
  validationForm.style.visibility = "hidden";
  
}

//empeche le sumbit par défaut
form.addEventListener("submit", function (event) {
    event.preventDefault();
    validate();
  
});

//envoyer le formulaire
function sendForm() {
  form.submit();
}


//valider le formulaire
function validate() {

  let error = false;
  const items = document.querySelectorAll(".formData");
  //code pour réinitialiser les erreurs

  items.forEach(element => {
    setError(element , "" , false);
    error = false;
  });

  
  // prenom
  
  const prenomForm = document.getElementById("first");
  
  
  if(prenomForm.value.length < 2 && prenomForm.value != undefined)
  {
      error = true;
      setError(prenomForm.parentElement , "le prénom doit être de minimum 2 caractères" , true);    
  }


  //nom
  const nomForm = document.getElementById("last");
  

  if(nomForm.value.length < 2 && nomForm.value != undefined)
  {
      error = true;
      setError(nomForm.parentElement , "le nom doit être de minimum 2 caractères" , true );

  }


  //mail
  const mailForm = document.getElementById("email");
  
  if (!regex.test(String(mailForm.value).toLowerCase()))
  {  
      error = true;
      setError(mailForm.parentElement,"entrez une addresse mail valide" , true);
  }



  //date
  const dateForm = document.getElementById("birthdate");
  
  if(dateForm.value == "")
  {
    
    error = true;
    setError(dateForm.parentElement , "entrez une date valide" , true);
  }


  //nbre tournoi
  const quantityForm = document.getElementById("quantity");
  

  if(quantityForm.value.match(/^[0-9]+$/) == null)
  {
    error = true;
    setError(quantityForm.parentElement , "entrer une valeur numérique" , true);

  }

  //récupération du type RadioButton ayant la propriété "checked == true" uniquement
  let radioForm = null;
  let checkedItem = false
  for(let i=1; i<=6 ; i++)
  {
    
    radioForm = document.getElementById("location" + i);
    if(radioForm.checked)
    {
      
      checkedItem = true
    }
  }
    if(checkedItem == false)
    {
      error = true;
      setError(radioForm.parentElement , "cochez une destination" , true)
    }

    //verifier si case gcu est validé
    const checkboxcgu = document.getElementById("checkbox1");
    if(!checkboxcgu.checked)
    {
      setError(checkboxcgu.parentElement , "veuillez accepter les conditions d'utilisations" , true);
      error = true; 
    }

    //si il n'y a pas d'erreur
    if(!error)
    {
      validationForm.style.visibility = "visible";
      
      validationForm.style.display = "block";
    }

}

function setError(element , texte , visible) {
    element.setAttribute("data-error" , texte);
    element.setAttribute("data-error-visible" , visible);

}

