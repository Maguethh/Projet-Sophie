const reponse = await fetch("projets.json");
const projets = await reponse.json();

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

genererCardsModale(projets);

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

document
  .getElementById("closemodale")
  .addEventListener("click", function (event) {
    console.log(event.target);
    document.getElementById("modale").style.display = "none";
  });

const boutonModale = document.querySelector(".modifier");
boutonModale.addEventListener("click", function () {
  document.getElementById("modale").style.display = "block";
});

const modaleSupprimer = document.querySelector(".supprimer-image");
console.log(modaleSupprimer);
modaleSupprimer.addEventListener("click", function () {
  console.log("modaleSupprimer");
  let id = 11;
  let elementToRemove = document.getElementById("carte-" + id);
  elementToRemove.parentNode.removeChild(elementToRemove);
});

document
  .querySelector(".modaleimage")
  .addEventListener("click", function (event) {
    document.querySelector(".modaleactive"),
      forEach((el) => element.classList.remove("modaleactive"));
    event.target.classList.add("modaleactive");
  });
