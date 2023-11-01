<?php

/*
  IH : CONTROLLER
 *  */

class AreaController extends WP_REST_Controller {

    private static $instance;
    private $area;

    /**
     * Register the routes for the objects of the controller.
     */
    public static function init() {
        global $wpdb;

        if (self::$instance == null) {
            self::$instance = new AreaController();
        }
        self::$instance->area = new Area($wpdb);
        return self::$instance;
    }

    public function register_routes($version) {
        $namespace = 'api/v' . $version;
        $base = 'area';
        register_rest_route($namespace, '/' . $base, array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_items')
            ),
            array(
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => array($this, 'create_item'),
                'permission_callback' => array($this, 'create_item_permissions_check'),
                'args' => $this->get_endpoint_args_for_item_schema(true),
            ),
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array($this, 'update_item'),
                'permission_callback' => array($this, 'update_item_permissions_check'),
                'args' => $this->get_endpoint_args_for_item_schema(false),
            )
        ));
        register_rest_route($namespace, '/' . $base . '/(?P<id>[\d]+)', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_item'),
                'args' => array(
                    'id' => array(
                        'validate_callback' => function($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ),
                )
            ),
            array(
                'methods' => WP_REST_Server::DELETABLE,
                'callback' => array($this, 'delete_item'),
                'permission_callback' => array($this, 'delete_item_permissions_check'),
                'args' => array(
                    'force' => array(
                        'default' => false,
                    ),
                ),
            )
        ));
    }

    /**
     * Get a collection of items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_items(WP_REST_Request $request) {
        $result = $this->area->getAll();
        if (is_array($result)) {
            return new WP_REST_Response($result, 200);
        } else
            return new WP_Error('no_content', 'No content', array('status' => 500));
    }

    /**
     * Get one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Response
     */
    public function get_item(WP_REST_Request $request) {
        //get parameters from request
        $params = $request->get_params();
        $item = $this->area->getItem($params["_id"]);
        if (is_array($item)) {
            return new WP_REST_Response($item, 200);
        } else {
            return new WP_Error('code', __('message', 'text-domain'));
        }
    }

    /**
     * Create one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function create_item($request) {

        $content = $this->prepare_body_for_database($request);
        if (is_null($content) || (empty($content)) || ($content === false)) {
            return new WP_Error('no_content', 'Invalid content', array('status' => 500));
        }
        $response = $this->area->create($content);
        return new WP_REST_Response($response, 200);
    }

    /**
     * Update one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_item($request) {

        $content = $this->prepare_body_for_database($request, true);
        if (is_null($content) || (empty($content)) || ($content === false)) {
            return new WP_Error('no_content', 'Invalid content', array('status' => 500));
        }
        $response = $this->area->update($content);
        return new WP_REST_Response($response, 200);
    }

    /**
     * Delete one item from the collection
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_item($request) {
        $response = array("_id" => (int) $request->get_param("id"));
        if ($this->area->delete((int) $request->get_param("id")) === false) {
            return new WP_Error('operation faild', 'operation faild', array('status' => 500));
        } else {
            return new WP_REST_Response($response, 200);
        }
    }

    /**
     * Check if a given request has access to get items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_items_permissions_check($request) {
        return Permission::allowRead("Area");
    }

    /**
     * Check if a given request has access to get a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function get_item_permissions_check($request) {

        return Permission::allowRead("Area");
    }

    /**
     * Check if a given request has access to create items
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function create_item_permissions_check($request) {
        return Permission::allowWrite("Area");
    }

    /**
     * Check if a given request has access to update a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function update_item_permissions_check($request) {
        return $this->create_item_permissions_check($request);
    }

    /**
     * Check if a given request has access to delete a specific item
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function delete_item_permissions_check($request) {

        return Permission::allowDelete("Area");
    }

    /**
     * Prepare the item for create or update operation
     *
     * @param WP_REST_Request $request Request object
     * @return WP_Error|object $prepared_item
     */
    protected function prepare_body_for_database($request, $update = false) {
        $obj = json_decode($request->get_body());
        return Validation::validateArea($obj, $update);
    }

    /**
     * Prepare the item for the REST response
     *
     * @param mixed $item WordPress representation of the item.
     * @param WP_REST_Request $request Request object.
     * @return mixed
     */
    public function prepare_item_for_response($item, $request) {
        return array();
    }

}
