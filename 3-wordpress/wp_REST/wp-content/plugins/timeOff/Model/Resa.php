<?php

/* IH
  Table : resa
 *  */

class Resa {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,date_deb,date_fin,category,activity,capacity,created  FROM rh_resa ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "date_deb" => $item->date_deb, "date_fin" => $item->date_fin, "category" => $item->category, "capacity" => $item->capacity, "activity" => $item->activity, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,date_deb,date_fin,category,activity,capacity,created  FROM rh_resa where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "date_deb" => $row->date_deb, "date_fin" => $row->date_fin, "category" => $row->category, "capacity" => $row->capacity, "activity" => $row->activity, "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_resa", array(
            "id" => $item->_id,
            "date_deb" => $item->date_deb,
            "date_fin" => $item->date_fin,
            "category" => $item->category,
            "capacity" => $item->capacity,
            "activity" => $item->activity
                ), array(
            '%s',
            '%s',
            '%s',
            '%d',
            '%d',
            '%d'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_resa", array(
            "date_deb" => $item->date_deb,
            "date_fin" => $item->date_fin,
            "category" => $item->category,
            "capacity" => $item->capacity,
            "activity" => $item->activity
                ), array('id' => $item->_id), array(
            '%s',
            '%s',
            '%d',
            '%d',
            '%d'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_resa", array('id' => $id), array('%d'));
    }

}
