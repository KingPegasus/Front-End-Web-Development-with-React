import React, { Component}  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, BreadcrumbItem,
    Modal, ModalHeader, ModalBody,
    FormGroup, Label } from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
    }
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log(values);
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment);        
    }

    render(){
        return(
            <React.Fragment>
            <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model='.rating' type="select" id='rating' name="rating" 
                                innerRef={(input) => this.rating = input} className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select >
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="yourname">Your Name</Label>
                            <Control.text model='.yourname' id="yourname" name="yourname"
                                innerRef={(input) => this.yourname = input}
                                className="form-control"
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}  
                            />
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model='.comment' type="textarea" id="comment" name="comment" rows="6"
                                innerRef={(input) => this.comment = input}  className="form-control"/>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish( {dish} ) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card> 
        </div>         
    );
}

function RenderComments( {comments, postComment, dishId} ) {
    Moment.locale('en');
    if(comments != null){ 
        const comp = comments.map((comm) => {
            const date = Moment(comm.date).format('MMM D, YYYY')
            return (
                <ul key={comm.id} className="list-unstyled">
                    <li>{comm.comment}</li>
                    <li>--{comm.author} , {date}</li>
                </ul>
            );
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comp}
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    }
    else{
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 

    
    if(props.dish) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} 
                        postComment={props.postComment} 
                        dishId={props.dish.id}/>
                </div>
            </div>
        );

    }
    else {
        return(<div></div>);
    }
};


export default DishDetail;