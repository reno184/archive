<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Staff {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $rows = $this->db->get_results(" SELECT id,nom,prenom,tel,email,category,picture,type,CONCAT(prenom, ' ',nom) as libelle,created,active  FROM rh_staff ");
        $result = array();
        foreach ($rows as $item) {
            array_push($result, array("_id" => $item->id, "last" => $item->nom, "first" => $item->prenom, "phone" => $item->tel, "email" => $item->email, "category" => $item->category, "picture" => $item->picture, "type" => $item->type, "libelle" => $item->libelle, "created" => $item->created, "active" => ($item->active == 1 ? true : false)));
        }
        return $result;
    }

    public function getItem($id) {
        $row = $this->db->get_row($this->db->prepare(" SELECT id,nom,prenom,tel,email,category,picture,type,CONCAT(prenom, ' ',nom) as libelle,created,active  FROM rh_staff where id = %s", $id));
        $result = null;
        if (!is_null($row))
            $result = array("_id" => $row->id, "last" => $row->nom, "first" => $row->prenom, "phone" => $row->tel, "email" => $row->email, "category" => $row->category, "picture" => $row->picture, "type" => $row->type, "libelle" => $row->libelle, "created" => $row->created, "active" => ($row->active == 1 ? true : false));
        return $result;
    }

    public function create($item) {
        $this->db->insert(
                "rh_staff", array(
            "id" => $item->_id,
            "nom" => $item->last,
            "prenom" => $item->first,
            "tel" => $item->phone,
            "email" => $item->email,
            "category" => $item->category,
            "picture" => $item->picture,
            "type" => $item->type,
            "active" => ((bool) $item->active == true ? 1 : 0)
                ), array(
            '%s',
            '%s',
            '%s',
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
                "rh_staff", array(
            "nom" => $item->last,
            "prenom" => $item->first,
            "tel" => $item->phone,
            "email" => $item->email,
            "category" => $item->category,
            "picture" => $item->picture,
            "type" => $item->type,
            "active" => ((bool) $item->active == true ? 1 : 0)
                ), array('id' => $item->_id), array(
            '%s',
            '%s',
            '%s',
            '%s',
            '%s',
            '%s',
            '%s',
            '%d'
                ), array('%s')
        );
        return array("_id" => $item->_id);
    }

    public function delete($id) {
        return $this->db->delete("rh_staff", array('id' => $id), array('%d'));
    }

}
