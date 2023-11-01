<?php

/* IH : Classe
 *  */

class ApiStart {

    private static $instance;
    private static $version = "1";
    public static $prod = false;
    private static $indispoController = null;
    private static $resaController = null;
    private static $staffController = null;
    private static $areaController = null;
    private static $categoryController = null;
    private static $equipementController = null;
    private static $paiementController = null;
    private static $participantController = null;
    private static $tarifController = null;

    public static function init() {
        if (self::$instance == null) {
            self::$instance = new ApiStart();
        }

        self::$indispoController = IndispoController::init();
        self::$resaController = ResaController::init();
        self::$staffController = StaffController::init();
        self::$areaController = AreaController::init();
        self::$categoryController = CategoryController::init();
        self::$equipementController = EquipementController::init();
        self::$paiementController = PaiementController::init();
        self::$participantController = ParticipantController::init();
        self::$tarifController = TarifController::init();

        self::$indispoController->register_routes(self::$version);
        self::$resaController->register_routes(self::$version);
        self::$staffController->register_routes(self::$version);
        self::$areaController->register_routes(self::$version);
        self::$categoryController->register_routes(self::$version);
        self::$equipementController->register_routes(self::$version);
        self::$paiementController->register_routes(self::$version);
        self::$participantController->register_routes(self::$version);
        self::$tarifController->register_routes(self::$version);

        return self::$instance;
    }

    private function __construct() {
        flush_rewrite_rules();
    }

}
