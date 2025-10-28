<?php
/**
 * Plugin Name: WP Engine Cache Bypass for Editors
 * Description: Sets a cookie to bypass WP Engine cache for logged-in users
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Set a cache bypass cookie for logged-in users
 */
function wpengine_cache_bypass_for_editors() {
    // Only set for logged-in users who can edit posts
    if (is_user_logged_in() && current_user_can('edit_posts')) {
        // Set a cookie that WP Engine will recognize as a cache exclusion
        if (!isset($_COOKIE['wpengine_bypass_cache'])) {
            setcookie('wpengine_bypass_cache', '1', time() + (24 * 60 * 60), '/'); // 24 hours
            $_COOKIE['wpengine_bypass_cache'] = '1'; // Set for current request
        }
    }
}
add_action('init', 'wpengine_cache_bypass_for_editors');

/**
 * Clear the cache bypass cookie on logout
 */
function wpengine_clear_cache_bypass_cookie() {
    if (isset($_COOKIE['wpengine_bypass_cache'])) {
        setcookie('wpengine_bypass_cache', '', time() - 3600, '/');
        unset($_COOKIE['wpengine_bypass_cache']);
    }
}
add_action('wp_logout', 'wpengine_clear_cache_bypass_cookie');

/**
 * Add admin notice to inform editors about cache bypass
 */
function wpengine_cache_bypass_admin_notice() {
    if (is_user_logged_in() && current_user_can('edit_posts') && isset($_COOKIE['wpengine_bypass_cache'])) {
        echo '<div class="notice notice-info is-dismissible">
            <p><strong>Cache Bypass Active:</strong> You are seeing uncached content. Regular visitors will see cached versions.</p>
        </div>';
    }
}
add_action('admin_notices', 'wpengine_cache_bypass_admin_notice');
add_action('wp_body_open', function() {
    if (is_user_logged_in() && current_user_can('edit_posts') && isset($_COOKIE['wpengine_bypass_cache'])) {
        echo '<div style="background: #0073aa; color: white; padding: 5px 10px; font-size: 12px; position: fixed; top: 0; right: 0; z-index: 99999;">
            Cache Bypassed - Viewing Fresh Content
        </div>';
    }
});
?>