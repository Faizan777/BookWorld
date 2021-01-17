import React,{useState} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const API_URL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json";

export function refreshPage() {
  window.location.reload(false);
}

class BookDisplay extends React.Component {
    constructor(props){

   super(props);
   this.addtocart = this.addtocart.bind(this)
    }
    state = {
        users: []
    }

    
      
    
    MarkUpdate=(id,message)=> {
      const result = window.prompt("Please let us know when you are planning to purchase ? [Optional]",message);
        let userObject = {
            communication: result
        
        };
     
           
      axios.put(`${API_URL}/api/mark_lead/${id}`, userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState ({
            communication : " "

        })
        
    }  
  
    addtocart(id) {
      axios.put(`${API_URL}/${id}`)
          .catch(err => console.warn(err));
         
        }
        check(id,isbn)
        {
            console.log(id);
            alert(isbn);
        }
componentDidMount() {
        const url = `${API_URL}`;
        axios.get(url).then(response => response.data)
        .then((data) => {
          this.setState({ users: data })
          console.log(this.state.users)
          
         })
      } 
    render() {
        return ( 
                      <div className="container">
              <div className="py-4">
                <h1></h1>
                <table class="table border shadow">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Book Title</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">Rating</th>
                      <th scope="col">Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.users.map((user) => (
                      <tr>
                        <td>{user.title}<Button variant="light"
                        onClick={(e) => {this.check(user.bookID,user.isbn)}}>By {user.authors}</Button></td>
                  <td></td>
                        <td></td>
                  <td>
                  
                      
                      
                      {user.average_rating}
                      <Dropdown>
  <Dropdown.Toggle variant="link" id="dropdown-basic">
    Know More
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item >Book ID :{user.bookID} </Dropdown.Item>
    <Dropdown.Item >Language : English</Dropdown.Item>
    <Dropdown.Item >Rating Count:{user.ratings_count}</Dropdown.Item>
    <Dropdown.Item >ISBN:{user.isbn}</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                      
                      
                      
                      
                      </td>
                  <td>{user.price}</td>
                        <td><button type="button"  class="btn btn-success" data-toggle="modal" data-target="delete"
                         button onClick={(e) => { if (window.confirm('Added in Cart')
                         ) this.addtocart(user.id);}}
                                                  >Add to Cart</button>
                                                  &nbsp;&nbsp;&nbsp;
                                                  
                        <button type="button"  class="btn btn-danger" data-toggle="modal"
                         data-target="Update"
                         button onClick={(e) => {this.MarkUpdate(user.id,user.communication);}}
                                                  > Add to Wishlist&nbsp;&nbsp;&nbsp;&nbsp;</button> </td>
                                                  
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );}}
export default BookDisplay

