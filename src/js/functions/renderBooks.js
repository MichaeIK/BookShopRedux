import React from 'react';

export function renderBooks(item, index) {
    // console.log('item.volumeInfo.imageLinks.smallThumbnail', item.volumeInfo.imageLinks.smallThumbnail);
    let src = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ? 
                item.volumeInfo.imageLinks.smallThumbnail : 
                '../../assets/img/book_default.jpg';

    let price = item.saleInfo.retailPrice ? 
    `${item.saleInfo.retailPrice.amount} UAH` : 
    'FREE';

    let author = item.volumeInfo.authors  ? item.volumeInfo.authors.length >1 ? item.volumeInfo.authors[0]+' ...' : item.volumeInfo.authors[0] : "-";
   
    let authorDisplay = author.substring(0,15);
    let title = item.volumeInfo.title.substring(0,30);

    let stars = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : 0;
     

    return (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
            <div className="card" onClick={this.handleClick.bind(null, item.id, item)}>
                <img className="card-img-top" src={src} />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">Author: <span>{authorDisplay}</span></p>
                    <p className="card-text">Categorie: <span>{item.volumeInfo.categories}</span></p>
                    <p className="card-text">Rating: <span>{stars}</span></p>
                </div>
            </div>
                <div className="price-block">
                    <p className="card-text price">{price}</p>
                    <button className="btn-default btn-success" onClick={this.handleBuy.bind(null, item)}>BUY</button>
                </div>

        </div>
    )
}