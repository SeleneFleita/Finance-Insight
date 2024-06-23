const btn = document.getElementById('button');

document.getElementById('contact-form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_u1l8bqy';
  const errorElement = document.getElementById('error');

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      errorElement.textContent = "enviado";
      
    }, (err) => {
      btn.value = 'Send Email';
      (JSON.stringify(err));
      errorElement.textContent = JSON.stringify(err);
    });
});