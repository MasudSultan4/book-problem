// This function for load data
const loadData = () => {
  const inputValue = document.getElementById('inputField');
  const inputText = inputValue.value;
  // spinner
const spinner = document.getElementById('spinner');

  // this condition for checking valid input data
  if (inputText.length > 0) {
     spinner.classList.remove('d-none')
      const url = `https://openlibrary.org/search.json?q=${inputText}`
      fetch(url)
          .then(res => res.json())
          .then(data => displayData(data.docs, data.numFound))
          .finally(() => spinner.classList.add('d-none'))
  }
  else {
      document.getElementById('countResult').innerText = `Search fild cannot be empty`;
      document.getElementById('displayField').textContent = ''

  }
  inputValue.value = ''
  
}

// This Function Show Data in UI
const displayData = (books, totalDataFound) => {
  const displayField = document.getElementById('displayField')
  displayField.textContent = ''
  const countResult = document.getElementById('countResult')

  // it will validate data caount
  if (totalDataFound == 0) {
      countResult.innerText = 'No Result Found'
  }
  else {
      books.forEach(book => {
          // destrucuring from object
          const { title, author_name, first_publish_year, publisher, cover_i } = book;
          const imgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
          const displayCard = document.createElement('div')
          displayCard.classList.add('col')
          displayCard.innerHTML = `
              <div class="card cardHeight">
                  <img src="${imgUrl}" class="card-img-top img-fluid imgSize" alt="...">
                  <div class="card-body">
                  <h5 class="card-title">${title.slice(0, 30)}</h5>
                  <p>Author Name: <b>${author_name && author_name.slice(0,1)? author_name && author_name.slice(0,1): author_name}</b></b>
                  <p>First Publish: <b>${first_publish_year}</b></b>
                  <p>Publisher: <b>${publisher && publisher.slice(0,1)? publisher && publisher.slice(0,1): publisher}</b></b>
                  </div>
              </div>
      `
          displayField.appendChild(displayCard)
      });
      countResult.innerHTML = `<h3 class="text-success">We show you ${books.length} results of ${totalDataFound}</h3>`
  }

}