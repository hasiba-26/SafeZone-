-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2025 at 06:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safe_zone`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_users`
--

CREATE TABLE `client_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_users`
--

INSERT INTO `client_users` (`id`, `email`, `password`, `name`) VALUES
(1, 'tun@gmail.com', '123456', 'suwaddy'),
(2, 'su@gmail.com', '111111', 'Su'),
(4, 'lu@gmail.com', '$2b$10$Q/XJ8mwG4WV7qGpJvgQX1uYGj1yncE6eM4pmQIXRLrGYXOGfzecT.', 'lu12');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_signals`
--

CREATE TABLE `emergency_signals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `ip_address` varchar(255) DEFAULT NULL,
  `request_count` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emergency_signals`
--

INSERT INTO `emergency_signals` (`id`, `user_id`, `latitude`, `longitude`, `type`, `timestamp`, `ip_address`, `request_count`) VALUES
(70, 4, 6.13226, 100.384, 'health', '2025-01-08 13:32:42', '127.0.0.1', 20),
(71, 4, 6.13226, 100.384, 'fire', '2025-01-08 13:33:00', '127.0.0.1', 1),
(72, 4, 6.13226, 100.384, 'fire', '2025-01-08 13:33:29', '127.0.0.1', 2),
(73, 4, 6.13226, 100.384, 'health', '2025-01-08 13:33:46', '127.0.0.1', 21),
(74, 4, 6.12579, 100.383, 'health', '2025-01-08 13:38:12', '127.0.0.1', 22),
(75, 4, 6.12579, 100.383, 'health', '2025-01-08 13:55:05', '127.0.0.1', 23),
(76, 4, 6.12579, 100.383, 'health', '2025-01-08 13:55:54', '127.0.0.1', 24),
(77, 4, 6.12579, 100.383, 'health', '2025-01-08 13:57:17', '127.0.0.1', 25),
(78, 4, 6.13241, 100.385, 'health', '2025-01-08 14:46:33', '127.0.0.1', 26),
(79, 4, 6.13241, 100.385, 'health', '2025-01-08 14:47:57', '127.0.0.1', 27),
(80, 4, 6.13241, 100.385, 'health', '2025-01-08 14:48:46', '127.0.0.1', 28),
(81, 4, 6.13241, 100.385, 'health', '2025-01-08 14:49:06', '127.0.0.1', 29),
(82, 4, 6.1324, 100.385, 'health', '2025-01-08 14:51:18', '127.0.0.1', 30),
(83, 4, 6.12579, 100.383, 'health', '2025-01-08 15:26:53', '127.0.0.1', 31),
(84, 4, 6.13043, 100.386, 'health', '2025-01-14 09:52:22', '127.0.0.1', 32),
(85, 4, 6.13042, 100.386, 'fire', '2025-01-14 10:21:58', '127.0.0.1', 3),
(86, 4, 6.13042, 100.386, 'health', '2025-01-14 10:22:11', '127.0.0.1', 33),
(87, 4, 6.12579, 100.383, 'health', '2025-01-14 10:50:04', '127.0.0.1', 34),
(88, 4, 6.13044, 100.386, 'health', '2025-01-14 10:50:28', '127.0.0.1', 35);

-- --------------------------------------------------------

--
-- Table structure for table `server_users`
--

CREATE TABLE `server_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `server_users`
--

INSERT INTO `server_users` (`id`, `email`, `password`, `name`) VALUES
(5, 'tun@gmail.com', '$2b$10$Qj0nvAuNatYgsBPWyoSTF.jbZC2Dba354DpTzc1QcjxIb8n2277W2', 'Tun');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_users`
--
ALTER TABLE `client_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `emergency_signals`
--
ALTER TABLE `emergency_signals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `server_users`
--
ALTER TABLE `server_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_users`
--
ALTER TABLE `client_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `emergency_signals`
--
ALTER TABLE `emergency_signals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `server_users`
--
ALTER TABLE `server_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emergency_signals`
--
ALTER TABLE `emergency_signals`
  ADD CONSTRAINT `emergency_signals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `client_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
