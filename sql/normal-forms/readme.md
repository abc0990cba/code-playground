### Normalization
___
#### Terms:
An **attribute** is a property of some entity. Often called a table field.

The **attribute domain** is the set of valid values that an attribute can take.

A **tuple** is a finite set of interrelated valid attribute values that together describe some entity (a table row).

A **relation** is a finite set of tuples (table).

A **relationship schema** is a finite set of attributes defining some entity. In other words, it is the structure of a table consisting of a specific set of fields.

**Projection** is a relation obtained from a given one by removing and (or) rearranging some attributes.

**Functional relationship** between attributes (sets of attributes) X and Y means that for any valid set of tuples in this respect: if two tuples match in the value of X, then they match in the value of Y. For example, if the value of the "Company Name" attribute is Canonical Ltd, then the value of the "Headquarters" attribute in such a tuple will always be Millbank Tower, London, United Kingdom. Notation: {X} -> {Y}.

The **normal form** is a requirement imposed on the structure of tables in the theory of relational databases to eliminate redundant functional dependencies between attributes (fields of tables) from the database.

The **method of normal forms (NF)** consists in collecting information about the objects of solving a problem within a single relationship and then decomposing this relationship into several interrelated relationships based on relationship normalization procedures.

The **purpose of normalization** is to eliminate excessive duplication of data, which is the cause of anomalies that occurred when adding, editing and deleting tuples (table rows).

An **anomaly** is a situation in the database table that leads to a contradiction in the database or significantly complicates the processing of the database. The reason is excessive duplication of data in the table, which is caused by the presence of functional dependencies on non-key attributes.

**Anomalies-modifications** are manifested in the fact that a change in some data may entail viewing the entire table and a corresponding change in some records of the table.

**Anomalies-deletions** — when deleting any tuple from the table, information that is not directly related to the record being deleted may disappear.

**Anomalies-additions** occur when information cannot be placed in a table until it is complete, or inserting a record requires additional viewing of the table.
___

### 1NF
First Normal Form (1NF): This is the most basic level of normalization. In 1NF, each table cell should contain only a single value, and each column should have a unique name. The first normal form helps to eliminate duplicate data and simplify queries.

##### Does not satisfy 1NF        
| Company | Model       |         
|---------|-------------|    
| BMW     | M5, X5M, M1 |          
| Nissan  | GT-R        |         
                                  
##### Satisfy 1NF     
| Company | Model |                             
|---------|-------|
| BMW     | M5    |
| BMW     | X5M   |
| BMW     | M1    |
| Nissan  | GT-R  |
___

### 2NF
Second normal form eliminates redundant data by requiring that each non-key attribute be dependent on the primary key. This means that each column should be directly related to the primary key, and not to other columns.

A relation is in 2NF if it is in 1NF and each non-key attribute irreducibly depends on the Primary Key(PC).

**Irreducibility** means that there is no smaller subset of attributes in the potential key, from which this functional dependence can also be derived.

##### Satisfy 1NF, but does not satisfy 2NF        
| Model | Company | Price   | Discount |                            
|:------|:--------|--------:|---------:|
| M5    |	BMW     | 5500000 | 5%       |
| X5M	  | BMW	    | 6000000 | 5%       |
| M1	  | BMW     | 2500000 | 5%       |
| GT-R	| Nissan  | 5000000 | 10%      |

The price of the car depends on the model and company. The discount depends on the company, that is, the dependence on the primary key is incomplete. This is corrected by decomposing into two relationships in which non-key attributes depend on the PK.

##### Satisfy 2NF
| Model | Company | Price   |
|:------|:--------|--------:|
| M5    |	BMW     | 5500000 |
| X5M	  | BMW	    | 6000000 |
| M1	  | BMW     | 2500000 |
| GT-R	| Nissan  | 5000000 |

| Company | Discount |                            
|:--------|---------:|
|	BMW     | 5%       |
| BMW	    | 5%       |
| BMW     | 5%       |
| Nissan  | 10%      |