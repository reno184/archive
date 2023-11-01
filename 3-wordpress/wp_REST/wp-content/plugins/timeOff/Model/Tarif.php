<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Tarif {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,libelle,montant,created  FROM rh_tarif ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "libelle" => $item->libelle, "montant" => $item->montant, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,libelle,montant,created  FROM rh_tarif where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "libelle" => $row->libelle, "montant" => $row->montant, "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_tarif", array(
            "id" => $item->_id,
            "libelle" => $item->libelle,
            "montant" => $item->montant
                ), array(
            '%s',
            '%s',
            '%f'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_tarif", array(
            "libelle" => $item->libelle,
            "montant" => $item->montant,
                ), array('id' => $item->_id), array(
            '%s',
            '%f'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_tarif", array('id' => $id), array('%d'));
    }

}
