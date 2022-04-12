DROP DATABASE IF EXISTS `bacic_service_payment`;

CREATE DATABASE IF NOT EXISTS `bacic_service_payment`
    CHARACTER SET=UTF8
    COLLATE=utf8_general_ci
    DEFAULT ENCRYPTION='N' ;

USE `bacic_service_payment`;

-- CREATE databaae baci_service_payment                                                                                                             
-- TIMESTAMP DEFAULT CURRENT_TIMESTAMP                        

-- DROP TABLE IF EXISTS COMPANYTYPES;
-- DROP TABLE IF EXISTS PAYMENT_RATE;
-- DROP TABLE IF EXISTS PAYMENTS;
-- DROP TABLE IF EXISTS COMPANIES;
-- DROP TABLE IF EXISTS PAYMENT_OPTIONS;
-- DROP TABLE IF EXISTS COMPANYTYPES;
-- DROP TABLE IF EXISTS USERS;

CREATE TABLE IF NOT EXISTS ROLES (                                                                                                               
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `Name`              VARCHAR (50)    NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB;

INSERT INTO ROLES(`Name`) VALUES ('Administrator');
INSERT INTO ROLES(`Name`) VALUES ('Gerenciadores de Pagamento');


CREATE TABLE IF NOT EXISTS USERS (                                                                                                               
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `UserName`          VARCHAR (50)    NOT NULL,
    `Password`          VARCHAR (255)   NOT NULL,
    `Name`              VARCHAR (100)   NOT NULL,
    `Document`          VARCHAR (14)    NULL, -- CPF / CNPJ
    `Email`             VARCHAR (100)   NOT NULL,
    `Mobile`            VARCHAR (13)    NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB;

ALTER TABLE USERS ADD INDEX (UserName);

CREATE TABLE IF NOT EXISTS USERROLES (                                                                                                               
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `UserId`            INT             NOT NULL,
    `RoleId`            INT             NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB;

-- INSERT INTO USERS (`UserName`, `Password`, `Name`, `Document`)
-- VALUES ('Admin', '---', 'Administrador', NULL);

-- DISTRIBUIDORES, REVENDAS, ADQUIRENTES, BACIC 
CREATE TABLE IF NOT EXISTS COMPANYTYPES (                                                                                                          
    `Id`                INT             NOT NULL AUTO_INCREMENT,                                                                      
    `Name`              VARCHAR (100)   NOT NULL,                                                                                                 
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                                  
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,                                                                                       
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                             
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,                                                                                       
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,                                                                                               
    CONSTRAINT PRIMARY KEY (`Id`)                                                                                                                  
) 
ENGINE=INNODB;

INSERT INTO COMPANYTYPES (`Name`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('MASTER',1,1),('ADQUIRENTE',1,1),('DISTRIBUIDOR',1,1),('REVENDA',1,1),('CLIENTE',1,1);

CREATE TABLE IF NOT EXISTS COMPANIES (                                                                                                          
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `CompanyTypeId`     INT             NOT NULL,
    `CompanyId`         INT             NULL, -- Indica se é filial de alguma empresa
    `Name`              VARCHAR (100)   NOT NULL,         
    `CNPJ`              VARCHAR (19)    NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                                  
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,                                                                                       
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                             
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,                                                                                       
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,                                                                                               
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB;

INSERT INTO COMPANIES (`CompanyTypeId`,`Name`,`CNPJ`,`CreatedUserId`,`ModifiedUserId`)
VALUES (1,'BACIC','000.000.000/0001-00',1,1);

INSERT INTO COMPANIES (`CompanyTypeId`,`CompanyId`,`Name`,`CNPJ`,`CreatedUserId`,`ModifiedUserId`)
VALUES (2,1,'EDANBANK','000.000.000/0001-00',1,1);

INSERT INTO COMPANIES (`CompanyTypeId`,`CompanyId`,`Name`,`CNPJ`,`CreatedUserId`,`ModifiedUserId`)
VALUES (4,2,'Despachante Paraná','000.000.000/0001-00',1,1);

INSERT INTO COMPANIES (`CompanyTypeId`,`CompanyId`,`Name`,`CNPJ`,`CreatedUserId`,`ModifiedUserId`)
VALUES (4,2,'Despachante Rio Grande','000.000.000/0001-00',1,1);

INSERT INTO COMPANIES (`CompanyTypeId`,`CompanyId`,`Name`,`CNPJ`,`CreatedUserId`,`ModifiedUserId`)
VALUES (4,2,'Despachante São Paulo','000.000.000/0001-00',1,1);


CREATE TABLE IF NOT EXISTS USERCOMPANIES (
    `UserId`            INT             NOT NULL,
    `CompanyId`         INT             NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                             
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,                                                                                       
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                          
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,                                                                                       
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,                                                                                               
    CONSTRAINT PRIMARY KEY (`UserId`, `CompanyId`)
) 
ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS PAYMENT_OPTIONS (                                                                                                             
    `Id`                INT             NOT NULL AUTO_INCREMENT,                                                                      
    `Name`              VARCHAR (100)   NOT NULL,                                                                                                 
    `PaymentFee`        DOUBLE(7,4)     NOT NULL DEFAULT 0,                                                                                     
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                             
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,                                                                                       
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                          
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,                                                                                       
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,                                                                                               
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB;

INSERT INTO PAYMENT_OPTIONS(`Name`,`PaymentFee`) VALUES ('PIX', 0.5);

CREATE TABLE IF NOT EXISTS PAYMENT_RATE (                                                                                                             
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `CompanyId`         INT             NOT NULL,
    `PaymentCommission` DOUBLE(7,4)     NOT NULL DEFAULT 0,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`),
    CONSTRAINT FOREIGN KEY (`CompanyId`) 
        REFERENCES COMPANIES(`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE
) 
ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS CUSTOMERS (
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `PersonType`        CHAR(1)         NOT NULL,
    `Name`              VARCHAR (100)   NOT NULL,
    `Document`          VARCHAR (20)    NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`)
)
ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS PAYMENTS (                                                                                                             
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `PaymentOptionId`   INT             NOT NULL,
    `CompanyId`         INT             NOT NULL,
    `CustomerId`        INT             NOT NULL,
    `Description`       VARCHAR (100)   NOT NULL,
    `Value`             DOUBLE(7,4)     NOT NULL DEFAULT 0,
    `PaymentFee`        DOUBLE(7,4)     NOT NULL DEFAULT 0,
    `Status`            INT             NOT NULL DEFAULT 1, -- 1 = PENDENTE, 2 = PAGO, 3 = EXPIRADO
    `StatusDate`        TIMESTAMP       NOT NULL,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`),
    CONSTRAINT FOREIGN KEY (`PaymentOptionId`)
        REFERENCES PAYMENT_OPTIONS(`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`CompanyId`)
        REFERENCES COMPANIES(`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`CustomerId`) 
        REFERENCES CUSTOMERS (`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE
) 
ENGINE=INNODB;

GRANT SELECT, INSERT, UPDATE, DELETE ON bacic_service_payment.* TO 'admin'@'localhost'; 

/* 
  
SELECT * FROM COMPANYTYPES;
SELECT * FROM COMPANIES;
SELECT * FROM ROLES;
SELECT * FROM USERS;
SELECT * FROM USERROLES;
SELECT * FROM USERCOMPANIES;
SELECT * FROM PAYMENT_OPTIONS

*/

-- ******************************* Testes *********************************************

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','José da Silva','590.047.880-77',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Antonio Moura','686.191.320-08',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Mario Moreira','256.529.810-24',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Bruno Faria','687.281.890-51',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Bernardo da Costa','992.710.290-97',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Paulo André Siqueira','797.117.140-43',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Flavio Augusto','175.810.250-04',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Christian Vieira','281.023.670-40',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Marcio Rocha','385.592.770-72',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Marcio do Carmo','884.598.030-82',1,1);

INSERT INTO CUSTOMERS (`PersonType`,`Name`,`Document`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('F','Thiago Pimenta','642.164.780-42',1,1);



INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,1,'Aluguel', 100.00, 0, 1, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,1,'Avaliação', 150.00, 0, 1, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,2,'Avaliação', 90.00, 0, 2, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,3,'Avaliação', 350.00, 0, 1, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,1,'Avaliação', 120.00, 0, 3, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,4,'Avaliação', 120.00, 0, 2, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,5,'Avaliação', 85.00, 0, 2, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,6,'Avaliação', 100.00, 0, 3, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,1,'Avaliação', 120.00, 0, 1, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,7,'Avaliação', 190.00, 0, 2, CURRENT_TIMESTAMP);

INSERT INTO PAYMENTS (`PaymentOptionId`,`CompanyId`,`CustomerId`,`Description`,`Value`,`PaymentFee`,`Status`,`StatusDate`)
VALUES (1,3,5,'Avaliação', 100.00, 0, 1, CURRENT_TIMESTAMP);


SELECT * FROM USERS;
SELECT * FROM CUSTOMERS;
SELECT * FROM COMPANIES;
SELECT * FROM PAYMENTS;




