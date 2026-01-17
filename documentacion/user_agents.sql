-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 06-01-2026 a las 00:16:28
-- Versión del servidor: 10.5.29-MariaDB-0+deb11u1
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DEV2-Ofiliaria_portapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_agents`
--

CREATE TABLE `user_agents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `show_email_addresss` int(11) NOT NULL DEFAULT 1,
  `show_phone_number` int(11) NOT NULL DEFAULT 1,
  `show_contact_form` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_agents`
--

INSERT INTO `user_agents` (`id`, `user_id`, `username`, `email`, `password`, `phone`, `image`, `status`, `show_email_addresss`, `show_phone_number`, `show_contact_form`, `created_at`, `updated_at`) VALUES
(44, 155, 'agente', 'negociosr1406@gmail.com', '$2y$10$VvKwgdjyaUsjn9vppRzc3eOAT9pns4ErWN.nU7sQ9pJfHvnS5KZv2', NULL, '6955195344179.png', 1, 1, 1, 1, '2025-12-31 15:38:43', '2025-12-31 15:57:12'),
(45, 156, 'ninonlattuf', 'ninonlattuf100@gmail.com', '$2y$10$GnAB1VHUu.UyYfR7EFlcVuF7Hehtz0YiK4A5Y7ZMue2SnN1JmAB5y', NULL, '69553dc6128d8.png', 1, 1, 1, 1, '2025-12-31 18:14:14', '2025-12-31 18:14:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user_agents`
--
ALTER TABLE `user_agents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user_agents`
--
ALTER TABLE `user_agents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
