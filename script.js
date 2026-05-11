// Simple Contact Form Message

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    alert('Thank you! Your message has been submitted successfully.');

    form.reset();
});