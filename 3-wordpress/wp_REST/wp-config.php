<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'wordpress_1');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', 'root');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost:8889');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N'y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'a~[;UjU-oaNcoc>/!-ua=mB,A*83D;OhG$^+N%=j ;s1?+$b^|(u?c3ziq5O_).y');
define('SECURE_AUTH_KEY',  's+U$U?[c3nEz9-wP..hF59e9!=H6&eG:r*s Ix*i$l|@-*L5ouN^63ejw#;Bw*)A');
define('LOGGED_IN_KEY',    'P+hA!1e0:!b4Jf^,[BudHm?f}_TEq4+Y@E4-&=V+IpG/O77rK6ySh)W`m4r(9Hr!');
define('NONCE_KEY',        'kQ+D&-O#jyL[H2h8FbX3!j+`,LU!|4:%gSF%wPK2@m7`UY)FQ>>iW~p<`xV*-P&K');
define('AUTH_SALT',        '*n.qs~-Wya0V`A]iowpKovc7*nZD4W&+t/bjct[z,q|5@}r&1u3t!?+biga:byC{');
define('SECURE_AUTH_SALT', 'J_KjiM-}eJT1@a*s%H?2HQ.y4PdsBIN-4M2o&9+[TLtH_7$]R=Ru`s7`bvEPn7+L');
define('LOGGED_IN_SALT',   'Il~3 X%$;D8V{yn8yi{+|TJ?XSfWVfV}UU|=ED)FO}>;dt.(~gz.lceP.rB-UJS]');
define('NONCE_SALT',       'xIv-@_WE50kn.Ib~;)(tz>5j=6<+L:=I0`a= +T$,.DJbrBf%siS8NUOVf|6]^r)');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 */
define('WP_DEBUG', false);

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');