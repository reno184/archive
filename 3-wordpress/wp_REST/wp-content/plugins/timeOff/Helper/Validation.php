<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Class Validation {

    public static function validateStandard($obj) {
        if (!self::validString($obj->libelle) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateArea($obj) {
        if (!self::validString($obj->libelle) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateCategory($obj) {
        if (!self::validString($obj->libelle) || !self::validString($obj->type) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateEquipement($obj) {
        if (!self::validString($obj->libelle) || !self::validString($obj->category) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateIndispo($obj) {
        if (!self::validInt($obj->sujet) || !self::validDate($obj->date_deb, $obj->date_fin) || !self::validString($obj->category) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validatePaiement($obj) {
        if (!self::validString($obj->payer) || !self::validString($obj->tarif) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateParticipant($obj) {
        if (!self::validString($obj->last) || !self::validString($obj->first) || !self::validString($obj->phone) || !is_email($obj->email) || !self::validString($obj->picture) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateResa($obj) {
        if (!self::validDate($obj->date_deb, $obj->date_fin) || !self::validString($obj->category) || !self::validInt($obj->activity) || !self::validInt($obj->capacity) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateStaff($obj) {
        if (!self::validString($obj->last) || !self::validString($obj->first) || !self::validString($obj->phone) || !is_email($obj->email) || !self::validString($obj->category) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validateTarif($obj) {
        if (!self::validString($obj->libelle) || !self::validFloat($obj->montant) || !self::validString($obj->_id))
            return false;
        return $obj;
    }

    public static function validDate($start, $end) {
        if (!(self::validString($start)) || !(self::validString($end)))
            return false;
        $tmpStart = new DateTime($start);
        $tmpEnd = new DateTime($end);
        $now = new DateTime('now');
        if (($tmpEnd <= $tmpStart))
            return false;
        return true;
    }

    public static function validFloat($float) {
        if (!self::validString($float))
            return false;
        if (floatval($float) < 0 || !is_numeric($float))
            return false;
        return true;
    }

    public static function validInt($int) {
        if (!self::validString($int))
            return false;
        if (intval($int) < 0)
            return false;
        return true;
    }

    public static function validString($string) {
        if (empty($string))
            return false;
        return true;
    }

}
