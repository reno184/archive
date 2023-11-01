<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Indispo {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,sujet,category,date_deb,date_fin,created  FROM rh_indispo ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "sujet" => $item->sujet, "category" => $item->category, "date_deb" => $item->date_deb, "date_fin" => $item->date_fin, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare("SELECT id,sujet,category,date_deb,date_fin,created FROM rh_indispo where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "sujet" => $row->sujet, "category" => $row->category, "date_deb" => $row->date_deb, "date_fin" => $row->date_fin, "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_indispo", array(
            'id' => $item->_id,
            'sujet' => $item->sujet,
            'category' => $item->category,
            'date_deb' => $item->date_deb,
            'date_fin' => $item->date_fin
                ), array(
            '%s',
            '%s',
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
                "rh_indispo", array(
            'sujet' => $item->sujet,
            'category' => $item->category,
            'date_deb' => $item->date_deb,
            'date_fin' => $item->date_fin
                ), array('id' => $item->_id), array(
            '%s',
            '%s',
            '%s',
            '%s',
            '%s'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_indispo", array('id' => $id), array('%d'));
    }

}
