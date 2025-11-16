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