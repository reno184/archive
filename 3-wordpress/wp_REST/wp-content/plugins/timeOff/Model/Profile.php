<?php

/*
  IH : MODEL
 *  */

class Profile {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,libelle,active,created  FROM rh_profile ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "libelle" => $item->libelle, "active" => ($item->active == 1 ? true : false), "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,libelle,active,created  FROM rh_profile where id = %s", $id));
        $result = null;
        if (!is_null($row)) {
            $result = array("_id" => $row->id, "libelle" => $row->libelle, "active" => ($row->active == 1 ? true : false), "created" => $row->created);
        }
        return $result;
    }

    public function create($content) {
        $response = array();
        foreach ($content as $item) {
            $this->db->insert(
                    "rh_profile", array(
                "id" => $item->_id,
                "libelle" => $item->libelle,
                "active" => ($item->active == "true" ? 1 : 0)
                    ), array(
                '%s',
                '%s',
                '%d'
                    )
            );
            return $this->getItem($item->_id);
        }
        return $response;
    }

    public function update($content) {
        $response = array();
        foreach ($content as $item) {
            $this->db->update(
                    "rh_profile", array(
                "libelle" => $item->libelle,
                "active" => ($item->active == "true" ? 1 : 0),
                    ), array('id' => $item->_id), array(
                '%s',
                '%d'
                    ), array('%s')
            );
            return array("_id" => $item->_id);
        }
        return $response;
    }

    public function delete($id) {
        return $this->db->delete("rh_profile", array('id' => $id), array('%d'));
    }

}
