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
        document.getElementById('modalMail').href = "mailto:" + email.trim();

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