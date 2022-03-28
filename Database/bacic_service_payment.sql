DROP DATABASE IF EXISTS `bacic_service_payment`;

CREATE DATABASE IF NOT EXISTS `bacic_service_payment`
    CHARACTER SET=latin2
    COLLATE=latin2_general_ci
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
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;


INSERT INTO ROLES(`Name`) VALUES ('Administrator');


CREATE TABLE IF NOT EXISTS USERS (                                                                                                               
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `UserName`          VARCHAR (50)    NOT NULL,
    `Password`          VARCHAR (255)    NOT NULL,
    `Name`              VARCHAR (100)   NOT NULL,
    `Document`          VARCHAR (14)    NULL, -- CPF / CNPJ
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;

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
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;


INSERT INTO USERS (`UserName`, `Password`, `Name`, `Document`)
VALUES ('Admin', '---', 'Administrador', NULL);

INSERT INTO USERROLES (`UserId`, `RoleId`) VALUES (1, 1);



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
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;



INSERT INTO COMPANYTYPES (`Name`,`CreatedUserId`,`ModifiedUserId`)
VALUES ('BACIC',1,1),('ADQUIRENTE',1,1),('DISTRIBUIDOR',1,1),('REVENDA',1,1),('CLIENTE',1,1);



CREATE TABLE IF NOT EXISTS COMPANIES (                                                                                                          
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `CompanyTypeId`     INT             NOT NULL,
    `CompanyId`         INT             NULL,
    `Name`              VARCHAR (100)   NOT NULL,                                                                                                 
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                                  
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,                                                                                       
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                                                             
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,                                                                                       
    `IsDeleted`         BOOL            NOT NULL DEFAULT FALSE,                                                                                               
    CONSTRAINT PRIMARY KEY (`Id`)
) 
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;


INSERT INTO COMPANIES (`CompanyTypeId`,`Name`,`CreatedUserId`,`ModifiedUserId`)
VALUES (1,'BACIC',1,1);



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
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;



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
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;



CREATE TABLE IF NOT EXISTS PAYMENTS (                                                                                                             
    `Id`                INT             NOT NULL AUTO_INCREMENT,
    `PaymentOptionId`   INT             NOT NULL,
    `CustomerId`        INT             NOT NULL,
    `Name`              VARCHAR (100)   NOT NULL,
    `PaymentFee`        DOUBLE(7,4)     NOT NULL DEFAULT 0,
    `CreatedDate`       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `CreatedUserId`     INT             NOT NULL DEFAULT 0,
    `ModifiedDate`      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ModifiedUserId`    INT             NOT NULL DEFAULT 0,
    `IsDeleted`         BOOLEAN         NOT NULL DEFAULT FALSE,
    CONSTRAINT PRIMARY KEY (`Id`),
    CONSTRAINT FOREIGN KEY (`PaymentOptionId`)
        REFERENCES PAYMENT_OPTIONS(`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (`CustomerId`) 
        REFERENCES COMPANIES (`Id`)
        ON UPDATE RESTRICT ON DELETE CASCADE
) 
ENGINE=INNODB 
CHARSET=latin2 
COLLATE=latin2_general_ci;



GRANT SELECT, INSERT, UPDATE, DELETE ON bacic_service_payment.* TO 'admin'@'localhost'; 


-- SELECT * FROM COMPANYTYPES;
-- SELECT * FROM USERS;
-- SELECT * FROM PAYMENT_OPTIONS








