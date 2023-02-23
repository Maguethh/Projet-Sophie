const reponse = await fetch("projets.json");
const projets = await reponse.json();

// TODO : fermer la modal au click "en dehors"

function genererCards(projets) {
  for (let i = 0; i < projets.length; i++) {
    const card = projets[i];

    const sectionCard = document.querySelector(".gallery");

    const cardContainer = document.createElement("article");

    const imageCard = document.createElement("img");
    imageCard.id = "carte-" + card.id;
    imageCard.src = card.image;

    const descriptionCard = document.createElement("p");
    descriptionCard.innerText = card.description;

    sectionCard.appendChild(cardContainer);

    cardContainer.appendChild(imageCard);
    cardContainer.appendChild(descriptionCard);
  }
}

function genererCardsModale(projets) {
  for (let i = 0; i < projets.length; i++) {
    const card = projets[i];

    const sectionCard = document.querySelector(".modalecontent");

    const cardContainer = document.createElement("article");

    const imageCard = document.createElement("img");
    imageCard.id = "modale-carte-" + card.id;
    imageCard.src = card.image;
    imageCard.className = "modaleimage";

    sectionCard.appendChild(cardContainer);

    cardContainer.appendChild(imageCard);
  }
}

genererCards(projets);

const filtreTous = document.querySelector(".btn-tous");
filtreTous.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  genererCards(projets);
});

const filtreObjet = document.querySelector(".btn-objet");
filtreObjet.addEventListener("click", function () {
  const cardFiltrees = projets.filter(function (card) {
    return card.categorie == "objet";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererCards(cardFiltrees);
});

const filtreAppartement = document.querySelector(".btn-appartement");
filtreAppartement.addEventListener("click", function () {
  const cardFiltrees = projets.filter(function (card) {
    return card.categorie == "appartement";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererCards(cardFiltrees);
});

const filtreHotelRestaurant = document.querySelector(".btn-hotel-restaurant");
filtreHotelRestaurant.addEventListener("click", function () {
  const cardFiltrees = projets.filter(function (card) {
    return card.categorie == "hotel-restaurant";
  });
  document.querySelector(".gallery").innerHTML = "";
  genererCards(cardFiltrees);
});


/* MODALE */
var selectedImageId = 0
const boutonModale = document.querySelector(".modifier");
boutonModale.addEventListener("click", function () {
  // si le contenu de la modale n'a pas encore été intialisé, 
  // initialisation
  if (document.querySelectorAll(".modalecontent article").length == 0) {
    // affichage des images
    genererCardsModale(projets);
    // click sur le close
    document.getElementById("closemodale").addEventListener("click", function (event) {    
      document.getElementById("modale").style.display = "none";
    });
    // click sur chaque image
    let images = document.querySelectorAll('.modaleimage').forEach(elt => {
      elt.addEventListener('click', (event) => {
        document.querySelectorAll('.modaleimage.selected').forEach(elt => {
          elt.classList.remove('selected')
        })
        event.target.classList.add("selected");
        selectedImageId = event.target.id.replace('modale-carte-', '')
        console.log("selected Id : " + selectedImageId)
      })
    });  
    // click sur supprimer
    const modaleSupprimer = document.querySelector(".supprimer-image");
    modaleSupprimer.addEventListener("click", function () {      
      // TODO envoyer au serveur la suppression de l'image... 
      if (selectedImageId == 0) return;
      let elementToRemove = document.getElementById("modale-carte-" + selectedImageId);
      elementToRemove.parentNode.parentNode.removeChild(elementToRemove.parentNode);
    });  
  }
  document.getElementById("modale").style.display = "block";
});




document.getElementById('photo_upload_button').addEventListener('click', function() {
  document.getElementById('photo').click()
})

document.getElementById('project_creation_submit').addEventListener('click', function() {
  let data = new FormData()
  data.append("title", document.getElementById('title').value)
  data.append("category", document.getElementById('category').value)
  data.append("image", document.getElementById('photo').files[0]) 
  let url = 'http://localhost:5678/api/works';
  // console.log(data)
  fetch(url, {
    method: "POST",
    headers: {            
      "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NjcxNTExNywiZXhwIjoxNjc2ODAxNTE3fQ.7gEfs9kJPHBFdIV9okB6SPvTQMRpvXxjeXnDmATqoCw"
    },
    body: data
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    // todo : display the new image
    })  
  .catch(error => {
    console.log(error)
  })
})
