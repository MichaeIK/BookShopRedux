


export default function fetchData(category, keyword, startIndex = 0) {
    _fetch = _fetch.bind(this);
    console.log(" FETCH >>>>>> ", category, keyword, startIndex);
    if(category != "search") {
        // console.log("FETCH >>>> ", this)        
        return _fetch(category, startIndex);
    } else {
        return _fetch(keyword, startIndex);
    }
}

function _fetch(_search, _index) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${_search}&maxResults=3&startIndex=${_index}&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
        .then(res => res.json())
        .then(res => {
            // console.log('category >>> ', keyword);
            this.props.fetchBooks(res.items, _search);
        })
        .catch(err => console.log('ERROR: ', err));

}


//  export default function fetchData(keyword, startIndex = 0) {
//     console.log('this.props from fetch', this.props, keyword, startIndex)
//     keyword = keyword 
//         ? keyword 
//         : this.props.match.params.category 
//             ? this.props.match.params.category 
//             : 'monkey';
    
//         // console.log(this.);
//     if(this.props.data && this.props.history.location.state != "search") {
//         console.log("?some category? >>>>> ", this.props.data, this.props.history.location.state, keyword);
        
//         let current = this.props.data.find((item, i) => Object.keys(item)[0] == keyword);
//         current = current === undefined ? {"search": []} : current;

//         if(this.props.match.url === "/") {
//             console.log("URL === /", keyword)
//             // keyword = "React";
//         }

//         console.log(current[Object.keys(current)[0]].length);
//         if(current) {
//             fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyDpm9brtHcnYBrtHeGp7oa2nHeGwo5LQXI&country=UA`)
//                 .then(res => res.json())
//                 .then(res => {
//                     console.log('category >>> ', keyword);
//                     this.props.fetchBooks(res.items, this.props.category);
//                 })
//                 .catch(err => console.log('ERROR: ', err));
//         }
//     } else {
//         console.log("?search? >>>>> ", this.props.data, this.props.history.location.state);

//         fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyDpm9brtHcnYBrtHeGp7oa2nHeGwo5LQXI&country=UA`)
//             .then(res => res.json())
//             .then(res => {
//                 this.props.fetchBooks(res.items, "currentSearch");
//             })
//             .catch(err => console.log('ERROR: ', err));
//     }
    
// }
