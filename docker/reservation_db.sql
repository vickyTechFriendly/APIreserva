-- MySQL Script generated by MySQL Workbench
-- lun 12 feb 2024 14:34:12
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reservasDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reservasDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reservasDB` DEFAULT CHARACTER SET utf8mb3 ;
USE `reservasDB` ;

-- -----------------------------------------------------
-- Table `reservasDB`.`building`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`building` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`building` (
  `building_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accessibility` TINYINT(1) NULL DEFAULT NULL,
  `longitude` DECIMAL(8,6) NOT NULL,
  `latitude` DECIMAL(8,6) NOT NULL,
  PRIMARY KEY (`building_id`),
  UNIQUE INDEX `building_id_UNIQUE` (`building_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`room` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`room` (
  `room_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `capacity` INT UNSIGNED NULL DEFAULT NULL,
  `officer` VARCHAR(45) NULL DEFAULT NULL,
  `internalSchedule` VARCHAR(45) NULL DEFAULT NULL,
  `publicSchedule` VARCHAR(45) NULL DEFAULT NULL,
  `startHour` VARCHAR(45) NULL DEFAULT NULL,
  `endHour` VARCHAR(45) NULL DEFAULT NULL,
  `betweenSession` VARCHAR(45) NULL DEFAULT NULL,
  `building_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `fk_room_building_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_room_building`
    FOREIGN KEY (`building_id`)
    REFERENCES `reservasDB`.`building` (`building_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`user` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `telephone` VARCHAR(20) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `organization` VARCHAR(45) NULL DEFAULT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `telephone_UNIQUE` (`telephone` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`reservation` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`reservation` (
  `reservation_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `participants` INT UNSIGNED NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `notification` TINYINT(1) NULL DEFAULT NULL,
  `startReservation` DATETIME NULL DEFAULT NULL,
  `length` INT NULL DEFAULT NULL,
  `frequency` VARCHAR(45) NULL DEFAULT NULL,
  `daysOfWeek` VARCHAR(45) NULL DEFAULT NULL,
  `endReservation` DATETIME NULL DEFAULT NULL,
  `room_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `comment` VARCHAR(300) NULL DEFAULT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  INDEX `fk_reservation_room1_idx` (`room_id` ASC) VISIBLE,
  INDEX `fk_reservation_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_room1`
    FOREIGN KEY (`room_id`)
    REFERENCES `reservasDB`.`room` (`room_id`),
  CONSTRAINT `fk_reservation_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `reservasDB`.`user` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`resource` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`resource` (
  `resource_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`resource_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`room_has_resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`room_has_resource` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`room_has_resource` (
  `room_id` INT UNSIGNED NOT NULL,
  `resources_id` INT UNSIGNED NOT NULL,
  `quantity_available` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`room_id`, `resources_id`),
  INDEX `fk_room_has_resources_resources1_idx` (`resources_id` ASC) VISIBLE,
  INDEX `fk_room_has_resources_room1_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_room_has_resources_room1`
    FOREIGN KEY (`room_id`)
    REFERENCES `reservasDB`.`room` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_room_has_resources_resources1`
    FOREIGN KEY (`resources_id`)
    REFERENCES `reservasDB`.`resource` (`resource_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`building_has_resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`building_has_resource` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`building_has_resource` (
  `building_id` INT UNSIGNED NOT NULL,
  `resource_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`building_id`, `resource_id`),
  INDEX `fk_building_has_resource_resource1_idx` (`resource_id` ASC) VISIBLE,
  INDEX `fk_building_has_resource_building1_idx` (`building_id` ASC) VISIBLE,
  CONSTRAINT `fk_building_has_resource_building1`
    FOREIGN KEY (`building_id`)
    REFERENCES `reservasDB`.`building` (`building_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_building_has_resource_resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `reservasDB`.`resource` (`resource_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `reservasDB`.`reservation_has_resource`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `reservasDB`.`reservation_has_resource` ;

CREATE TABLE IF NOT EXISTS `reservasDB`.`reservation_has_resource` (
  `reservation_id` INT UNSIGNED NOT NULL,
  `resource_id` INT UNSIGNED NOT NULL,
  `quantity_reserved` INT UNSIGNED NULL,
  PRIMARY KEY (`reservation_id`, `resource_id`),
  INDEX `fk_reservation_has_resource_resource1_idx` (`resource_id` ASC) VISIBLE,
  INDEX `fk_reservation_has_resource_reservation1_idx` (`reservation_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_has_resource_reservation1`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `reservasDB`.`reservation` (`reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservation_has_resource_resource1`
    FOREIGN KEY (`resource_id`)
    REFERENCES `reservasDB`.`resource` (`resource_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
