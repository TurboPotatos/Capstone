CREATE DATABASE  IF NOT EXISTS `diceGame`;
USE `diceGame`;


DROP TABLE IF EXISTS `runs`;
DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `playerId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`playerId`)
);

CREATE TABLE `runs` (
  `runId` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11),
  `playerId` int(11), 
  `waveReached` int(11),
  PRIMARY KEY (`runId`),
  FOREIGN KEY (`playerId`) REFERENCES players(`playerId`)
);