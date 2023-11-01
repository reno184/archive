<?php

/* 
IH
 *  */

Class Permission {
    
    public static function allowRead($controller)
    {
        if (ApiStart::$prod === true)
            return current_user_can('read');
        else
            return true;
    }
    public static function allowWrite($controller)
    {
        if (ApiStart::$prod === true)
            return current_user_can('read');
        else
            return true;
    }
    public static function allowDelete($controller)
    {
        if (ApiStart::$prod === true)
            return current_user_can('read');
        else
            return true;
    }
}