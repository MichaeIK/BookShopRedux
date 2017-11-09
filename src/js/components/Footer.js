import React from 'react';

export default class Footer extends React.Component {

  // componentDidMount() {
  //   console.log('sdf',this.refs.footer.offsetTop)
  // }

    render() {
        return (
            <div className="footer" ref="footer">
            	<div className="col-md-2 col-sm-12 contact">
            		<p>&#9400; Dream Team</p>
            	</div>
            	<div className="col-md-3 col-sm-12"></div>
            	<div className="col-md-1 col-sm-12 contact">
            		<p>Contacts:</p>
            	</div>
            	<div className="col-md-2 col-sm-12 contacts">
            		<a href="tel:+38067000000000"><p>+38(067) 000 00 00</p></a>
            		<a href="tel:+38067000000000"><p>+38(067) 000 00 00</p></a>
            		<a href="mailto:123@dfg.dfg"><p>123@dfg.dfg</p></a>
            		
            	</div>
            	<div className="col-md-2 col-sm-12"></div>
              	<div className="col-lg-2 col-sm-12 social">
              		<a href="http://www.facebook.com"><img src="../../assets/img/fb.png" title="facebook" /></a>
              		<a href="https://www.instagram.com/"><img src="../../assets/img/ig.png" title="instagram" /></a>
              		<a href="https://plus.google.com"><img src="../../assets/img/g+.png" title="google+" /></a>
              		<a href="https://twitter.com"><img src="../../assets/img/tw.png" title="twitter" /></a>
              </div>
            </div>
        )
    }
}