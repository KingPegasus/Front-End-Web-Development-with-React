import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Moment from 'moment';
import { Link } from 'react-router-dom';


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
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            );

        }
        else {
            return(<div></div>);
        }
    };


export default DishDetail;