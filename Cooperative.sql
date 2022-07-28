-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2022 at 03:33 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `share`
--

-- --------------------------------------------------------

--
-- Table structure for table `combine`
--

CREATE TABLE `combine` (
  `id` int(11) NOT NULL,
  `balance` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `combine`
--

INSERT INTO `combine` (`id`, `balance`) VALUES
(1, 17015);

-- --------------------------------------------------------

--
-- Table structure for table `loaner`
--

CREATE TABLE `loaner` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `total` int(255) NOT NULL,
  `return_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `loaner`
--

INSERT INTO `loaner` (`id`, `username`, `total`, `return_total`) VALUES
(1, '0987654321', 0, 0),
(2, '0789456123', 200, 212),
(3, '77777', 100, 106),
(4, '77775', 0, 0),
(6, '09123456', 0, 0),
(7, '0852741963', 0, 0),
(8, '0987654322', 0, 0),
(9, '0963852741', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `type` int(1) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `username`, `type`, `amount`, `date`) VALUES
(79, '77775', 0, 100, '7/27/2022, 10:11:34 PM'),
(80, '77775', 1, 200, '7/28/2022, 12:11:44 AM'),
(81, '77775', 0, 200, '7/28/2022, 12:15:04 AM'),
(82, '77775', 1, 100, '7/28/2022, 12:18:45 AM'),
(83, '0789456123', 1, 300, '7/28/2022, 12:20:18 AM'),
(84, '0789456123', 0, 100, '7/28/2022, 10:24:13 AM'),
(85, '77775', 0, 100, '7/28/2022, 10:29:18 AM'),
(86, '77775', 1, 100, '7/28/2022, 10:29:32 AM'),
(87, '0789456123', 0, 100, '7/28/2022, 10:29:51 AM'),
(88, '0789456123', 0, 100, '7/28/2022, 10:29:58 AM'),
(89, '0789456123', 0, 100, '7/28/2022, 10:30:05 AM'),
(90, '0789456123', 1, 100, '7/28/2022, 10:30:14 AM'),
(91, '77775', 0, 200, '7/28/2022, 10:31:31 AM'),
(92, '0789456123', 0, 100, '7/28/2022, 10:43:58 AM'),
(93, '0789456123', 1, 100, '7/28/2022, 10:44:04 AM'),
(94, '0789456123', 1, 100, '7/28/2022, 10:45:00 AM'),
(95, '77775', 1, 100, '7/28/2022, 10:49:35 AM'),
(96, '0789456123', 1, 100, '7/28/2022, 4:03:55 PM'),
(97, '77775', 1, 100, '7/28/2022, 4:12:16 PM'),
(98, '77775', 0, 200, '7/28/2022, 4:13:00 PM'),
(99, '0789456123', 1, 100, '7/28/2022, 4:47:51 PM'),
(100, '77775', 0, 200, '7/28/2022, 5:48:38 PM'),
(101, '77775', 0, 500, '7/28/2022, 5:48:46 PM'),
(102, '0789456123', 0, 100, '7/28/2022, 6:15:32 PM'),
(103, '0789456123', 0, 500, '7/28/2022, 6:15:49 PM'),
(104, '0789456123', 1, 200, '7/28/2022, 6:16:13 PM'),
(105, '09123456', 0, 100, '7/28/2022, 6:19:46 PM'),
(106, '0852741963', 0, 100, '7/28/2022, 6:19:54 PM'),
(107, '0852741963', 1, 1000, '7/28/2022, 6:20:06 PM'),
(108, '09123456', 1, 1000, '7/28/2022, 6:20:21 PM'),
(109, '09123456', 0, 1000, '7/28/2022, 6:20:36 PM'),
(110, '09123456', 0, 100, '7/28/2022, 6:20:49 PM'),
(111, '0852741963', 0, 2000, '7/28/2022, 6:21:04 PM'),
(112, '0987654322', 0, 100, '7/28/2022, 7:54:11 PM'),
(113, '0963852741', 0, 100, '7/28/2022, 7:54:29 PM'),
(114, '0987654322', 1, 1000, '7/28/2022, 7:54:40 PM'),
(115, '0987654322', 0, 1500, '7/28/2022, 7:54:55 PM'),
(116, '0963852741', 1, 1000, '7/28/2022, 7:55:11 PM'),
(117, '0963852741', 0, 1000, '7/28/2022, 7:55:20 PM'),
(118, '0963852741', 0, 100, '7/28/2022, 7:55:31 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `phone_number` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone_number`, `password`) VALUES
(1, 'John', 'Kingston', '0987654321', '123456'),
(2, 'Drink', 'Water', '0789456123', '123456'),
(3, 'Yoghurt', 'Betagen', '77777', '12346'),
(4, 'Cannon', 'Ball', '77775', '123456'),
(6, 'Dog', 'Cat', '09123456', '123456'),
(7, 'Iron', 'Man', '0852741963', '123456'),
(8, 'Hip', 'Po', '0987654322', '123456'),
(9, 'pig', 'gy', '0963852741', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `combine`
--
ALTER TABLE `combine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loaner`
--
ALTER TABLE `loaner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `combine`
--
ALTER TABLE `combine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `loaner`
--
ALTER TABLE `loaner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
