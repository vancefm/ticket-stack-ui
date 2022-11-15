import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const TicketEdit = () => {
     const initialFormState = {
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
    const [ticket, setTicket] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/ticket/${id}`)
                .then(response => response.json())
                .then(data => setTicket(data));
        }
    }, [id, setTicket]);

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

        setTicket(initialFormState);
        navigate('/ticket');
    }

    const title = ticket.id ? <h2>Edit Ticket {ticket.id}</h2> : <h2>Create TIcket</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" value={ticket.subject || ''}
                               onChange={handleChange} autoComplete="subject"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={ticket.description || ''}
                               onChange={handleChange} autoComplete="description"/>
                    </FormGroup>

                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="ticketId">Ticket ID</Label>
                            <Input type="text"  name="ticketId" id="ticketId" value={ticket.id || ''}
                                   onChange={handleChange} autoComplete="ticketId" readOnly disabled/>
                        </FormGroup>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="contactId">Contact ID</Label>
                            <Input type="text" name="contactId" id="contactId" value={ticket.contactId || ''}
                                   onChange={handleChange} autoComplete="contactId"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="statusId">Status ID</Label>
                            <Input type="text" name="statusId" id="statusId" value={ticket.statusId || ''}
                                   onChange={handleChange} autoComplete="statusId"/>
                        </FormGroup>
                    </div>
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