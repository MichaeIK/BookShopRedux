

 export default function fetchData(keyword, startIndex = 0) {
    console.log('this.props from fetch', this.props, keyword)
    keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
    
    if(this.props.data) {
        let current = this.props.data.find((item, i) => Object.keys(item)[0] == keyword);
        // console.log(current[Object.keys(current)[0]].length);
        if(current && current[Object.keys(current)[0]].length === 0) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
                .then(res => res.json())
                .then(res => {
                    this.props.fetchBooks(res.items, keyword);
                })
                .catch(err => console.log('ERROR: ', err));
        }
    } else {
        // if()
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=3&startIndex=${startIndex}&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
            .then(res => res.json())
            .then(res => {
                this.props.fetchBooks(res.items, keyword);
            })
            .catch(err => console.log('ERROR: ', err));
    }
    
}
