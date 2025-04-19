-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 07, 2025 at 04:59 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_store`
--
CREATE DATABASE IF NOT EXISTS `vacations_store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_store`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('5a61f6da-13d0-11f0-9b58-0242ac110002', '0aedf7d7-fe75-11ef-985d-0242ac110002', '2025-03-03 16:55:16', '2025-03-03 16:55:16'),
('5a620466-13d0-11f0-9b58-0242ac110002', '0aedf427-fe75-11ef-985d-0242ac110002', '2025-03-06 16:55:53', '2025-03-06 16:55:53'),
('5a620732-13d0-11f0-9b58-0242ac110002', '0aee1435-fe75-11ef-985d-0242ac110002', '2025-03-01 16:55:16', '2025-03-02 16:55:16'),
('5a62094c-13d0-11f0-9b58-0242ac110002', '0aee07f9-fe75-11ef-985d-0242ac110002', '2025-03-02 16:55:16', '2025-03-02 16:55:16'),
('5a620bb4-13d0-11f0-9b58-0242ac110002', '0aee111b-fe75-11ef-985d-0242ac110002', '2025-03-05 16:55:53', '2025-03-05 16:55:53'),
('5a620e23-13d0-11f0-9b58-0242ac110002', '0aee0493-fe75-11ef-985d-0242ac110002', '2025-03-10 16:55:53', '2025-03-10 16:55:53'),
('a9f2c39a-13cf-11f0-9b58-0242ac110002', '0aedff84-fe75-11ef-985d-0242ac110002', '2025-03-07 16:55:53', '2025-03-07 16:55:53'),
('a9f2d008-13cf-11f0-9b58-0242ac110002', '0aee0b0c-fe75-11ef-985d-0242ac110002', '2025-03-08 16:55:53', '2025-03-08 16:55:53'),
('a9f2d3df-13cf-11f0-9b58-0242ac110002', '0aedcedc-fe75-11ef-985d-0242ac110002', '2025-03-09 16:55:53', '2025-03-09 16:55:53'),
('a9f2d7da-13cf-11f0-9b58-0242ac110002', '0aedfb22-fe75-11ef-985d-0242ac110002', '2025-03-12 16:55:53', '2025-03-12 16:55:53'),
('a9f2da7f-13cf-11f0-9b58-0242ac110002', '0aee0e17-fe75-11ef-985d-0242ac110002', '2025-03-04 16:55:53', '2025-03-04 16:55:53'),
('d2db0e1b-13d0-11f0-9b58-0242ac110002', '0aee1749-fe75-11ef-985d-0242ac110002', '2025-03-11 16:55:53', '2025-03-11 16:55:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('5a61f0b7-13d0-11f0-9b58-0242ac110002', 'admin', 'user', 'aaddmin@example.com', '123456
', 'admin', '2025-03-24 16:45:30', '2025-03-24 16:45:30'),
('5a61f6da-13d0-11f0-9b58-0242ac110002', 'era', 'naz', 'eraa@example.com', '123456789', 'user', '2025-03-13 16:45:30', '2025-03-13 16:45:30'),
('5a620466-13d0-11f0-9b58-0242ac110002', 'mark', 'den', 'mark@example.com', '123456789', 'user', '2025-03-17 16:45:30', '2025-03-17 16:45:30'),
('5a620732-13d0-11f0-9b58-0242ac110002', 'alice', 'kushik', 'alice@example.com', '123456789', 'user', '2025-03-15 16:45:30', '2025-03-15 16:45:30'),
('5a62094c-13d0-11f0-9b58-0242ac110002', 'baba', 'lulu', 'baba@example.com', '123456789', 'user', '2025-03-19 16:45:30', '2025-03-19 16:45:30'),
('5a620bb4-13d0-11f0-9b58-0242ac110002', 'katy', 'vor', 'katy@example.com', '123456789', 'user', '2025-03-20 16:45:30', '2025-03-20 16:45:30'),
('5a620e23-13d0-11f0-9b58-0242ac110002', 'sun', 'miz', 'sun@example.com', '123456789', 'user', '2025-03-21 16:45:30', '2025-03-21 16:45:30'),
('a9f2c39a-13cf-11f0-9b58-0242ac110002', 'mira', 'agar', 'mira@example.com', '123456789', 'user', '2025-03-07 16:39:45', '2025-03-07 16:39:45'),
('a9f2d008-13cf-11f0-9b58-0242ac110002', 'mishel', 'don', 'mishel@example.com', '123456789', 'user', '2025-03-08 16:39:45', '2025-03-08 16:39:45'),
('a9f2d3df-13cf-11f0-9b58-0242ac110002', 'nelly', 'gr', 'nelly@example.com', '123456789', 'user', '2025-03-09 16:39:45', '2025-03-09 16:39:45'),
('a9f2d7da-13cf-11f0-9b58-0242ac110002', 'valer', 'ag', 'valer@example.com', '123456789', 'user', '2025-03-10 16:39:45', '2025-03-10 16:39:45'),
('a9f2da7f-13cf-11f0-9b58-0242ac110002', 'karin', 'katz', 'karin@example.com', '123456789', 'user', '2025-03-12 16:39:45', '2025-04-07 16:39:45'),
('d2db0e1b-13d0-11f0-9b58-0242ac110002', 'toy', 'agr', 'toy@example.com', '123456789', 'user', '2025-03-30 16:52:44', '2025-03-30 16:52:44');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `vacation_destination` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `starting_date` datetime NOT NULL,
  `ending_date` datetime NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `vacation_destination`, `starting_date`, `ending_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('0aedcedc-fe75-11ef-985d-0242ac110002', 'Paris', 'A romantic getaway in the city of lights, with visits to the Eiffel Tower, the Louvre Museum, and delicious food.', '2025-05-24 10:00:00', '2025-06-06 10:00:00', 900, 'https://t4.ftcdn.net/jpg/02/96/15/35/360_F_296153501_B34baBHDkFXbl5RmzxpiOumF4LHGCvAE.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aedf427-fe75-11ef-985d-0242ac110002', 'Kyiv', 'A cultural vacation in the charming city, with historical attractions and museums to explore.', '2025-03-12 11:00:00', '2025-03-20 11:00:00', 700, 'https://www.shutterstock.com/image-photo/kyiv-ukraine-july-10-2021-600nw-2096116393.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aedf7d7-fe75-11ef-985d-0242ac110002', 'Barcelona', 'A sunny vacation on the city\'s beaches, visiting Gaudí’s architectural masterpieces and historic sites', '2025-04-01 12:00:00', '2025-04-10 12:00:00', 800, 'https://thumbs.dreamstime.com/b/sagrada-familia-barcelona-spain-cathedral-83163693.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aedfb22-fe75-11ef-985d-0242ac110002', 'Tokyo', 'A modern vacation blending technology, traditional Japanese culture, and great food.', '2025-06-02 13:00:00', '2025-06-12 13:00:00', 1200, 'https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aedff84-fe75-11ef-985d-0242ac110002', 'Malta', 'A relaxing vacation with blue beaches, clear waters, and cultural and archaeological attractions.', '2025-07-03 14:00:00', '2025-07-09 14:00:00', 400, 'https://t3.ftcdn.net/jpg/01/67/49/54/360_F_167495438_HD0BaQjv1kRjjQpaUUO6lWpn1nAEtJf1.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee0493-fe75-11ef-985d-0242ac110002', 'Rome', 'A historical vacation exploring ancient ruins like the Colosseum and the Roman Forum, with fantastic Italian cuisine.', '2025-08-04 15:00:00', '2025-08-12 15:00:00', 1100, 'https://thumbs.dreamstime.com/b/rome-italy-colosseum-coliseum-sunrise-144201572.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee07f9-fe75-11ef-985d-0242ac110002', 'Bali', 'A tropical vacation with stunning beaches, temples, and a peaceful atmosphere.\r\n', '2025-09-05 16:00:00', '2025-09-10 16:00:00', 1800, 'https://static.toiimg.com/thumb/msid-53331161,width-748,height-499,resizemode=4,imgsize-190155/.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee0b0c-fe75-11ef-985d-0242ac110002', 'New York ', 'A vibrant city vacation, experiencing Broadway shows, Central Park, and iconic skyscrapers like the Empire State Building', '2025-10-08 17:00:00', '2025-10-18 17:00:00', 1500, 'https://t3.ftcdn.net/jpg/02/09/70/56/360_F_209705645_b78HGJI1i1mxqLwMYA7z1m3VvCxgxJFO.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee0e17-fe75-11ef-985d-0242ac110002', 'Cape Town', 'An adventurous vacation with safaris, breathtaking landscapes, and diverse culture.', '2025-11-12 18:00:00', '2025-11-19 18:00:00', 1300, 'https://t3.ftcdn.net/jpg/01/52/08/80/360_F_152088085_4yDlP3Di5vKkd27eahLsSSuI168ko6Li.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee111b-fe75-11ef-985d-0242ac110002', 'Dubai', 'A luxurious vacation in a city of futuristic architecture, shopping malls, and desert safaris.', '2025-12-10 19:15:47', '2025-12-20 19:15:47', 1200, 'https://static.toiimg.com/thumb/msid-52040615,width-748,height-499,resizemode=4,imgsize-167596/.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee1435-fe75-11ef-985d-0242ac110002', 'Amsterdam', 'A scenic vacation visiting canals, museums, and vibrant neighborhoods, especially during tulip season.', '2026-01-01 09:15:47', '2026-01-08 09:15:47', 950, 'https://t3.ftcdn.net/jpg/01/21/44/24/360_F_121442455_nE2JdYpzmGjWVVXF9iPlVsVKP50ejebM.jpg', '2025-03-11 12:08:21', '2025-03-11 12:08:21'),
('0aee1749-fe75-11ef-985d-0242ac110002', 'Sydney', 'A city vacation with iconic landmarks like the Sydney Opera House, Bondi Beach, and the Harbour Bridge', '2026-02-09 08:15:47', '2026-02-19 08:15:47', 860, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxgeyYhXlPGMBNdmWfkujvoB-zXjihvhDUkg&s', '2025-03-11 12:08:21', '2025-03-11 12:08:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
