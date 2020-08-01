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
        else{
            return (
                <div></div>
            )
        }
    }
   
    renderComments(dish) {
        Moment.locale('en');
        if(dish != null){ 
            const comp = dish.comments.map((comm) => {
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
                </div>
            );
        }
        else{
            return (
                <div className="col-12 col-md-5 m-1">
                </div>
            );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">  
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}    
                </div>
            </div>
        );
    }
}

export default DishDetail;