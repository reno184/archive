<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Participant {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,nom,prenom,tel,email,picture,created  FROM rh_participant ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "last" => $item->nom, "first" => $item->prenom, "phone" => $item->tel, "email" => $item->email, "picture" => $item->picture, "created" => $item->created));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,nom,prenom,tel,email,picture,created  FROM rh_participant where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "last" => $row->nom, "first" => $row->prenom, "phone" => $row->tel, "email" => $row->email, "picture" => $row->picture, "created" => $row->created);
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_participant", array(
            "id" => $item->_id,
            "nom" => $item->last,
            "prenom" => $item->first,
            "tel" => $item->phone,
            "email" => $item->email,
            "picture" => $item->picture
                ), array(
            '%s',
            '%s',
            '%s', '%s',
            '%s',
            '%s'
                )
        );
        return $this->getItem($item->_id);
    }

    public function update($item) {
        $this->db->update(
                "rh_participant", array(
            "nom" => $item->last,
            "prenom" => $item->first, "tel" => $item->phone,
            "email" => $item->email,
            "picture" => $item->picture
                ), array('id' => $item->_id), array(
            '%s',
            '%s',
            '%s', '%s',
            '%s'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_participant", array('id' => $id), array('%d'));
    }

}
