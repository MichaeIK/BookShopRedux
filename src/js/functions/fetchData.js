

 export default function fetchData(keyword, startIndex = 0) {
    console.log('this.props from fetch', this.props, keyword)
    keyword = keyword 
        ? keyword 
        : this.props.match.params.category 
            ? this.props.match.params.category 
            : 'monkey';
    
        // console.log(this.);
    if(this.props.data && this.props.history.location.state != "search") {
        console.log("?some category? >>>>> ", this.props.data, this.props.history.location.state, keyword);
        
        let current = this.props.data.find((item, i) => Object.keys(item)[0] == keyword);
        current = current === undefined ? {"temporary": []} : current;

        // console.log(current[Object.keys(current)[0]].length);
        if(current && current[Object.keys(current)[0]].length === 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyDpm9brtHcnYBrtHeGp7oa2nHeGwo5LQXI&country=UA`)
                .then(res => res.json())
                .then(res => {
                    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa');
                    this.props.fetchBooks(res.items, keyword);
                })
                .catch(err => console.log('ERROR: ', err));
        }
    } else {
        console.log("?search? >>>>> ", this.props.data, this.props.history.location.state);

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyDpm9brtHcnYBrtHeGp7oa2nHeGwo5LQXI&country=UA`)
            .then(res => res.json())
            .then(res => {
                this.props.fetchBooks(res.items, "currentSearch");
            })
            .catch(err => console.log('ERROR: ', err));
    }
    
}
