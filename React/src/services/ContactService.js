
class ContactService {

    getContacts() {
        return fetch("/contacts");
    }

    // populateData() {
    //     for (let i = 0; i < 80; i++) {
    //         fetch("https://swapi.dev/api/people/" + i.toString() + "/?format=json")
    //             .then(res => res.json())
    //             .then(data => {
    //                 let name = data.name;
    //             });
    //     }
    //     ContactService.createContact(contact)
    //         .then(res => res.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }

    createContact(contact) {
        return fetch("/contacts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(contact)
        });
    }

    getContactById(contactId) {
        return fetch("/contacts" + '/' + contactId);
    }

    updateContact(contact, contactId) {
        return fetch("/contacts" + '/' + contactId, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(contact)
        });
    }

    deleteContact(contactId) {
        return fetch("/contacts" + '/' + contactId, {
            method: "DELETE",
        });
    }

    getUsers() {
        return fetch("/user");
    }

}

export default new ContactService();