const suggestions = document.querySelector('ul');
const input = document.querySelector('input');
const suggestApi = document.querySelector('#suggest');
const directions = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft'];
let apiAccess = null;
let sIndex = 0;

document.body.addEventListener('click', e => {
    e.preventDefault();
    input.focus();
    removeSuggestions();
})

function updateSearch( term ) {
    let t = term;
    let url = `https://www.google.com/complete/search?client=hp&hl=hu&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q=${t}&xhr=t&callback=listener`;

    removeItem(apiAccess);
    apiAccess = document.createElement('script');
    apiAccess.src = url;
    document.body.appendChild(apiAccess);
}

input.addEventListener('keyup', e => {
    const value = input.value;
    if( e.key.length === 1 && e.ctrlKey == false ) {
        console.log(e)
        updateSearch(value);
    }

    if( e.key == 'Enter' ) {
        let url = 'https://www.google.hu/search?site=&source=hp&q=' + input.value;
        window.location.href = url;
    }

    if( e.key == 'ArrowDown' ) {
        highlightSuggestion();
    }
});

function listener( rsp ) {
    const suggestedListElements = rsp[1].map( item => `<li>${item[0]}</li>`);
    suggestions.innerHTML = '';
    suggestions.innerHTML = suggestedListElements.join('');
}

function highlightSuggestion() {
    const suggList = document.querySelectorAll('li');
    suggList.forEach( element => {
        element.classList.remove('active');
    });
    suggList[sIndex].classList.add('active');
    input.value = suggList[sIndex].innerText;
    sIndex += 2;
    sIndex = ( sIndex/2 == suggList.length/2 ) ? 1 : sIndex;
    sIndex = ( sIndex >= suggList.length ) ? 0 : sIndex;
}

function removeSuggestions() {
    suggestions.innerHTML = '';
}

function removeItem( node ) {
   if( node ) {
        document.body.removeChild(node);
   }
}
