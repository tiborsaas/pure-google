const input = document.querySelector('input');
const suggestApi = document.querySelector('#suggest');
let apiAccess = null;

document.body.addEventListener('click', e => {
    e.preventDefault();
    input.focus();
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
});

function listener( rsp ) {
    console.log('response', rsp[1].map( item => {
        return item[0];
    }));
}

function removeItem( node ) {
   if( node ) {
        document.body.removeChild(node);
   }
}