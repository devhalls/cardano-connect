<?php
namespace WPCC\Connect\PostTypes;

use WPCC\Base;
use WPCC\Connect\Base as ConnectBase;
use WPCC\Connect\Interfaces\PostType;
use WPCC\Connect\Response;

class StakePool implements PostType
{
	public function getName(): string {
		return 'wpcc_pools';
	}

	public function getConfig(): array {
		return [
			'label'  => 'wpcc_pools',
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
			'map_meta_cap'        => false, // Set to true to enable the default handler for meta caps.
			'hierarchical'        => false,
			'supports'            => [ 'author', 'title', 'editor', 'page-attributes' ],
			'has_archive'         => false,
			'rewrite'             => true,
			'query_var'           => true,
		];
	}

	public function sync( ConnectBase $provider ): Response {
		$result = [];
		$error = false;
		$per_page = 1;
		do {
			$pools = $provider->getStakePools(1, $per_page);
			$count = count($pools->response) ?: 0;
			foreach ($pools->response as $pool) {
				$data = $provider->getStakePool($pool->pool_id);
//				$result = wp_insert_post([
//					'post_title'    => $pool_id,
//					'post_type'     => $this->getName(),
//					'meta_input'    => array_merge(
//						$data->response['data'],
//						$data->response['metadata'],
//						$data->response['metadata_file'],
//						$data->response['metadata_file_extended']
//					)
//				]);
//				if (is_wp_error($result)) {
//					$error = $result;
//				}
				$result[] = [
					'data' => $data->response['data'],
					'metadata' => $data->response['metadata'],
					'metadata_file' => $data->response['metadata_file'],
					'metadata_file_extended' => $data->response['metadata_file_extended']
				];
			}
			$error = true;
		}
		while (!$error && $count === $per_page);

		if ($error) {
			return new Response( false, ['xxxx' => $result] );
		}
		return new Response(true, [
			'data' => $result,
			'message' => __('Stake Pools synced', 'cardano-connect')
		]);
	}
}