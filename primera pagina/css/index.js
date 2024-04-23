function getCharacters(done) {
  const ids = [...Array(15).keys()].map(i => i + 1); 
  const url = `https://rickandmortyapi.com/api/character/${ids.join(',')}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          done(data);
      })
      .catch(error => {
          console.error('Error fetching characters:', error);
      });
}

getCharacters(data => {
  data.forEach(personaje => {
      const article = document.createElement('article');
      article.innerHTML = `
          <div class="image-contain">
              <img src="${personaje.image}" alt="personaje">
          </div>
          <h2>${personaje.name}</h2>
      `;
      const main = document.querySelector("main");
      main.appendChild(article);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const characterSelect = document.getElementById("characterSelect");


  getCharacters(data => {
      data.forEach((personaje, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = personaje.name;
          characterSelect.appendChild(option);
      });
  });

 
  characterSelect.addEventListener("change", function() {
      const selectedIndex = parseInt(this.value);

      
      document.querySelectorAll("main article").forEach((article, index) => {
          if (index === selectedIndex) {
              article.style.display = "block";
          } else {
              article.style.display = "none";
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const characterSelect = document.getElementById("characterSelect");

  // Evento de cambio en el select
  characterSelect.addEventListener("change", function() {
      if (this.value === "all") {
          // Recargar la página si se selecciona la opción "Todos los personajes"
          location.reload();
      }
  });
});
