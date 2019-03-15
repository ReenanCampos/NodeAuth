CREATE DATABASE  IF NOT EXISTS `cmsteste` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cmsteste`;
-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: cmsteste
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Dicionario`
--

DROP TABLE IF EXISTS `Dicionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dicionario` (
  `id` varchar(64) NOT NULL,
  `grupo` varchar(32) DEFAULT NULL,
  `item` varchar(64) NOT NULL,
  `descricao` varchar(256) DEFAULT NULL,
  `idTipoTexto` varchar(64) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dicionario`
--

LOCK TABLES `Dicionario` WRITE;
/*!40000 ALTER TABLE `Dicionario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Dicionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Idioma`
--

DROP TABLE IF EXISTS `Idioma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Idioma` (
  `id` varchar(8) NOT NULL,
  `Padrao` tinyint(1) NOT NULL,
  `Ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Idioma`
--

LOCK TABLES `Idioma` WRITE;
/*!40000 ALTER TABLE `Idioma` DISABLE KEYS */;
/*!40000 ALTER TABLE `Idioma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Roles` (
  `id` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `ativo` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES ('Admin','Administrador','Maior autoridade do sistema',_binary ''),('Rolecasa1','Role avbras','kkjjk',_binary ''),('Rolecasa12','Role avbras','kkjjk',_binary ''),('Usuario','Usuario','Usuario comum do sistema',_binary '');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoTexto`
--

DROP TABLE IF EXISTS `TipoTexto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TipoTexto` (
  `id` int(11) NOT NULL,
  `identificacao` varchar(16) NOT NULL,
  `idDicionario` varchar(45) NOT NULL,
  `Ativo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Identificacao_UNIQUE` (`identificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoTexto`
--

LOCK TABLES `TipoTexto` WRITE;
/*!40000 ALTER TABLE `TipoTexto` DISABLE KEYS */;
/*!40000 ALTER TABLE `TipoTexto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Traducao`
--

DROP TABLE IF EXISTS `Traducao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Traducao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idDicionario` varchar(64) NOT NULL,
  `IdIdioma` varchar(8) NOT NULL,
  `Texto` text,
  `TextoPadrao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Traducao`
--

LOCK TABLES `Traducao` WRITE;
/*!40000 ALTER TABLE `Traducao` DISABLE KEYS */;
/*!40000 ALTER TABLE `Traducao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `id` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `batata` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `senha` varchar(256) NOT NULL,
  `dataNascimento` datetime NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `bloqueado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES ('rere','Renan Campos','rere','reenan.campos@gmail.com','41998562238','renan123','2019-03-09 22:52:54',1,0);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsuarioLoginHistorico`
--

DROP TABLE IF EXISTS `UsuarioLoginHistorico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuarioLoginHistorico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` varchar(100) NOT NULL,
  `dataLogin` datetime NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `nomeDispositivo` varchar(100) DEFAULT NULL,
  `dispositivo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsuarioLoginHistorico`
--

LOCK TABLES `UsuarioLoginHistorico` WRITE;
/*!40000 ALTER TABLE `UsuarioLoginHistorico` DISABLE KEYS */;
/*!40000 ALTER TABLE `UsuarioLoginHistorico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsuarioRole`
--

DROP TABLE IF EXISTS `UsuarioRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuarioRole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` varchar(100) NOT NULL,
  `idRole` varchar(100) NOT NULL,
  `dataInclusao` datetime NOT NULL,
  `idUsuarioInclusao` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsuarioRole`
--

LOCK TABLES `UsuarioRole` WRITE;
/*!40000 ALTER TABLE `UsuarioRole` DISABLE KEYS */;
INSERT INTO `UsuarioRole` VALUES (1,'rere','3','2019-03-09 23:02:25','rere'),(2,'rere','Usuario','2019-03-09 23:02:25','rere');
/*!40000 ALTER TABLE `UsuarioRole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-15 11:10:01
