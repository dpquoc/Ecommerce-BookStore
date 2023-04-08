<?php

require_once __DIR__ . '/../model/ContactModel.php';

class ContactController {
    
    public function createContact($idRoute = null, $queryParams, $postData, $fromUser) {
        $contact = new ContactModel();
        $allowedKeys = ['id', 'fullname', 'email', 'title', 'message'];
        if ($contact->create($postData, $allowedKeys)) {
            http_response_code(201);
            return array(
                "status" => "success",
                "message" => "Contact created successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to create contact. Please check your data and try again."
            );
        }
    }

    public function getContacts($idRoute = null, $queryParams, $postData, $fromUser) {
        $contact = new ContactModel();
        $allowedKeys = ['id', 'fullname', 'email', 'title'];
        $select = ['id', 'fullname', 'email', 'title', 'message'] ;

        $contacts = $contact->read($queryParams, $allowedKeys , $select);
        if (!empty($contacts)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $contacts
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "No contacts found."
            );
        }
    }

    public function getSingleContact($idRoute = null, $queryParams, $postData, $fromUser) {
        $contact = new ContactModel();
        $contacts = $contact->read(['id' => $idRoute]);
        if (!empty($contacts)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "data" => $contacts[0]
            );
        } else {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Contact not found."
            );
        }
    }


    public function updateContact($idRoute = null, $queryParams, $postData, $fromUser) {
        $contact = new ContactModel();
        $allowedKeys = ['fullname', 'email', 'title', 'message'];
        if ($contact->update($idRoute,$postData, $allowedKeys)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Contact updated successfully."
            );
        } else {
            http_response_code(400);
            return array(
                "status" => "error",
                "message" => "Unable to update contact. Please check your data and try again."
            );
        }
    }

    public function deleteContact($idRoute = null, $queryParams, $postData, $fromUser) {
        $contact = new ContactModel();

        // Check if contact with the given ID exists
        $existingContact = $contact->read(['id' => $idRoute]);
        if (!$existingContact) {
            http_response_code(404);
            return array(
                "status" => "error",
                "message" => "Contact not found."
            );
        }
        
        if ($contact->delete($idRoute)) {
            http_response_code(200);
            return array(
                "status" => "success",
                "message" => "Contact deleted successfully."
            );
        } else {
            http_response_code(500);
            return array(
                "status" => "error",
                "message" => "Unable to delete contact. Please try again later."
            );
        }
    }
}

?>
