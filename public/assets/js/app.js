document.addEventListener('DOMContentLoaded', () => {
  const domain = `${window.location.origin}/images/`;
  const form = document.querySelector('.home__form');
  const imageSelect = form.querySelector('.home__form-image');
  const widthSelect = form.querySelector('.home__form-width');
  const heightSelect = form.querySelector('.home__form-height');
  const formatSelect = form.querySelector('.home__form-format');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const msgResponse = form.querySelector('.msg-response');
    const formData = {
      image: imageSelect.value,
      width: parseInt(widthSelect.value),
      height: parseInt(heightSelect.value),
      format: formatSelect.value,
    };
    const queryString = Object.keys(formData)
      .map(key => key + '=' + formData[key])
      .join('&');

    if (msgResponse) {
      msgResponse.remove();
    }

    fetch(`/images/?${queryString}`)
      .then(response => response.json())
      .then(data => {
        form.insertAdjacentHTML(
          'beforeend',
          `<div class="msg-response msg-response--success"><a href="${
            domain + data.image
          }" target="_blank">${domain + data.image}</a></div>`
        );
      })
      .catch(error => {
        form.insertAdjacentHTML(
          'beforeend',
          `<div class="msg-response msg-response--error">${error}</div>`
        );
      });
  });
});
