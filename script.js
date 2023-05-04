const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data)
    fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            alert("Submitted succesfully! ");
            form.reset();
        })
        .catch(error => console.error(error));
});