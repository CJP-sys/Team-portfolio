const blogPosts = [
            {
            title: "The Cotton-Jersey Zip-up Hoodie",
            image: "images/blog/bl4.avif",
            date: "13/01",
            time: "5 min read",
            category: "Fashion",
            short: "If you're thinking of starting a clothing business...",
            full: "If you're thinking of starting a clothing business..."
        },
        {
            title: "Why Start a Fashion Blog?",
            image: "images/blog/bl3.avif",
            date: "15/01",
            time: "4 min read",
            category: "Fashion",
            short: "A blog is your creative space...",
            full: "A blog is your creative space..."
        },
        {
            title: "Building Your Brand",
            image: "images/blog/bl5.avif",
            date: "18/01",
            time: "6 min read",
            category: "Business",
            short: "Starting a blog should feel exciting...",
            full: "Starting a blog should feel exciting..."
        },
        {
            title: "About Our Company",
            image: "images/blog/bl6.avif",
            date: "20/01",
            time: "3 min read",
            category: "Company",
            short: "First impressions are everything...",
            full: "First impressions are everything..."
        }
];

const blogContainer = document.getElementById("blog");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const postsPerPage = 2;
let filteredPosts = [...blogPosts];

function displayBlogs() {
    blogContainer.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const posts = filteredPosts.slice(start, end);

    posts.forEach((post, index) => {
        blogContainer.innerHTML += `
        <div class="blog-box fade-in"
             style="animation-delay:${index * 0.2}s">

            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}">
            </div>

            <div class="blog-details">

                <span class="category">
                    ${post.category}
                </span>

                <p class="read-time">
                    <i class="far fa-clock"></i>
                    ${post.time}
                </p>

                <h4>${post.title}</h4>

                <p>${post.short}</p>

                <a href="#"
                   class="read-more"
                   data-title="${post.title}">
                   CONTINUE READING
                </a>

            </div>

            <h1>${post.date}</h1>

        </div>
        `;
    });

    addReadMoreEvents();
    displayPagination();
}
function displayPagination() {
    pagination.innerHTML = "";

    const totalPages =
        Math.ceil(filteredPosts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {

        pagination.innerHTML += `
        <a href="#"
           class="page-btn ${
               i === currentPage
                   ? "active-page"
                   : ""
           }"
           data-page="${i}">
           ${i}
        </a>
        `;
    }

    document
        .querySelectorAll(".page-btn")
        .forEach(btn => {

            btn.addEventListener("click", e => {
                e.preventDefault();

                currentPage =
                    Number(btn.dataset.page);

                displayBlogs();
            });

        });
}

document
.getElementById("search-input")
.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    filteredPosts = blogPosts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.category.toLowerCase().includes(value)
    );

    currentPage = 1;

    if (filteredPosts.length === 0) {
        blogContainer.innerHTML = `
            <div class="empty-blog">
                <i class="fas fa-search"></i>
                <h2>No blogs found</h2>
                <p>Try another keyword.</p>
            </div>
        `;

        pagination.innerHTML = "";
        return;
    }

    displayBlogs();
});

const modal =
    document.getElementById("blog-modal");

const modalTitle =
    document.getElementById("modal-title");

const modalText =
    document.getElementById("modal-text");

const modalImage =
    document.getElementById("modal-image");

const modalDate =
    document.getElementById("modal-date");

function addReadMoreEvents() {
    document
    .querySelectorAll(".read-more")
    .forEach(button => {

        button.addEventListener("click", e => {
            e.preventDefault();

            const title =
                button.dataset.title;

            const post =
                blogPosts.find(
                    p => p.title === title
                );

            modalTitle.textContent =
                post.title;

            modalDate.textContent =
            "Published: " + post.date;

            modalText.textContent =
                post.full;

            modalImage.src =
                post.image;

            modal.style.display = "block";
        });
    });
}

document
.getElementById("close-modal")
.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

displayBlogs();

document.addEventListener("keydown", e=>{
    if(e.key==="Escape"){
        modal.style.display = "none";
    }
});

