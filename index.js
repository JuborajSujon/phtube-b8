const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const errorEle = document.getElementById("error-element");
const sortBtn = document.getElementById("sort-btn");

let selectedCategory = "1000";
let sortbyView = false;

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
          "text-lg",
          "category-btn"
        );
        newButton.innerText = item.category;
        newButton.addEventListener("click", () => {
          fetchDataCategories(item.category_id);
          const allBtns = document.querySelectorAll(".category-btn");
          for (const btn of allBtns) {
            btn.classList.remove("bg-red-600");
          }
          newButton.classList.add("bg-red-600");
        });
        btnContainer.appendChild(newButton);
      });
    });
};

const fetchDataCategories = (categoryId, sortbyView) => {
  selectedCategory = categoryId;
  const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then(({ data }) => {
      cardContainer.innerHTML = "";
      // sorted data
      if (sortbyView) {
        data.sort((a, b) => {
          const totalViewsStrFirst = a?.others?.views;
          const totalViewsStrSecond = b?.others?.views;
          const totalViewsStrFirstNumber =
            parseFloat(totalViewsStrFirst.replace("K", "")) || 0;
          const totalViewsStrSecondNumber =
            parseFloat(totalViewsStrSecond.replace("K", "")) || 0;

          return totalViewsStrSecondNumber - totalViewsStrFirstNumber;
        });
      }
      // Error handle - if any category data not found
      if (data.length === 0) {
        errorEle.classList.remove("hidden");
      } else {
        errorEle.classList.add("hidden");
      }

      data.forEach((video) => {
        // console.log(video);

        //image badge handle if author verified or not
        let varifiedBadge = "";
        if (video?.authors[0]?.verified) {
          varifiedBadge = `<img class='w-6 h-6' src=${"./images/verify.png"} alt=''>`;
        }

        // create child element for templete out html
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

sortBtn.addEventListener("click", () => {
  sortbyView = true;
  fetchDataCategories(selectedCategory, sortbyView);
});

fetchCategory();
fetchDataCategories(selectedCategory, sortbyView);
