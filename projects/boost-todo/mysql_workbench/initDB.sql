-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema todo
-- -----------------------------------------------------
DROP DATABASE `todo`;
CREATE SCHEMA IF NOT EXISTS `todo` DEFAULT CHARACTER SET utf8 ;
USE `todo` ;

-- -----------------------------------------------------
-- Table `todo`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`USER` (
  `USER_ID` VARCHAR(45) NOT NULL,
  `USER_PASSWORD` VARCHAR(45) NOT NULL,
  `USER_NAME` VARCHAR(45) NOT NULL,
  `USER_GRADE` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`USER_ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`BOARD`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`BOARD` (
  `BOARD_ID` INT NOT NULL AUTO_INCREMENT,
  `BOARD_NAME` VARCHAR(100) NOT NULL,
  `BOARD_WRITE_PERMISSION` VARCHAR(45) NOT NULL DEFAULT 'nobody',
  `BOARD_READ_PERMISSION` VARCHAR(45) NOT NULL DEFAULT 'nobody',
  `BOARD_OWNER` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`BOARD_ID`, `BOARD_OWNER`),
  INDEX `fk_BOARD_USER_idx` (`BOARD_OWNER` ASC) ,
  CONSTRAINT `fk_BOARD_USER`
    FOREIGN KEY (`BOARD_OWNER`)
    REFERENCES `todo`.`USER` (`USER_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`BOARD_WRITABLE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`BOARD_WRITABLE` (
  `BOARD_WRITABLE_ID` INT NOT NULL AUTO_INCREMENT,
  `BOARD_ID` INT NOT NULL,
  `USER_ID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`BOARD_WRITABLE_ID`, `BOARD_ID`),
  INDEX `fk_BOARD_WRITABLE_BOARD1_idx` (`BOARD_ID` ASC) ,
  CONSTRAINT `fk_BOARD_WRITABLE_BOARD1`
    FOREIGN KEY (`BOARD_ID`)
    REFERENCES `todo`.`BOARD` (`BOARD_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`BOARD_READABLE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`BOARD_READABLE` (
  `BOARD_READABLE_ID` INT NOT NULL AUTO_INCREMENT,
  `BOARD_ID` INT NOT NULL,
  `USER_ID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`BOARD_READABLE_ID`, `BOARD_ID`),
  INDEX `fk_BOARD_READABLE_BOARD1_idx` (`BOARD_ID` ASC) ,
  CONSTRAINT `fk_BOARD_READABLE_BOARD1`
    FOREIGN KEY (`BOARD_ID`)
    REFERENCES `todo`.`BOARD` (`BOARD_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`LIST`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`LIST` (
  `LIST_ID` INT NOT NULL AUTO_INCREMENT,
  `LIST_NAME` VARCHAR(100) NOT NULL,
  `LIST_BELONG_BOARD` INT NOT NULL,
  PRIMARY KEY (`LIST_ID`, `LIST_BELONG_BOARD`),
  INDEX `fk_LIST_BOARD1_idx` (`LIST_BELONG_BOARD` ASC) ,
  CONSTRAINT `fk_LIST_BOARD1`
    FOREIGN KEY (`LIST_BELONG_BOARD`)
    REFERENCES `todo`.`BOARD` (`BOARD_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`TODO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`TODO` (
  `TODO_ID` INT NOT NULL AUTO_INCREMENT,
  `TODO_CONTENT` VARCHAR(2048) NOT NULL,
  `TODO_BELONG_LIST` INT NOT NULL,
  `TODO_ORDER` INT,
  `TODO_ADDED_BY` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`TODO_ID`, `TODO_BELONG_LIST`),
  INDEX `fk_TODO_LIST1_idx` (`TODO_BELONG_LIST` ASC) ,
  CONSTRAINT `fk_TODO_LIST1`
    FOREIGN KEY (`TODO_BELONG_LIST`)
    REFERENCES `todo`.`LIST` (`LIST_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todo`.`ACTIVITY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `todo`.`ACTIVITY` (
  `ACTIVITY_ID` INT NOT NULL AUTO_INCREMENT,
  `ACTIVITY_TYPE` VARCHAR(45) NOT NULL,
  `ACTIVITY_DATE` DATETIME NULL,
  `ACTIVITY_USER_ID` VARCHAR(45) NOT NULL,
  `LIST_FROM` VARCHAR(2048),
  `LIST_TO` VARCHAR(2048),
  `BOARD_ID` INT NOT NULL,
  `TODO_ID` INT NOT NULL,
  PRIMARY KEY (`ACTIVITY_ID`, `BOARD_ID`),
  INDEX `fk_ACTIVITY_BOARD1_idx` (`BOARD_ID` ASC) ,
  CONSTRAINT `fk_ACTIVITY_BOARD1`
    FOREIGN KEY (`BOARD_ID`)
    REFERENCES `todo`.`BOARD` (`BOARD_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- input initial data
insert into USER values('admin', 'admin', 'admin', 'admin');
insert into USER values('admin2', 'admin', 'admin', 'admin');
insert into USER values('admin3', 'admin', 'admin', 'admin');
insert into USER values('admin4', 'admin', 'admin', 'admin');
insert into USER values('normal', 'normal', 'normal', 'normal');
insert into USER values('normal2', 'normal', 'normal', 'normal');
insert into USER values('normal3', 'normal', 'normal', 'normal');
insert into USER values('normal4', 'normal', 'normal', 'normal');

insert into BOARD values(null, 'admins board', 'anybody', 'somebody', 'admin'); -- 1
insert into BOARD values(null, 'normals board', 'somebody', 'somebody', 'normal'); -- 2

insert into BOARD_WRITABLE values(null, 1, 'normal');
insert into BOARD_WRITABLE values(null, 1, 'normal2');
insert into BOARD_WRITABLE values(null, 2, 'normal2');

insert into BOARD_READABLE values(null, 2, 'normal2');
insert into BOARD_READABLE values(null, 2, 'normal3');

insert into LIST values(null, 'todo', 1); -- 1
insert into LIST values(null, 'doing', 1); -- 2
insert into LIST values(null, 'done', 1); -- 3
insert into LIST values(null, 'todo', 2); -- 4
insert into LIST values(null, 'doing', 2); -- 5
insert into LIST values(null, 'done', 2); -- 6

insert into TODO values(null, 'eating dinner', 1, 0, 'admin');
insert into TODO values(null, 'stretching', 2, 0, 'admin');
insert into TODO values(null, 'sleep', 3, 0, 'admin');
insert into TODO values(null, 'eating dinner', 4, 0, 'normal');
insert into TODO values(null, 'stretching', 5, 0, 'normal');
insert into TODO values(null, 'sleep', 6, 0, 'normal');

insert into ACTIVITY values(null, 'moved', '1998-12-31 23:59:59', 'admin', 'doing', 'todo', 1, 1);
insert into ACTIVITY values(null, 'added', '1998-12-31 22:00:00', 'normal', null, 'doing', 1, 1);
insert into ACTIVITY values(null, 'added', '1998-12-31 22:00:00', 'normal', null, 'doing', 1, 2);
insert into ACTIVITY values(null, 'added', '1998-12-31 22:00:00', 'normal', null, 'done', 1, 3);

