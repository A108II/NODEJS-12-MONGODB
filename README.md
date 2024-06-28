# CRUD Operations in Node.js Using MongoDB

This guide explains how to perform CRUD (Create, Read, Update, Delete) operations in a Node.js application using MongoDB with Mongoose and Express.

## Tools
- Thunder client to make request

## Create Operation

**Purpose:** Add a new resource to the database.

**How it works:**
1. Send an HTTP POST request to the server.
2. The server receives the data, creates a new instance of the resource, and saves it to the MongoDB database.
3. The server responds with a confirmation or the created resource.

## Read Operation

**Purpose:** Retrieve existing resources from the database.

**How it works:**
1. Send an HTTP GET request to the server.
2. The server queries the database and retrieves the requested data.
3. The server sends the retrieved data as the response.

## Update Operation

**Purpose:** Modify an existing resource in the database.

**How it works:**
1. Send an HTTP PUT request to the server with the updated data.
2. The server finds the resource in the database and updates it with the new data using ID.
3. The server saves the changes and responds with the updated resource or a confirmation.

## Delete Operation

**Purpose:** Remove a resource from the database.

**How it works:**
1. Send an HTTP DELETE request to the server with specific ID.
2. The server finds the resource in the database and deletes it.
3. The server responds with a confirmation of the deletion.