<?php
namespace WPCC\Connect\PostTypes;

use DateTime;
use WP_Error;
use WPCC\Base;
use WPCC\Connect\Base as ConnectBase;
use WPCC\Connect\DTO\Pool;
use WPCC\Connect\DTO\PoolId;
use WPCC\Connect\Interfaces\PostType;
use WPCC\Connect\Responses\ResponsePools;

class StakePool implements PostType
{
	public const NAME = 'wpcc_pools';
	public const SEARCHABLE = [
		'pool_id',
		'metadata',
	];

	// Inherited methods.

	public function registerHooks(): void {

	}

	public function getConfig(): array {
		return [
			'label'  => self::NAME,
			'labels' => [
				'name'               => __('Stake Pools', 'cardano-connect'),
				'singular_name'      => __('Stake Pool', 'cardano-connect'),
				'add_new'            => __('Add Stake Pool', 'cardano-connect'),
				'add_new_item'       => __('Adding Stake Pool', 'cardano-connect'),
				'edit_item'          => __('Edit Stake Pool', 'cardano-connect'),
				'new_item'           => __('New Stake Pool', 'cardano-connect'),
				'view_item'          => __('See Stake Pool', 'cardano-connect'),
				'search_items'       => __('Search Stake Pool', 'cardano-connect'),
				'not_found'          => __('Not Found', 'cardano-connect'),
				'menu_name'          => __('Stake Pools', 'cardano-connect'),
			],
			'public'              => true,
			'show_in_menu'        => Base::SETTING_PREFIX . 'dashboard',
			'show_in_rest'        => true, // Add to REST API. WP 4.7.
			'rest_base'           => false, // $post_type. WP 4.7.
			'capability_type'     => 'post',
			'capabilities'        => array(
				'create_posts' => false, // Removes support for the "Add New" function ( use 'do_not_allow' instead of false for multisite set ups )
			),
			'map_meta_cap'        => true, // Set to true to enable the default handler for meta caps - disabled delete etc.
			'hierarchical'        => false,
			'supports'            => [ 'author', 'title', 'editor', 'page-attributes' ],
			'has_archive'         => false,
			'rewrite'             => true,
			'query_var'           => true,
		];
	}

	// Helper methods.

	/**
	 * @param ConnectBase $provider
	 * @param int|array[] $per_page number of items OR array of pool IDs.
	 * @param int $start_page
	 * @param int $max_loops
	 *
	 * @return ResponsePools
	 */
	public function syncPools( ConnectBase $provider, int|array $per_page = 100, int $start_page = 1, int $max_loops = 1 ): ResponsePools {
		/** @var WP_Error|null $error */
		$error = null;
		$result = [];
		$page = $start_page;
		$max_page_loops = $start_page+$max_loops-1;

		// Loop until we reach the end of the list (number of items < $per_page).

		do {
			if (is_array($per_page)) {
				$formatted = [];
				foreach ($per_page as $p) {
					$formatted[] = new PoolId($p);
				}
				$pools = new ResponsePools(true, $formatted);
			} else {
				$pools = $provider->getStakePools( $page, $per_page );
			}

			$count = $pools->success ? count( $pools->response ) : 0;
			if (!$pools->success) {
				$error = new WP_Error( 500, $pools->message );
			} else {
				foreach ($pools->response as $pool) {
					$posts = get_posts(['post_type' => self::NAME, 'title' => $pool->pool_id]);
					$post = $posts[0] ?? null;

					/** @var Pool $pool */
					$data     = $provider->getStakePool( $pool->pool_id );
					$pool     = $data->response;
					$pool_arr = $pool ? $pool->toArray() : [];
					$pool_arr['synced_at'] = (new DateTime())->getTimestamp();

					if ($post) {
						$post = wp_update_post(['ID' => $post->ID, 'meta_input'  => $pool_arr]);
						$result[] = [ 'existing', $post ?: __('Failed post update', 'cardano-connect'), $pool->pool_id ];
						// @todo update the post
					} else {
						if (!$data->success) {
							$result[] = [ 'error' => $data->message ];
						} else {
							$post = wp_insert_post( [
								'post_status' => 'publish',
								'post_title'  => $pool->pool_id,
								'post_type'   => self::NAME,
								'meta_input'  => $pool_arr,
							] );
							$result[] = [ 'new', $post ?: __('Failed post create', 'cardano-connect'), $pool->pool_id ];
						}
					}
				}
				if ($page === $max_page_loops) {
					$error = new WP_Error( 500, __('Max page reached', 'cardano-connect') );
				}
				$page++;
			}
		}
		while (!$error && $count === $per_page);

		if (is_wp_error($error)) {
			return new ResponsePools(
				false,
				$result,
				count($result),
				$error->get_error_message()
			);
		}
		return new ResponsePools(
			true,
			$result,
			count($result),
			__('Stake Pools synced', 'cardano-connect')
		);
	}
}