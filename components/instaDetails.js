import React from 'react'
import { Link } from 'react-router'
import { addPic } from '../actions'
import request from 'superagent'

require('superagent-auth-bearer')(request)

let buttonstyle = {
    width: '49.1%'
}
let editstylenone = {
    display: 'none'
}
let editstyleblock = {
    display: 'block'
}
let nolike = {
    color: 'black'
}
let withlike = {
    color: 'red'
}

var commentbox;
var editcommentdiv = []; //untuk dynamic control div
var editcommentbox = []; //untuk dynamic control textbox
var commenttext = []; //untuk dynamic control text commentnya

class InstaDetails extends React.Component {

    componentDidMount() {
        let { id, login, onLoad } = this.props
        onLoad(id, login.accesstoken)
    }
    componentWillUpdate(nextProps, nextState) {
        let { editcomment } = nextProps
        let { dispatch, login, onEditExecute } = this.props
        if (editcomment.id != undefined) {
            let i = editcommentdiv.findIndex(p => p.id == editcomment.id + '_div')
            let j = commenttext.findIndex(p => p.id == editcomment.id + '_span')

            if (editcomment.type == 'EDIT') { //on comment editing
                editcommentdiv[i].style.display = 'block'
                editcommentbox[i].value = nextProps.editcomment.text
                commenttext[j].style.display = 'none'
            }
            else if (editcomment.type == 'CANCEL') { //cancel comment editing
                editcommentdiv[i].style.display = 'none'
                editcommentbox[i].value = nextProps.editcomment.text
                commenttext[j].style.display = 'block'
            }
            else if (editcomment.type == 'SAVE') { //save comment editing
                editcommentdiv[i].style.display = 'none'
                commenttext[j].style.display = 'block'
                dispatch({
                    type: 'SAVE_COMMENT',
                    id: editcomment.id,
                    text: editcommentbox[i].value
                })
                onEditExecute(editcomment.id, login.accesstoken, editcommentbox[i].value)
            }
        }
    }
    componentWillUnmount() {
        const { dispatch, login } = this.props

        dispatch({ type: 'RESET_COMMENT_EDIT' })
        editcommentdiv = [];
        editcommentbox = [];
        commenttext = [];

    }
    render() {
        const { picture, comment, comments, login, onClick, onLikeClick, onUnlikeClick, onDeleteCommentClick,
            onEditClick, onCancelEditClick, onSaveCommentClick, onLogout } = this.props
        const { id } = picture
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                        <div className="navbar-header">

                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/#/"><b>fakestagram</b></a>
                        </div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li>  <Link to="/home" className="btn btn-primary navbar-btn"><span className="glyphicon glyphicon-circle-arrow-left"></span> Back</Link></li>
                                <li><a onClick={() => onLogout()} className="btn btn-danger navbar-btn" href="#"><span className="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="x_content">

                    <div className="row">
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                        <div className="col-xs-12 col-md-8">
                            <a href="#" className="thumbnail">
                                <img src={picture.src} alt="..." />
                            </a>
                            <p>{picture.desc}</p>
                        </div>
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                        <div className="col-xs-12 col-md-8">
                            <p><button onClick={picture.liked ? () => onUnlikeClick(picture, login.accesstoken) : () => onLikeClick(picture, login.accesstoken)} style={buttonstyle} className="instabtn btn btn-default">
                                <span style={picture.liked ? withlike : nolike}><b>{picture.likes}</b>&nbsp;<span className="glyphicon glyphicon-heart"></span></span></button>
                                <Link style={buttonstyle} to={{ pathname: '/view', query: { id: 0 } }} className="instabtn btn btn-default">
                                    <b>{picture.comments_amt}   </b>&nbsp;
                                        <span className="glyphicon glyphicon-comment"></span></Link></p>
                        </div>
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                    </div>

                    <div className="row">
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                        <div className="col-xs-12 col-md-8">
                            <div className="comments-list">
                                {comments.map((item, i) =>
                                    <div key={i} className="comment-main-level">
                                        <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt=""></img></div>
                                        <div className="comment-box">
                                            <div className="comment-head">
                                                <h6 className="comment-name by-author"><a href="#">{item.name}</a></h6>
                                                <span>{item.time}</span>

                                                <i onClick={() => onDeleteCommentClick(item, login.accesstoken)} className="fa fa-times"></i>
                                                <i onClick={() => onEditClick(item)} className="fa fa-pencil"></i>
                                            </div>
                                            <div className="comment-content">
                                                <div id={item.id + '_span'} ref={node => commenttext[i] = node} >{item.text}</div>
                                                <div id={item.id + '_div'} ref={node => editcommentdiv[i] = node} style={editstylenone}>
                                                    <input ref={node => editcommentbox[i] = node} type="text" id={item.id} className="form-control" placeholder="Edit comment..." />
                                                    <button id={item.id + '_save'} onClick={() => onSaveCommentClick(item.id)} className="btn btn-success"><span className="glyphicon glyphicon-floppy-disk"></span>&nbsp;Save</button>
                                                    <button id={item.id + '_cancel'} onClick={() => onCancelEditClick(item)} className="btn btn-danger"><span className="glyphicon glyphicon-remove"></span>&nbsp;Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                    </div>
                    <div className="row">
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                        <div className="col-xs-12 col-md-8">
                            <div className="widget-area no-padding blank">

                                <div className="status-upload">
                                    <textarea ref={node => commentbox = node} placeholder="What are you thinking about this picture?" ></textarea>

                                    <button type="submit" onClick={() => onClick(id, login.fullname, commentbox, login.accesstoken)} className="btn btn-success green"><i className="fa fa-share"></i> Share</button>

                                </div>

                            </div>
                        </div>
                        <div className="col-xs-0 col-md-2">&nbsp;</div>
                    </div>

                </div>
            </div>
        )
    }
}

InstaDetails.propTypes = {
    id: React.PropTypes.string.isRequired,
    comments: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        time: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onClick: React.PropTypes.func.isRequired,
    onLikeClick: React.PropTypes.func.isRequired,
    onDeleteCommentClick: React.PropTypes.func.isRequired,
    onEditClick: React.PropTypes.func.isRequired,
    onCancelEditClick: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default InstaDetails