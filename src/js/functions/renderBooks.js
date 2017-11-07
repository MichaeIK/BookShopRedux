import React from 'react';

export function renderBooks(item, index) {
    // console.log('item.volumeInfo.imageLinks.smallThumbnail', item.volumeInfo.imageLinks.smallThumbnail);
    let src = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ? 
                item.volumeInfo.imageLinks.smallThumbnail : 
                '../../assets/img/book_default.jpg';
    // console.log('src', src);
    let url = {
        backgroundImage: `url(${src})`
    };
    let urlPrice = {
        backgroundImage: 'url(../../assets/img/price.png)'
    }
    let urlCart = {
        backgroundImage: 'url(../../assets/img/icons8-buy.png)'
    }
    let price = item.saleInfo.retailPrice ? 
    `${item.saleInfo.retailPrice.amount} UAH` : 
    'FREE';
    let stars = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : 0;
    return (
        <div key={index} className="col-sm-6 col-md-3 book-wrapper" onClick={this.handleClick.bind(null, item.id, item)}>
            <div className="book-image" style={url}></div>
            <div className="middle-layer"></div>
            <div className="book-info">
                <div className="book-title toggle-info">{item.volumeInfo.title}</div>
                <div className="book-pages toggle-info">Pages: {item.volumeInfo.pageCount}</div>
                <div className="book-category toggle-info">Category: {item.volumeInfo.categories}</div>
                <div className="book-category toggle-info">Stars: {stars}</div>
                <div className="col-sm-2 book-stars toggle-info"></div>
                <div className="book-card-footer toggle-info">
                    <div className="price-block">
                        <div className="price-image" style={urlPrice}></div>
                        <div className="price-value">{price}</div>
                    </div>
                    <div className="cart-block">
                        <div className="price-image" style={urlCart}></div>
                        <div className="price-value">BUY</div>
                    </div>
                </div>
            </div>

        </div>
    )
}