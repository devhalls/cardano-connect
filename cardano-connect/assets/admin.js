/**
 * Admin JS file
 */
(function($){

    const sync_pools_trigger = '#sync-pools';

    $(document).on('click', sync_pools_trigger, function(e)
    {
        e.preventDefault();
        sync_pools(e.target);
    });

    function sync_pools(target) {
        const html = target.innerHTML;
        target.innerHTML = 'loading'
        $.post('/wp-admin/admin-ajax.php', {
            'action': 'sync_pools'
        }, data => {
            console.log(data);
            target.innerHTML = html
        });
    }

})(jQuery);