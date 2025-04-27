// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll down button
document.querySelector('.scroll-down').addEventListener('click', () => {
    window.scrollBy({
        top: window.innerHeight - 100,
        behavior: 'smooth'
    });
});

// Handle click on the drop area to trigger file input
document.getElementById('drop-area').addEventListener('click', () => {
    document.getElementById('file-input').click();
});

// Handle file input change event
document.getElementById('file-input').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        previewImage(file);
    }
});

// Handle paste event for image files
document.addEventListener('paste', (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            previewImage(file);
            break;
        }
    }
});

// Handle drag-and-drop functionality
const dropArea = document.getElementById('drop-area');
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('drag-over');
    const file = event.dataTransfer.files[0];
    if (file) {
        previewImage(file);
    }
});

// Function to preview the uploaded image
function previewImage(file) {
    const img = document.getElementById('preview');
    const reader = new FileReader();

    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
    }

    reader.onload = (event) => {
        img.src = event.target.result;
        img.style.display = 'block';
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.5s ease-in-out';
        }, 50);
    };

    reader.readAsDataURL(file);
}

// Modal functions
function showInfo(disease) {
    const modal = document.getElementById('diseaseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // Set modal title
    modalTitle.textContent = disease;
    
    // Set modal content (in a real app, this would come from an API or database)
    const diseaseInfo = {
        'Cellulitis': 'Cellulitis is a common bacterial skin infection that causes redness, swelling, and pain in the affected area.',
        'Impetigo': 'Impetigo is a highly contagious skin infection that mainly affects infants and children, causing red sores on the face.',
        'Athlete-Foot': 'Athlete\'s foot is a fungal infection that usually begins between the toes, causing itching, burning, and cracked skin.',
        'Nail-Fungus': 'Nail fungus is a common condition that begins as a white or yellow spot under the tip of your fingernail or toenail.',
        'Ringworm': 'Ringworm is a fungal infection that causes a ring-shaped rash on the skin, which can be itchy and red.',
        'Cutaneous-larva-migrans': 'Cutaneous larva migrans is a parasitic skin infection caused by hookworm larvae that burrow into the skin.',
        'Chickenpox': 'Chickenpox is a highly contagious disease caused by the varicella-zoster virus, characterized by an itchy, blister-like rash.',
        'Shingles': 'Shingles is a viral infection that causes a painful rash, occurring in people who have had chickenpox in the past.'
    };
    
    modalContent.innerHTML = `
        <p>${diseaseInfo[disease]}</p>
        <div class="modal-actions">
            <button onclick="closeModal()" class="modal-close-btn">Close</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('diseaseModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('diseaseModal');
    if (event.target === modal) {
        closeModal();
    }
});