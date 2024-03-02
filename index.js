const btnContainer = document.getElementById("btn-container");

const fetchCategory = () => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach((item) => {
        const newButton = document.createElement("button");
        newButton.classList.add(
          "btn",
          "btn-ghost",
          "bg-slate-700",
          "text-white",
          "text-lg"
        );
        newButton.innerText = item.category;
        btnContainer.appendChild(newButton);
      });
    });
};

fetchCategory();
