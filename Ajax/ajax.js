document.querySelector('#data-btn').addEventListener('click', loadData);

function loadData() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'data.txt', true);

  xhr.onload = function() {
    if (this.status === 200) {
      //console.log(this.responseText);
      document.querySelector('#output').innerHTML = `<h1>${
        this.responseText
      }</h1>`;
    }
  };
  xhr.onerror = function() {
    console.log('Response error...');
  };

  xhr.send();
}
