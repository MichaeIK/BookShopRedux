

 export function fetchData(keyword) {
    console.log(this.props)
    keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
    console.log('keyword from fetch data', keyword);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&startIndex=1&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
        .then(res => res.json())
        .then(res => {
            console.log('res.items from fetchbooks', res.items)
            this.props.fetchBooks(res.items, keyword);
            this.props.changeActiveCategory(keyword);
        })
        .catch(err => console.log(err))
}
