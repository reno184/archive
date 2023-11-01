<?php

/*
  IH : MODEL
 *  */

class Category {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,libelle,type,created  FROM rh_category ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "libelle" => $item->libelle, "type" => $item->type, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id, $dateCreate = false) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,libelle,type,created  FROM rh_category where id = %s", $id));
        $result = null;
        if (!is_null($row)) {
            $result = array("_id" => $row->id, "libelle" => $row->libelle, "type" => $row->type, "created" => $row->created);
        }
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_category", array(
            "id" => $item->_id,
            "libelle" => $item->libelle,
            "type" => $item->type
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
                "rh_category", array(
            "libelle" => $item->libelle,
            "type" => $item->type,
                ), array('id' => $item->_id), array(
            '%s',
            '%s'
                ), array('%s')
        );
    }

    public function delete($id) {
        return $this->db->delete("rh_category", array('id' => $id), array('%d'));
    }

}
