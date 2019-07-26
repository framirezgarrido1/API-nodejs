-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 26, 2019 at 01:47 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `status`
--

-- --------------------------------------------------------

--
-- Table structure for table `status_lights`
--

CREATE TABLE `status_lights` (
  `name` varchar(100) NOT NULL,
  `id` int(100) NOT NULL,
  `status` int(2) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status_lights`
--

INSERT INTO `status_lights` (`name`, `id`, `status`, `topic`, `date`) VALUES
('light-0001', 1, 1, 'esp32/status/', '2019-07-23'),
('light-0002', 2, 0, 'esp32/status/', '2019-07-23'),
('light-0003', 3, 1, 'esp32/status/', '2019-07-23'),
('light-0004', 4, 0, 'esp32/status/', '2019-07-23'),
('light-0005', 5, 0, 'esp32/status/', '2019-07-23'),
('light-0006', 6, 0, 'esp32/status/', '2019-07-23'),
('light-0007', 7, 1, 'esp32/status/', '2019-07-23'),
('light-0008', 8, 0, 'esp32/status/', '2019-07-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `status_lights`
--
ALTER TABLE `status_lights`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `status_lights`
--
ALTER TABLE `status_lights`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
