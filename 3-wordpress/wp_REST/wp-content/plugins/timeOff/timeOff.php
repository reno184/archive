<?php

/*
  Plugin Name: timeOff
  Plugin URI: ---
  Description: Plugin for timeOff REST API
  Author: I.Harizi
  Version: 1.0
  Author URI: ---
 */

if (!defined('ABSPATH'))
    exit; // Exit if accessed directly
//Include WP
require_once(ABSPATH . 'wp-content/plugins/rest-api/plugin.php');
require_once(ABSPATH . 'wp-includes/pluggable.php');

//Include Class & Helper
require_once(dirname(__FILE__) . '/classes/ApiStart.php');
require_once(dirname(__FILE__) . '/Helper/Validation.php');
require_once(dirname(__FILE__) . '/Helper/Permission.php');

//Include Model
require_once(dirname(__FILE__) . '/Model/Indispo.php');
require_once(dirname(__FILE__) . '/Model/Resa.php');
require_once(dirname(__FILE__) . '/Model/Staff.php');
require_once(dirname(__FILE__) . '/Model/Area.php');
require_once(dirname(__FILE__) . '/Model/Category.php');
require_once(dirname(__FILE__) . '/Model/Equipement.php');
require_once(dirname(__FILE__) . '/Model/Paiement.php');
require_once(dirname(__FILE__) . '/Model/Participant.php');
require_once(dirname(__FILE__) . '/Model/Tarif.php');

//Include Controller
require_once(dirname(__FILE__) . '/controller/IndispoController.php');
require_once(dirname(__FILE__) . '/controller/ResaController.php');
require_once(dirname(__FILE__) . '/controller/StaffController.php');
require_once(dirname(__FILE__) . '/controller/AreaController.php');
require_once(dirname(__FILE__) . '/controller/CategoryController.php');
require_once(dirname(__FILE__) . '/controller/EquipementController.php');
require_once(dirname(__FILE__) . '/controller/PaiementController.php');
require_once(dirname(__FILE__) . '/controller/ParticipantController.php');
require_once(dirname(__FILE__) . '/controller/TarifController.php');
// Action hook to initialize the plugin
add_action('rest_api_init', array('ApiStart', 'init'));
