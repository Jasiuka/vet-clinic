-- CREATE TABLES
-- @block
CREATE TABLE Reviews(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(25) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    reviewText TEXT NOT NULL,
    stars TINYINT,
    reviewDate DATE,
    client INT,
    FOREIGN KEY (client) REFERENCES Clients(id)
);


-- @block
CREATE TABLE Pets(
    id INT PRIMARY KEY AUTO_INCREMENT,
    petName VARCHAR(50) NOT NULL,
    species VARCHAR(70) NOT NULL,
    breed VARCHAR(70) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    age TINYINT NOT NULL,
    petWeight INT NOT NULL,
    petOwner INT,
    FOREIGN KEY (petOwner) REFERENCES Clients(id)
);

-- @block 
CREATE TABLE Documents(
    id INT PRIMARY KEY AUTO_INCREMENT,
    sendDate DATE NOT NULL,
    sendTime TIME NOT NULL,
    docDescription VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    docUrl VARCHAR(255) NOT NULL,
    pet INT NOT NULL,
    FOREIGN KEY (pet) REFERENCES Pets(id)
);

-- @block
CREATE TABLE Appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    appointmentDate DATE NOT NULL,
    appointmentTime TIME NOT NULL,
    veterinarian INT NOT NULL,
    FOREIGN KEY (veterinarian) REFERENCES veterinarians(id),
    pet INT,
    FOREIGN KEY (pet) REFERENCES pets(id)
)

-- @block
CREATE TABLE Diagnosis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    diagnosisDate DATE NOT NULL,
    diagnosisDescription VARCHAR(255) NOT NULL,
    pet INT NOT NULL,
    FOREIGN KEY (pet) REFERENCES pets(id)
);

-- @block
CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    category INT NOT NULL,
    manufacturer INT NOT NULL,
    FOREIGN KEY (manufacturer) REFERENCES manufacturer(id),
    imagePath VARCHAR(255) NOT NULL

);

-- @block 
CREATE TABLE Manufacturer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mName VARCHAR(255) NOT NULL,
    mDescription VARCHAR(255)
);

-- @block
CREATE TABLE Services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    serviceDescription TEXT NOT NULL,
    price FLOAT NOT NULL

)

-- @block
CREATE TABLE ServicesCategories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    num INT NOT NULL,
    categoryName VARCHAR(255) NOT NULL
)

-- @block
CREATE TABLE CategoriesAndServicesJunction (
    serviceID INT,
    categoryID INT,
    PRIMARY KEY (serviceID,categoryID),
    FOREIGN KEY (serviceID) REFERENCES services(id),
    FOREIGN KEY (categoryID) REFERENCES servicesCategories(id)
);




-- @block
SELECT * FROM categoriesandservicesjunction;
-- INSERTS

--  @block
INSERT INTO CategoriesAndServicesJunction (serviceID,categoryID) 
VALUES (
    1,
    4
);

-- @block 
INSERT INTO ServicesCategories(num,categoryName)
VALUES (
    5,
    "Visi"
);
-- @block
INSERT INTO manufacturer(mName,mDescription)
VALUES (
    "Brit Care",
    ""
);
-- @block
INSERT INTO manufacturer(mName,mDescription)
VALUES (
    "Wellness",
    ""
);

-- @block
INSERT INTO Accounts (email,accountPassword,userRole)
VALUES (
    "lukas@gmail.com",
    "lukas123",
    2
)

-- @block
INSERT INTO Users (clientName,lastName,phone,account)
VALUES (
    "Tomas",
    "Lokys",
    "+37025123335",
    3
)

-- @block
INSERT INTO Products (title,price,category,manufacturer,imagePath)
VALUES (
    "Kačių maistas Brit Care Cat Sterilized Urinary Health 0.4kg",
    3.19,
    1,
    1,
    "/assets/temp/sterilized.webp"
)

-- @block 
INSERT INTO Pets (petName,species,breed,gender,age,petWeight)
VALUES (
    "Reo",
    "Katė",
    "Gražus katinas",
    "Patinas",
    2,
    "4.5"
);

-- @block 
INSERT INTO Pets (petName,species,breed,gender,age,petWeight,petOwner)
VALUES (
    "Ryžius",
    "Katė",
    "Paprastas",
    "Patinas",
    8,
    "6",
    2
);

-- @block
INSERT INTO Diagnosis (diagnosisDate,diagnosisDescription,pet)
VALUES (
    "2023-10-21",
    "Reo buvo diagnozuotas 'Simpatikus catitus', tai yra labai reta būklė, kuriai būdingas pernelyg didelis noras miegoti ant šeimininko lovos. Rekomenduojame skirti daugiau laiko pamaloninti savo katiną!",
    1
)

-- @block
INSERT INTO appointments (appointmentDate,appointmentTime,veterinarian,pet)
VALUES (
    "2023-10-28",
    "18:00",
    1,
    1
)

-- @block 
INSERT INTO Documents (sendDate,sendTime,title,docUrl,pet)
VALUES (
    "2023-10-22",
    "14:00",
    "Antras dokumentas",
    "/src/data/pdfas.pdf",
    1
);

