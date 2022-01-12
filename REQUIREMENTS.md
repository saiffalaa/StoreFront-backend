# API Requirements

## API Endpoints

#### Products

- Index --> GET http://localhost:3000/product
- Show --> GET http://localhost:3000/product/:id
- Create [token required]--> POST http://localhost:3000/product

#### Users

- Index [token required]--> GET http://localhost:3000/users
- Show [token required]--> GET http://localhost:3000/users/:id
- Create --> POST http://localhost:3000/users/signup

#### Orders

- Current Order by user (args: user id)[token required]--> GET http://localhost:3000/active/user/:id
- [OPTIONAL] Completed Orders by user (args: user id)[token required]--> GET http://localhost:3000/completed/user/:id

## Data Shapes

#### Product

- id -->number
- name -->string
- price -->string
- [OPTIONAL] category -->string

#### User

- id -->number
- firstName -->string
- lastName -->string
- password -->string

#### Orders

- id -->number
- user_id -->string
- status of order (active or complete)-->string

#### order_products

- id --> number
- order_id -->number
- id of each product in the order -->string
- quantity of each product in the order -->number
