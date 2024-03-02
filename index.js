const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const errorEle = document.getElementById("error-element");

let selectedCategory = "1000";

const fetchCategory = () => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      data.forEach((item) => {
        // console.log(item);
        const newButton = document.createElement("button");
        newButton.classList.add(
          "btn",
          "btn-ghost",
          "bg-slate-700",
          "text-white",
          "text-lg"
        );
        newButton.innerText = item.category;
        newButton.addEventListener("click", () =>
          fetchDataCategories(item.category_id)
        );
        btnContainer.appendChild(newButton);
      });
    });
};

const fetchDataCategories = (categoryId) => {
  selectedCategory = categoryId;
  const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      cardContainer.innerHTML = "";

      if (data.length === 0) {
        errorEle.classList.remove("hidden");
      } else {
        errorEle.classList.add("hidden");
      }

      data.forEach((video) => {
        // console.log(video);
        let varifiedBadge = "";
        if (video?.authors[0]?.verified) {
          varifiedBadge = `<img class='w-6 h-6' src=${"./images/verify.png"} alt=''>`;
        }
        const newCard = document.createElement("div");
        newCard.className = `card w-full bg-base-100 shadow-xl`;
        newCard.innerHTML = `
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video?.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video?.authors[0]?.profile_picture}" alt="Shoes" />
                        </div>
                        <div class="basis-full">
                            <h2 class="card-title">${video?.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video?.authors[0]?.profile_name}</p>
                              ${varifiedBadge}
                            </div>
                            <p class="mt-3">${video?.others?.views} Views</p>
                        </div>
                    </div>
                </div>
                `;
        cardContainer.appendChild(newCard);
      });
    });
};

fetchCategory();
fetchDataCategories(selectedCategory);
