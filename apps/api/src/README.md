# Folder Structure

## Controllers
Controllers handle route responses. They are responsible for processing incoming requests, invoking the appropriate service methods, and returning the correct responses.

## DAOs (Data Access Objects)
DAOs manage interactions with the database. They provide methods for querying and updating the database, abstracting the underlying database operations.

## lib
The `lib` folder contains utility functions and libraries that are used throughout the application. These are generally reusable components that do not fit into other categories.

## Middleware
Middleware functions are used to process requests before they reach the controllers. They can be used for tasks such as authentication, logging, and request validation.

## Models
Models represent the structure of the database tables. Each model corresponds to a single table and defines the schema and relationships for that table.

## Scripts
Scripts are automated processes that perform tasks such as database migrations, data seeding, or scheduled jobs.

## Services
Services contain business logic that interacts with two or more models. They encapsulate the core functionality of the application and are used by controllers to perform complex operations.