-- @block
INSERT INTO reviews (userName, email, reviewText, stars, reviewDate)
VALUES (
    "Justina",
    "justina1.just@gmail.com",
    "Buvau su savo šuneliu veterinarijos klinikoje ir likau labai patenkinta. Gydytojas buvo draugiškas, profesionalus ir rūpestingas. Jis išsamiai paaiškino, kas šuniukui negerai ir kaip jam padėti. Klinika buvo švari ir tvarkinga, o personalas malonus ir paslaugus. Manau, kad čia geriausia vieta gyvūnų sveikatai rūpintis. Rekomenduoju visiems!
",
    5,
    "2023-10-16"
);

-- @block
INSERT INTO accounts (email,accountPassword,userRole)
VALUES (
    "admin@gmail.com",
    "labas123",
    1
);

-- @block
INSERT INTO accounts (email,accountPassword,userRole)
VALUES (
    "gydytojas@gmail.com",
    "labas123",
    3
);

-- @block
INSERT INTO clients (clientName,lastName,phone,account)
VALUES (
    "Admin",
    "-",
    "-",
    1
)

-- @block
INSERT INTO appointments (appointmentDate,appointmentTime,veterinarian,pet)
VALUES (
    "2023-11-20",
    "10:00",
    2,
    2
)

-- SELECTS
--  @block
SELECT accounts.email, accounts.accountPassword FROM accounts WHERE accounts.email = 'lukas@gmail.com';
-- @block
SELECT appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas', veterinarians.vetName AS 'VetVardas', veterinarians.lastName AS 'VetPavarde' FROM pets LEFT JOIN appointments ON appointments.pet = pets.id LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id WHERE pets.id = 1 ORDER BY appointmentDate DESC
-- @block
SELECT * FROM veterinarians;
-- @block
SELECT * FROM appointments;
-- @block
SELECT * FROM users;
-- @block
SELECT * FROM accounts;
-- @block 
SELECT appointments.id AS 'ID',appointments.appointmentDate AS 'Data',appointments.appointmentTime AS 'Laikas',veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė',pets.petName AS 'Augintinis' FROM appointments LEFT JOIN veterinarians ON appointments.veterinarian = veterinarians.id LEFT JOIN pets ON appointments.pet = pets.id ORDER BY appointmentDate DESC; 

-- @block 
SELECT veterinarians.id AS 'ID', veterinarians.vetName AS 'Vardas', veterinarians.lastName AS 'Pavardė' FROM veterinarians; 
-- @block 
SELECT clients.clientName, accounts.email,accounts.accountPassword,accounts.userRole FROM clients LEFT JOIN accounts ON clients.account = accounts.id WHERE accounts.email ='admin@gmail.com'
-- @block
SELECT accounts.email, accounts.accountPassword,accounts.userRole FROM clients LEFT JOIN accounts ON clients.account = accounts.id WHERE clients.id = 1;

-- @block
SELECT * FROM pets;

-- @block 
SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,COALESCE(appointments.appointmentDate, 'No appointment') AS appointmentDate FROM pets LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = 2 ORDER BY appointmentDate DESC LIMIT 2;


-- @block 
SELECT documents.title,documents.docUrl,documents.sendDate FROM pets LEFT JOIN documents ON pets.id = documents.pet WHERE pets.id = 1;

-- @block
SELECT appointments.appointmentDate FROM pets LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = 1 AND appointments.appointmentDate <= CURRENT_DATE() ORDER BY appointmentDate LIMIT 1;

-- @block 
SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,documents.sendDate,documents.title,documents.docUrl, appointments.appointmentDate FROM pets LEFT JOIN documents ON pets.id = documents.pet LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = 1;


-- @block
SELECT pets.petName,pets.species,pets.breed,pets.gender,pets.age,pets.petWeight,documents.sendDate,documents.title,documents.docUrl, appointments.appointmentDate FROM pets LEFT JOIN documents ON pets.id = documents.pet LEFT JOIN appointments ON pets.id = appointments.pet WHERE pets.id = 1 ORDER BY appointmentDate DESC LIMIT 2;

-- @block
SELECT appointments.appointmentDate,appointments.appointmentTime,veterinarians.vetName,veterinarians.lastName FROM appointments LEFT JOIN veterinarians ON veterinarians.id = appointments.veterinarian WHERE (appointmentDate BETWEEN '2023-10-09' AND '2023-10-12') AND booked = 0;

-- @block
SELECT products.title, manufacturer.mName FROM products LEFT JOIN manufacturer ON products.manufacturer = manufacturer.id;

-- @block 
SELECT pets.id FROM accounts LEFT JOIN users ON accounts.id = users.account LEFT JOIN pets ON users.id = pets.petOwner WHERE accounts.id = 2;
-- @block 
SELECT pets.id FROM accounts LEFT JOIN users ON accounts.id = users.account WHERE accounts.id = 2;
--  @block
SELECT services.id,services.title,services.serviceDescription,services.price, servicesCategories.num, servicesCategories.categoryName FROM Services LEFT JOIN CategoriesAndServicesJunction ON serviceID = services.id LEFT JOIN servicesCategories ON categoryID = servicesCategories.id

-- ALTER TABLES
-- @block
ALTER TABLE accounts ADD userRole INT;

-- @block
ALTER TABLE products ADD imagePath VARCHAR(255);  

-- @block
ALTER TABLE Clients RENAME Users;


-- UPDATES
-- @block
UPDATE pets SET petOwner = 2 WHERE pets.id = 1;