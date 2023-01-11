import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import AppNavbar from './AppNavbar';


const TicketEdit = () => {
     const initialTicketFormState = {
         id: '',
         subject: '',
         contactId: '',
         requestCategoryId: '',
         description: '',
         statusId: '',
         createdTime:'',
         updatedTime:'',
         closedTime:''
     };
    const initialContactFormState = {
        id: '',
        emailAddress: '',
        firstName: '',
        lastName: ''
    };

    const [ticket, setTicket] = useState(initialTicketFormState);
    const [contact, setContact] = useState(initialContactFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        //Get existing ticket
        if (id !== 'new') {
            fetch(`/ticket/${id}`, {method : 'get'})
                .then(response => response.json())
                .then(ticketData => {
                    setTicket(ticketData);
                    const contactId = ticketData.contactId;
                    return fetch(`/contact/${contactId}`)
                        .then(response => response.json())
                        .then(contactData => setContact(contactData))
                });
        }



    }, [id,contact, setTicket, setContact]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setTicket({ ...ticket, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('/ticket/' + (ticket.id ? '/' + ticket.id : ''), {
            method: (ticket.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });

        setTicket(initialTicketFormState);
        navigate('/ticket');
    }

    const title = ticket.id ? <h2>Edit Ticket {ticket.id}</h2> : <h2>Create TIcket</h2>;



    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <FormGroup className="col-md-2 mb-3">
                            <Label for="ticketId">Ticket ID</Label>
                            <Input type="text" name="ticketId" id="ticketId" value={ticket.id || ''}
                                   onChange={handleChange} autoComplete="ticketId" readOnly disabled/>
                        </FormGroup>
                        <FormGroup className="col-md-2 mb-3">
                            <Label for="statusId">Status ID</Label>
                            <Input type="text" name="statusId" id="statusId" value={ticket.statusId || ''}
                                   onChange={handleChange} autoComplete="statusId"/>
                        </FormGroup>
                    </Row>

                    <FormGroup className="col-md-5 mb-3">
                        <Label for="contact">Contact</Label>
                        <Input type="text" name="contact" id="contact" value={contact.emailAddress || ''}
                               onChange={handleChange} autoComplete="contact"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" value={ticket.subject || ''}
                               onChange={handleChange} autoComplete="subject"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" value={ticket.description || ''}
                               onChange={handleChange} autoComplete="description"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/ticket">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default TicketEdit;