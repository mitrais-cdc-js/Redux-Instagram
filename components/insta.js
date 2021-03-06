import React from 'react';
import { Link } from 'react-router';

let nolike = {
    color: 'black'
};
let withlike = {
    color: 'red'
};

class Insta extends React.Component {
    componentDidMount () {
        const { login, onLoad } = this.props;
        onLoad(login.accesstoken);
    }
    render () {
        const { pictures, onLikeClick, onDislikeClick, onLogout, login } = this.props;
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <a className="navbar-brand" href="/#/"><b>fakestagram</b></a>
                        </div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a onClick={() => onLogout()} className="btn btn-danger navbar-btn" href="#"><span className="glyphicon glyphicon-log-out"/>&nbsp;Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="x_content">
                    <br />
                    <div className="row">
                        {pictures.map((pic, i) =>
                            <div key={pic.id} className="col-sm-6 col-md-4">
                                <div className="thumbnail">
                                    <div className="img">
                                        <img src={pic.src} height="250" width="250" /></div>
                                    <div className="caption">
                                        <p>{pic.desc}</p>
                                        <br />
                                        <p><button onClick={pic.liked ? () => onDislikeClick(pic, login.accesstoken) : () => onLikeClick(pic, login.accesstoken)} href="#" className="instabtn btn btn-default" role="button">
                                            <span style={pic.liked ? withlike : nolike}><b>{pic.likes}</b>&nbsp;<span className="glyphicon glyphicon-heart"/></span></button>
                                            <Link to={{ pathname: '/view', query: { id: pic.id } }} className="instabtn btn btn-default">
                                                <b>{pic.comments_amt}</b>&nbsp;
                                        <span className="glyphicon glyphicon-comment"/></Link></p>
                                    </div>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            </div>
        );
    }
}

Insta.propTypes = {
    pictures: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        src: React.PropTypes.string.isRequired,
        desc: React.PropTypes.string.isRequired,
        likes: React.PropTypes.number.isRequired,
        comments_amt: React.PropTypes.number.isRequired
    }).isRequired).isRequired,
    onLikeClick: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default Insta;
