import React, { Component}  from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, BreadcrumbItem,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                            <Input type="select" id='rating' name="rating" 
                                innerRef={(input) => this.rating = input}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
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
                            <Input type="textarea" id="comment" name="comment" rows="6"
                                innerRef={(input) => this.comment = input}  />
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
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card> 
        </div>         
    );
}

function RenderComments( {comments} ) {
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
                <CommentForm />
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
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );

    }
    else {
        return(<div></div>);
    }
};


export default DishDetail;