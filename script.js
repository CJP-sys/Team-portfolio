function filterTeam(category) {
        // Update active button styling
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Filter cards
        const cards = document.querySelectorAll('.team-card');
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hide');
            } else {    
                card.classList.add('hide');
            }
        });
    }

    function openModal(element) {
        // Find the parent card containing all data
        const card = element.closest('.team-card');
        
        // Extract data with fallbacks
        const name = (card.querySelector('h3')?.innerText || '').trim() || 'Team Member';
        const role = (card.querySelector('.role')?.innerText || '').trim() || 'Team Member';
        const imgEl = card.querySelector('img');
        const imgStyle = imgEl?.src || '';
        const fullBio = (card.querySelector('.full-bio')?.innerText || '').trim() || 'More details coming soon.';
        const email = (card.querySelector('.email-data')?.innerText || '').trim() || 'hello@example.com';
        const skillsArray = (card.querySelector('.skills-data')?.innerText || '')
            .split(',')
            .map(skill => skill.trim())
            .filter(Boolean);

        // Inject data into Modal
        document.getElementById('modalName').innerText = name;
        document.getElementById('modalRole').innerText = role;
        document.getElementById('modalImg').src = imgStyle;
        document.getElementById('modalBio').innerText = fullBio;
        const subject = encodeURIComponent("Project Inquiry - Website Development");

const body = encodeURIComponent(`Hi Khian,

I found your portfolio and I'm interested in working with you.

Project Details:

Budget:

Timeline:

Looking forward to your response.

Best regards,
`);

document.getElementById("modalMail").href =
`https://mail.google.com/mail/?view=cm&fs=1&to=${email.trim()}&su=${subject}&body=${body}`;
        
        document.getElementById("modalMail").href =
`https://mail.google.com/mail/?view=cm&fs=1&to=${email.trim()}&su=${subject}&body=${body}`;

        // Handle Skill Tags dynamically
        const tagsContainer = document.getElementById('modalSkills');
        tagsContainer.innerHTML = ''; // Clear old tags
        if (skillsArray.length) {
            skillsArray.forEach(skill => {
                const span = document.createElement('span');
                span.classList.add('tag');
                span.innerText = skill.trim();
                tagsContainer.appendChild(span);
            });
        } else {
            const span = document.createElement('span');
            span.classList.add('tag');
            span.innerText = 'Collaboration';
            tagsContainer.appendChild(span);
        }

        // Show Modal
        const modal = document.getElementById('profileModal');
        modal.style.display = 'flex';

        // Load Projects
const projectsContainer = document.getElementById("modalProjects");
projectsContainer.innerHTML = "";

const member = teamMembers[name];

if (member && member.projects.length > 0) {

    member.projects.forEach(project => {

        projectsContainer.innerHTML += `
            <div class="project-item">

                <img src="${project.image}" class="project-image">

                <div class="project-content">

                    <h5>${project.title}</h5>

                    <p>${project.description}</p>

                    <div class="project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join("")}
                    </div>

                    <div class="project-buttons">

                        <a href="${project.live}" target="_blank">
                            <i class="fas fa-globe"></i>
                            Live Demo
                        </a>

                        <a href="${project.github}" target="_blank">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>

                    </div>

                </div>

            </div>
        `;

    });

} else {

    projectsContainer.innerHTML = `
        <div class="project-item">
            <h5>Example Project</h5>
            <p>Coming Soon...</p>
        </div>
    `;

}


    }

    function closeModal() {
        document.getElementById('profileModal').style.display = 'none';
    }

    // Close the modal seamlessly if user clicks anywhere outside the card box
    window.onclick = function(event) {
        const modal = document.getElementById('profileModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    document.querySelectorAll(".team-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

card.style.setProperty("--x",`${e.clientX-rect.left}px`);

card.style.setProperty("--y",`${e.clientY-rect.top}px`);

});

});


const teamMembers = {

    "Khian D. Bustamante":{

        projects:[

            {
                title:"YKB Clothing",
                description:"Modern Ecommerce Website",
                image:"images/projects/ykb.png",
                live:"khian-ecommerce/index.html",
                github:"https://github.com/yourusername/YKB",
                tech:[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "Node.js",
                    "Express",
                    "MySQL"
                ]
            },

            {
                title:"AI Photo Editor",
                description:"AI Image Enhancement",
                image:"images/projects/ai.png",
                live:"#",
                github:"#",
                tech:[
                    "HTML",
                    "CSS",
                    "JavaScript"
                ]
            }

        ]

    },

    "Chrisjohn B. Pacay":{

        projects:[

            {
                title:"Inventory System",
                description:"Inventory Management",
                image:"images/projects/inventory.png",
                live:"#",
                github:"#",
                tech:[
                    "React",
                    "Node.js",
                    "MongoDB"
                ]
            }

        ]

    },

    "Weejay P. Regalla":{

        projects:[

            {
                title:"Example Project",
                description:"Coming Soon",
                image:"images/example.png",
                live:"#",
                github:"#",
                tech:["Coming Soon"]
            }

        ]

    },

    "Euline M. Refamonte":{

        projects:[

            {
                title:"Example Project",
                description:"Coming Soon",
                image:"images/example.png",
                live:"#",
                github:"#",
                tech:["Coming Soon"]
            }

        ]

    }

};