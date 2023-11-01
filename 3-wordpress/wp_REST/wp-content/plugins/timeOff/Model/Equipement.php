<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Equipement {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,libelle,category,active,created  FROM rh_equipement ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "libelle" => $item->libelle, "category" => $item->category, "active" => ($item->active == 1 ? true : false), "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,libelle,category,active,created  FROM rh_equipement where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "libelle" => $row->libelle, "category" => $row->category, "active" => ($row->active == 1 ? true : false), "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_equipement", array(
            "id" => $item->_id,
            "libelle" => $item->libelle,
            "category" => $item->category,
            "active" => ((bool) $item->active == true ? 1 : 0)
                ), array(
            '%s',
            '%s',
            '%s',
            '%d'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_equipement", array(
            "libelle" => $item->libelle,
            "category" => $item->category,
            "active" => ((bool) $item->active == true ? 1 : 0)
                ), array('id' => $item->_id), array(
            '%s',
            '%s',
            '%d'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_equipement", array('id' => $id), array('%d'));
    }

}
