// Handle button clicks to display links //
document.addEventListener("DOMContentLoaded", () => {
    const links = {
        events: "https://www.salem.edu/events/",
        pictures: "https://www.facebook.com/salemcollege/photos",
        calendar: "https://www.salem.edu/academics/academic-calendar/"
    };

    const linkContainer = document.getElementById("linkContainer");

    document.getElementById("eventsBtn").addEventListener("click", () => {
        displayLink("events");
    });

    document.getElementById("picturesBtn").addEventListener("click", () => {
        displayLink("pictures");
    });

    document.getElementById("calendarBtn").addEventListener("click", () => {
        displayLink("calendar");
    });

    function displayLink(type) {
        linkContainer.innerHTML = `<a href="${links[type]}" target="_blank">${links[type]}</a>`;
    }
});


// Fetch and display leadership data //
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("leadershipContainer");
  const searchInput = document.getElementById("searchInput");
  const toggleButton = document.getElementById("toggleButton");
  const loadingMsg = document.getElementById("loadingMessage");
  const template = document.getElementById("leader-template");

  let leaders = [];

  // Fetch data
  fetch("./json/leadership.json")
    .then(response => response.json())
    .then(data => {
      leaders = data;
      loadingMsg.style.display = "none";
    })
    .catch(err => {
      loadingMsg.textContent = "Failed to load data.";
      console.error(err);
    });

  function renderLeaders(data) {
    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p class='text-center'>No matching results found.</p>";
      return;
    }

    data.forEach(person => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".leader-image").src = person.image;
      clone.querySelector(".card-title").textContent = person.name;
      clone.querySelector(".leader-position").textContent = person.position;
      clone.querySelector(".leader-email").href = `mailto:${person.email}`;
      clone.querySelector(".leader-email").textContent = person.email;
      clone.querySelector(".leader-phone").href = `tel:${person.phone}`;
      clone.querySelector(".leader-phone").textContent = person.phone;

      container.appendChild(clone);
    });
  }

  toggleButton.addEventListener("click", () => {
    if (container.style.display === "none") {
      renderLeaders(leaders);
      container.style.display = "flex";
      toggleButton.textContent = "Hide Leadership Profiles";
    } else {
      container.style.display = "none";
      toggleButton.textContent = "Show Leadership Profiles";
    }
  });

  searchInput.addEventListener("input", event => {
    const query = event.target.value.toLowerCase();
    const filtered = leaders.filter(person => 
      person.name.toLowerCase().includes(query) ||
      person.position.toLowerCase().includes(query)
    );
    renderLeaders(filtered);
  });
});