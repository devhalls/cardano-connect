<?php

namespace WPCC\Connect\Providers;

use WP_Query;
use WPCC\Connect\Base;
use WPCC\Connect\DTO\Pool;
use WPCC\Connect\DTO\PoolId;
use WPCC\Connect\Interfaces\StakePool;
use WPCC\Connect\Responses\ResponsePool;
use WPCC\Connect\Responses\ResponsePools;
use WPCC\Connect\PostTypes\StakePool as StakePoolPostType;

class Local extends Base implements StakePool
{
	protected function setHeaders(): array {
		return [];
	}

	public function getStakePools(int $page = 1, int $count = 10, array|null $filters = null): ResponsePools {
		$filter_query = $filters ? $this->formatFilters($filters) : [];
		$posts_count =( new WP_Query( array_merge([
			'post_type' => StakePoolPostType::NAME,
			'posts_per_page' => -1,
		], $filter_query)))->get_posts();
		$posts =( new WP_Query( array_merge([
			'post_type' => StakePoolPostType::NAME,
			'posts_per_page' => $count,
			'paged' => $page,
		], $filter_query)))->get_posts();
		$pools = [];
		foreach ($posts as $p) {
			$pools[] = new PoolId($p->post_title);
		}
		return new ResponsePools(true, $pools, count($posts_count));
	}

	public function getStakePool( string $pool_id ): ResponsePool {
		$posts = get_posts( [
			'post_type' => StakePoolPostType::NAME,
			'title' => $pool_id
		] );
		$pool = null;
		if (!empty($posts[0])) {
			$pool = Pool::fromPost($posts[0]->ID);
		}
		return new ResponsePool( (bool) $pool, $pool);
	}

	public function getStakePoolStats(string $order = null, string $dir = 'asc'): ResponsePools {
		global $wpdb;
		$fields = [
			'a' => 'pool_id',
			'b' => 'hex',
			'c' => 'vrf_key',
			'd' => 'blocks_minted',
			'e' => 'blocks_epoch',
			'f' => 'live_stake',
			'g' => 'live_size',
			'h' => 'live_saturation',
			'i' => 'live_delegators',
			'j' => 'active_stake',
			'k' => 'active_size',
			'l' => 'declared_pledge',
			'm' => 'live_pledge',
			'n' => 'margin_cost',
			'o' => 'fixed_cost',
			'p' => 'synced_at',
		];
		if (! in_array( $order, $fields, true ) ) {
			$order = 'live_stake';
		}
		$order_join = array_search($order, $fields);

		$selects = [];
		$joins = [];
		foreach ($fields as $k => $f) {
			$selects[] = "$k.meta_value $f";
			$joins[] = "LEFT JOIN wp_postmeta $k ON wp_posts.ID = $k.post_ID AND $k.meta_key='$f'";
		}
		$query = "SELECT wp_posts.ID, wp_posts.post_type, "
			.implode(",", $selects)
			." FROM wp_posts "
			.implode(" ", $joins)
			." WHERE wp_posts.post_type = 'wpcc_pools'"
			." ORDER BY $order_join.meta_value $dir";
		$results = $wpdb->get_results($query);
		$pools = [];
		foreach ($results as $r) {
			$arr = (array) $r;
			unset($arr['ID'], $arr['post_type']);
			if ($arr['pool_id']) {
				$pools[] = new Pool( ...$arr );
			}
		}
		return new ResponsePools(true, $pools, count($results));
	}

	private function formatFilters(array $filters): array {
		$formatted = [
			'meta_query' => []
		];
		if (empty($filters)) {
			return [];
		}
		foreach ($filters as $filter) {
			// Format order by query.
			if ($filter['key'] === 'orderby') {
				if ($filter['value'] === 'random') {
					$formatted['orderby'] = 'rand(' . date( 'Ymd' ) . ')';
				}
				elseif ($filter['value'] === 'random_7') {
					$formatted['orderby'] = 'rand(' . date('YW' ) . ')';
				}
				elseif ($filter['value'] === 'live_saturation_desc') {
					$formatted['orderby'] = 'meta_value_num';
					$formatted['order'] = 'desc';
					$formatted['meta_key'] = 'live_saturation';
				}
				elseif ($filter['value'] === 'live_saturation_asc') {
					$formatted['orderby'] = 'meta_value_num';
					$formatted['order'] = 'asc';
					$formatted['meta_key'] = 'live_saturation';
				}
			// Format text search query.
			} elseif ($filter['key'] === 's' && $filter['value']) {
				$search_query = [ 'relation' => 'OR' ];
				foreach ( StakePoolPostType::SEARCHABLE as $field ) {
					$search_query[] = [
						'key'     => $field,
						'value'   => $filter['value'],
						'compare' => 'LIKE',
					];
				}
				$formatted['meta_query'][] = $search_query;
			// Format saturated query.
			} elseif ($filter['type'] === 'range' && $filter['value']) {
				$formatted['meta_query'][] = [
					'key'     => 'live_saturation',
					'value'   => [0, (float) $filter['value']],
					'type' => 'DECIMAL(10,4)',
					'compare' => 'BETWEEN'
				];
			// Format no metadata
			} elseif ($filter['key'] === 'no_metadata') {
				if ($filter['value'] === 'true') {
					$formatted['meta_query'][] = [
						'key'     => 'metadata',
						'value'   => 's:6:"ticker";N',
						'compare' => 'NOT LIKE',
					];
				}
			} elseif ($filter['key'] === 'hide_retired') {
				if ($filter['value'] === 'true') {
					$formatted['meta_query'][] = [
						'key'     => 'retirement',
						'value'   => 'a:0:{}',
						'compare' => '=',
					];
				}
			}
		}
		return $formatted;
	}
}