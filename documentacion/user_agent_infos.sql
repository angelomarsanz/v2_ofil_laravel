-- phpMyAdmin SQL Dump
-- version 5.0.4deb2+deb11u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 06-01-2026 a las 00:36:20
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
-- Estructura de tabla para la tabla `user_agent_infos`
--

CREATE TABLE `user_agent_infos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agent_id` bigint(20) UNSIGNED NOT NULL,
  `language_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user_agent_infos`
--

INSERT INTO `user_agent_infos` (`id`, `agent_id`, `language_id`, `first_name`, `last_name`, `country`, `state`, `city`, `address`, `details`, `zip_code`, `created_at`, `updated_at`) VALUES
(75, 44, 313, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 15:38:43', '2025-12-31 15:38:43'),
(76, 45, 314, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-31 18:14:14', '2025-12-31 18:14:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user_agent_infos`
--
ALTER TABLE `user_agent_infos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user_agent_infos`
--
ALTER TABLE `user_agent_infos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
