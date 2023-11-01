<?php

/*
  IH : MODEL
 *  */

class Area {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,libelle,active,created  FROM rh_area ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "libelle" => $item->libelle, "active" => ($item->active == 1 ? true : false), "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,libelle,active,created  FROM rh_area where id = %s", $id));
        $result = null;
        if (!is_null($row)) {
            $result = array("_id" => $row->id, "libelle" => $row->libelle, "active" => ($row->active == 1 ? true : false), "created" => $row->created);
        }
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_area", array(
            "id" => $item->_id,
            "libelle" => $item->libelle,
            "active" => ((bool) $item->active == true ? 1 : 0)
                ), array(
            '%s',
            '%s',
            '%d'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_area", array(
            "libelle" => $item->libelle,
            "active" => ((bool) $item->active == true ? 1 : 0),
                ), array('id' => $item->_id), array(
            '%s',
            '%d'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_area", array('id' => $id), array('%d'));
    }

}
