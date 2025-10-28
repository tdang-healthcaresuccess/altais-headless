<?php
/**
 * Plugin Name: Altais On-Demand ISR
 * Description: Triggers Next.js On-Demand ISR revalidation when content changes
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Trigger Next.js revalidation when a post is saved
 */
function altais_trigger_revalidation($post_id, $post) {
    // Skip auto-saves and revisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (wp_is_post_revision($post_id)) {
        return;
    }
    
    // Only trigger for published posts/pages
    if ($post->post_status !== 'publish') {
        return;
    }
    
    // Get the frontend URL - change this to your production URL
    $frontend_url = get_option('altais_frontend_url', 'https://altais.com');
    
    // Get the revalidation secret - store this in WordPress options for security
    $secret = get_option('altais_revalidation_secret', '');
    
    if (empty($secret)) {
        error_log('Altais ISR: Revalidation secret not configured');
        return;
    }
    
    // Get the post permalink (WordPress path)
    $post_url = get_permalink($post_id);
    $path = str_replace(home_url(), '', $post_url);
    
    // Build the revalidation API URL
    $api_url = $frontend_url . '/api/revalidate?secret=' . urlencode($secret) . '&path=' . urlencode($path);
    
    // Send the request
    $response = wp_remote_post($api_url, array(
        'timeout' => 15,
        'blocking' => false, // Don't wait for response
    ));
    
    if (is_wp_error($response)) {
        error_log('Altais ISR: Error triggering revalidation for ' . $path . ': ' . $response->get_error_message());
    } else {
        error_log('Altais ISR: Triggered revalidation for ' . $path);
    }
}

// Hook into post save events
add_action('save_post', 'altais_trigger_revalidation', 10, 2);

/**
 * Add settings page to configure frontend URL and secret
 */
function altais_isr_settings_page() {
    add_options_page(
        'Altais ISR Settings',
        'Altais ISR',
        'manage_options',
        'altais-isr-settings',
        'altais_isr_settings_page_html'
    );
}
add_action('admin_menu', 'altais_isr_settings_page');

function altais_isr_settings_page_html() {
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Save settings
    if (isset($_POST['altais_isr_submit'])) {
        check_admin_referer('altais_isr_settings');
        update_option('altais_frontend_url', sanitize_text_field($_POST['altais_frontend_url']));
        update_option('altais_revalidation_secret', sanitize_text_field($_POST['altais_revalidation_secret']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $frontend_url = get_option('altais_frontend_url', 'https://altais.com');
    $secret = get_option('altais_revalidation_secret', '');
    ?>
    <div class="wrap">
        <h1>Altais On-Demand ISR Settings</h1>
        <form method="post">
            <?php wp_nonce_field('altais_isr_settings'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="altais_frontend_url">Frontend URL</label>
                    </th>
                    <td>
                        <input type="url" id="altais_frontend_url" name="altais_frontend_url" 
                               value="<?php echo esc_attr($frontend_url); ?>" class="regular-text" required>
                        <p class="description">Your Next.js frontend URL (e.g., https://altais.com)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="altais_revalidation_secret">Revalidation Secret</label>
                    </th>
                    <td>
                        <input type="text" id="altais_revalidation_secret" name="altais_revalidation_secret" 
                               value="<?php echo esc_attr($secret); ?>" class="regular-text" required>
                        <p class="description">The REVALIDATION_SECRET from your .env.local file</p>
                    </td>
                </tr>
            </table>
            <p class="submit">
                <input type="submit" name="altais_isr_submit" class="button button-primary" value="Save Settings">
            </p>
        </form>
    </div>
    <?php
}
