const btn = document.getElementById('submitButton');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';
   btn.disabled = true;

   const serviceID = 'default_service';
   const templateID = 'template_4jy2yu9';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      btn.disabled = false;
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      btn.disabled = false;
      alert(JSON.stringify(err));
    });
});