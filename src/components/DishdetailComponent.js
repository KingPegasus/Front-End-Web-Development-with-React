import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Moment from 'moment';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }

    renderDish(dish) {
        if (dish != null){
            return (
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>          
            );
        }
        else{
            return (
                <div></div>
            )
        }
    }
   
    renderComments(comments) {
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
            return comp;
        }
        else{
            return (
                <div><h5>No Comments</h5></div>
            );
        }
        
    }

    render() {
        
        return (
            <div className="row">
                
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(this.props.dish.comments)}    
                </div>
            </div>
        );
    }
}

export default DishDetail;