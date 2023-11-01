<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Paiement {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,payer,tarif,created  FROM rh_paiement ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "payer" => $item->payer, "tarif" => $item->tarif, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,payer,tarif,created  FROM rh_paiement where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "payer" => $row->payer, "tarif" => $row->tarif, "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_paiement", array(
            "id" => $item->_id,
            "payer" => $item->payer,
            "tarif" => $item->tarif
                ), array(
            '%s',
            '%s',
            '%s'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_paiement", array(
            "payer" => $item->payer,
            "tarif" => $item->tarif
                ), array('id' => $item->_id), array(
            '%s',
            '%s'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_paiement", array('id' => $id), array('%d'));
    }

}
