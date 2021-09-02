// search Input fild 
const searchInput = document.getElementById('searchInput')
// search btn 
const searchBtn = document.getElementById('search-btn')
// error handalling
const errors = document.getElementById('error');
// spinner
const spinner = document.getElementById('spinner');
// book container 
const bookContainer = document.getElementById('book-container')

searchBtn.addEventListener('click',loadBook)


function loadBook(){
    const searchText = searchInput.value;
    // errors handal empty search Input 
    if(searchText === ""){
      errors.innerText = "Search fild cannot be empty"
      return;
    }
    else{
      errors.textContent = '';
    }
    // clear 
    searchInput.value = '';
    bookContainer.textContent = '';

    spinner.classList.remove('d-none')
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs))
    .finally(() => spinner.classList.add('d-none'))
}

// Show Result 
const showResult = data => {

  const searchResultDiv = document.getElementById("error");
  searchResultDiv.innerHTML = '';


  if (data > 0) {
      searchResultDiv.innerHTML = ` <h4>Search Result : ${data.length} items </h4>`
  }
  else {
      searchResultDiv.innerHTML = ` <h4>No Items Found </h4>`
  }
}




const displayBook = data => {

  // Serch Item Result Here
  showResult(data.docs)

   data.forEach(book =>{
        console.log(book)
        const{title,author_name,first_publish_year,publisher} = book;

        const notFound = "Not-Found";
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        
        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
      <img
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
        class="w-100"
        alt=""
      />
    </div>
    
    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
    >
      <h5>Book-name: <span class="text-info">${title?title:notFound}</span></h5>
      <p>Author-name: <span class="text-info">${author_name?author_name:notFound}</span> </p>
      <h5>Publish-year: <span class="text-info">${first_publish_year?first_publish_year:notFound}</span></h5>
      <p>Publisher: <span class="text-info">${publisher?publisher:notFound}</span></p>
    </div>
  `
  bookContainer.appendChild(div)
    })
  
  }